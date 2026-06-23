import { geoVoronoi } from 'd3-geo-voronoi';
import { union, intersect, featureCollection, rewind } from '@turf/turf';
import type { Feature, FeatureCollection, Polygon, MultiPolygon, Position } from 'geojson';
import type { GeoProjection } from 'd3';
import { britishIslesGeoJSON } from '$lib/data/geo.js';
import type { Kingdom } from '$lib/data/types.js';

/**
 * Turns the kingdoms' point data (center + radius + stretch) into tessellated
 * territory polygons that are clipped to the British Isles landmass.
 *
 * The pipeline:
 *   1. For each kingdom, scatter a small deterministic cluster of seed points
 *      across its ellipse (radius / stretch) so larger kingdoms claim more area.
 *   2. Add a frame of "ocean" sentinel seeds so the outer Voronoi cells stay
 *      finite and regional rather than wrapping the globe.
 *   3. Compute a spherical Voronoi tessellation of all seeds.
 *   4. Merge the cells belonging to each kingdom into one polygon.
 *   5. Clip each polygon to the landmass so borders hug the coast.
 *
 * Everything is computed in geographic (lon/lat) space and rendered by the
 * caller with d3.geoPath, exactly like the coastline layer.
 */

type LandPolygon = Feature<Polygon | MultiPolygon>;

export interface Territory {
	kingdom: Kingdom;
	feature: LandPolygon;
}

// The landmass to clip against — Great Britain + Ireland merged once at load.
const landmass: LandPolygon = (() => {
	const fc = britishIslesGeoJSON as unknown as FeatureCollection<Polygon>;
	const merged = union(featureCollection(fc.features));
	// union() returns null only for an empty collection; our data always has features.
	return (merged ?? fc.features[0]) as LandPolygon;
})();

// Deterministic seed cluster offsets (unit ellipse), sampled at two rings.
const RING_OUTER = 0.72;
const RING_INNER = 0.36;
const RING_COUNT = 6;

/**
 * Samples points across a kingdom's ellipse in projected pixel space and
 * inverts them back to [lon, lat]. The ellipse uses radius (vertical) and
 * radius * stretch (horizontal), matching the old ellipse rendering.
 */
function seedCluster(
	kingdom: Kingdom,
	projection: GeoProjection
): Position[] {
	const center = projection(kingdom.center);
	if (!center) return [];
	const [cx, cy] = center;
	const rx = kingdom.radius * (kingdom.stretch ?? 1);
	const ry = kingdom.radius;

	const out: Position[] = [];
	const pushInverted = (px: number, py: number) => {
		const lonlat = projection.invert?.([px, py]);
		if (lonlat && isFinite(lonlat[0]) && isFinite(lonlat[1])) out.push(lonlat);
	};

	pushInverted(cx, cy);
	for (const ring of [RING_INNER, RING_OUTER]) {
		for (let i = 0; i < RING_COUNT; i++) {
			const a = (i / RING_COUNT) * 2 * Math.PI + (ring === RING_OUTER ? Math.PI / RING_COUNT : 0);
			pushInverted(cx + Math.cos(a) * rx * ring, cy + Math.sin(a) * ry * ring);
		}
	}
	return out;
}

/** A closed lon/lat ring tracing a kingdom's ellipse — used as a fallback shape. */
function ellipseRing(kingdom: Kingdom, projection: GeoProjection): Position[] | null {
	const center = projection(kingdom.center);
	if (!center) return null;
	const [cx, cy] = center;
	const rx = kingdom.radius * (kingdom.stretch ?? 1);
	const ry = kingdom.radius;
	const ring: Position[] = [];
	const steps = 36;
	for (let i = 0; i <= steps; i++) {
		const a = (i / steps) * 2 * Math.PI;
		const lonlat = projection.invert?.([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
		if (!lonlat || !isFinite(lonlat[0]) || !isFinite(lonlat[1])) return null;
		ring.push(lonlat);
	}
	return ring;
}

function polygonFeature(ring: Position[]): Feature<Polygon> {
	const closed = ring.length && ring[0] !== ring[ring.length - 1] ? [...ring, ring[0]] : ring;
	return { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [closed] } };
}

/** Sentinel frame around the seeds so outer Voronoi cells stay bounded. */
function sentinelFrame(seeds: Position[]): Position[] {
	let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
	for (const [lon, lat] of seeds) {
		minLon = Math.min(minLon, lon);
		maxLon = Math.max(maxLon, lon);
		minLat = Math.min(minLat, lat);
		maxLat = Math.max(maxLat, lat);
	}
	if (!isFinite(minLon)) return [];
	const margin = 8;
	minLon -= margin; maxLon += margin; minLat -= margin; maxLat += margin;
	const frame: Position[] = [];
	const n = 4;
	for (let i = 0; i <= n; i++) {
		const tx = minLon + ((maxLon - minLon) * i) / n;
		const ty = minLat + ((maxLat - minLat) * i) / n;
		frame.push([tx, minLat], [tx, maxLat], [minLon, ty], [maxLon, ty]);
	}
	return frame;
}

interface Seed {
	point: Position;
	kingdomId: string | null; // null = sentinel
}

/** Safely clip a kingdom polygon to the landmass; null if no land overlap. */
function clipToLand(poly: Feature<Polygon | MultiPolygon>): LandPolygon | null {
	try {
		return intersect(featureCollection([poly, landmass])) as LandPolygon | null;
	} catch {
		return null;
	}
}

const cache = new Map<string, Territory[]>();

function signature(kingdoms: Kingdom[], projection: GeoProjection): string {
	const [tx, ty] = projection.translate();
	const k = kingdoms
		.map((kg) => `${kg.id}:${kg.center}:${kg.radius}:${kg.stretch ?? 1}:${kg.polygon ? 'p' : ''}`)
		.join('|');
	return `${projection.scale().toFixed(2)}:${tx.toFixed(1)}:${ty.toFixed(1)}|${k}`;
}

export function computeTerritories(kingdoms: Kingdom[], projection: GeoProjection): Territory[] {
	const key = signature(kingdoms, projection);
	const cached = cache.get(key);
	if (cached) return cached;

	// Kingdoms with a hand-authored polygon skip the Voronoi step entirely.
	const voronoiKingdoms = kingdoms.filter((k) => !k.polygon);

	const seeds: Seed[] = [];
	for (const k of voronoiKingdoms) {
		for (const point of seedCluster(k, projection)) {
			seeds.push({ point, kingdomId: k.id });
		}
	}
	for (const point of sentinelFrame(seeds.map((s) => s.point))) {
		seeds.push({ point, kingdomId: null });
	}

	// Group Voronoi cells by kingdom id.
	const cellsByKingdom = new Map<string, Feature<Polygon>[]>();
	if (seeds.length >= 3) {
		const collection = geoVoronoi<Seed>()
			.x((d) => d.point[0])
			.y((d) => d.point[1])
			.polygons(seeds) as unknown as FeatureCollection<Polygon>;

		for (const cell of collection.features) {
			const site = cell.properties?.site as Seed | undefined;
			if (!site?.kingdomId || !cell.geometry) continue;
			const list = cellsByKingdom.get(site.kingdomId) ?? [];
			list.push(cell as Feature<Polygon>);
			cellsByKingdom.set(site.kingdomId, list);
		}
	}

	const territories: Territory[] = [];
	for (const kingdom of kingdoms) {
		let shape: Feature<Polygon | MultiPolygon> | null = null;

		if (kingdom.polygon) {
			shape = polygonFeature(kingdom.polygon as Position[]);
		} else {
			const cells = cellsByKingdom.get(kingdom.id);
			if (cells && cells.length > 0) {
				shape = cells.length === 1 ? cells[0] : union(featureCollection(cells));
			}
		}

		let clipped = shape ? clipToLand(shape) : null;

		// Fallback: an ellipse-shaped patch clipped to land, so the kingdom still shows.
		if (!clipped) {
			const ring = ellipseRing(kingdom, projection);
			if (ring) clipped = clipToLand(polygonFeature(ring));
		}

		if (clipped) {
			// Turf emits RFC 7946 winding (CCW exterior); d3-geo's geoPath expects
			// the opposite, so rewind to CW or geoPath fills the polygon's complement.
			const wound = rewind(clipped, { reverse: true }) as LandPolygon;
			territories.push({ kingdom, feature: wound });
		}
	}

	cache.set(key, territories);
	// Bound the cache so resizing/scrubbing doesn't leak memory.
	if (cache.size > 40) cache.delete(cache.keys().next().value!);
	return territories;
}
