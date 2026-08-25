import { merge, feature } from 'topojson-client';
import type { Topology, GeometryCollection, Polygon, MultiPolygon } from 'topojson-specification';

export type RegionProperties = { id: string; name: string };

export type BritishIslesTopology = Topology<{
	regions: GeometryCollection<RegionProperties>;
	coastline: GeometryCollection<{ name: string }>;
}>;

let cachedTopology: BritishIslesTopology | null = null;

export async function loadTopology(): Promise<BritishIslesTopology> {
	if (cachedTopology) return cachedTopology;
	const response = await fetch('/data/british-isles.topo.json');
	if (!response.ok) throw new Error(`Failed to load topology: ${response.status}`);
	cachedTopology = await response.json() as BritishIslesTopology;
	return cachedTopology;
}

export function getCoastlineGeoJSON(topology: BritishIslesTopology): GeoJSON.FeatureCollection {
	return feature(topology, topology.objects.coastline) as GeoJSON.FeatureCollection;
}

export function mergeRegions(
	topology: BritishIslesTopology,
	regionIds: string[]
): GeoJSON.Geometry | null {
	const geoms = topology.objects.regions.geometries.filter(
		(g): g is Polygon<RegionProperties> | MultiPolygon<RegionProperties> =>
			g.properties != null &&
			regionIds.includes((g.properties as RegionProperties).id) &&
			(g.type === 'Polygon' || g.type === 'MultiPolygon')
	);
	if (geoms.length === 0) return null;
	return merge(topology, geoms) as GeoJSON.Geometry;
}

export function kingdomsToGeoJSON(
	topology: BritishIslesTopology,
	kingdoms: import('./types.js').Kingdom[]
): GeoJSON.FeatureCollection {
	const features: GeoJSON.Feature[] = [];
	for (const k of kingdoms) {
		const geometry = mergeRegions(topology, k.regions);
		if (!geometry) continue;
		features.push({
			type: 'Feature',
			id: k.id,
			properties: {
				id: k.id,
				name: k.name,
				color: k.color,
				territory: k.territory,
				type: k.type
			},
			geometry
		});
	}
	return { type: 'FeatureCollection', features };
}

export function getKingdomBounds(
	topology: BritishIslesTopology,
	regionIds: string[]
): [[number, number], [number, number]] | null {
	const geometry = mergeRegions(topology, regionIds);
	if (!geometry) return null;
	const coords = flattenCoordinates(geometry);
	if (coords.length === 0) return null;
	const lons = coords.map((c) => c[0]);
	const lats = coords.map((c) => c[1]);
	return [
		[Math.min(...lons), Math.min(...lats)],
		[Math.max(...lons), Math.max(...lats)]
	];
}

function flattenCoordinates(geometry: GeoJSON.Geometry): [number, number][] {
	const coords: [number, number][] = [];
	function collect(g: GeoJSON.Geometry) {
		if (g.type === 'Polygon') {
			for (const ring of g.coordinates) {
				for (const c of ring) coords.push(c as [number, number]);
			}
		} else if (g.type === 'MultiPolygon') {
			for (const poly of g.coordinates) {
				for (const ring of poly) {
					for (const c of ring) coords.push(c as [number, number]);
				}
			}
		} else if (g.type === 'GeometryCollection') {
			for (const sub of g.geometries) collect(sub);
		}
	}
	collect(geometry);
	return coords;
}

// Rivers remain as inline GeoJSON — no dependency on the topology file.
export const britishIslesRiversGeoJSON = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: { name: 'Thames' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-1.80, 51.70],
					[-1.60, 51.68],
					[-1.40, 51.66],
					[-1.24, 51.66],
					[-1.10, 51.63],
					[-0.95, 51.62],
					[-0.80, 51.60],
					[-0.60, 51.56],
					[-0.40, 51.54],
					[-0.20, 51.52],
					[-0.05, 51.51],
					[0.10, 51.50],
					[0.30, 51.50],
					[0.50, 51.50],
					[0.70, 51.50]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Severn' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-3.80, 52.50],
					[-3.60, 52.44],
					[-3.40, 52.38],
					[-3.20, 52.32],
					[-3.00, 52.26],
					[-2.78, 52.18],
					[-2.60, 52.08],
					[-2.46, 51.98],
					[-2.36, 51.88],
					[-2.28, 51.78],
					[-2.22, 51.70],
					[-2.60, 51.62],
					[-2.68, 51.60],
					[-2.72, 51.56],
					[-2.70, 51.52],
					[-2.70, 51.50]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Trent' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-2.00, 52.70],
					[-1.90, 52.75],
					[-1.78, 52.82],
					[-1.62, 52.92],
					[-1.46, 53.00],
					[-1.28, 53.04],
					[-1.10, 53.08],
					[-0.92, 53.16],
					[-0.76, 53.28],
					[-0.62, 53.42],
					[-0.60, 53.56],
					[-0.66, 53.66],
					[-0.70, 53.70]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Humber' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-1.00, 53.80],
					[-0.80, 53.74],
					[-0.60, 53.70],
					[-0.40, 53.66],
					[-0.20, 53.63],
					[0.00, 53.62],
					[0.10, 53.60]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Tyne' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-2.40, 54.90],
					[-2.20, 54.94],
					[-2.00, 54.96],
					[-1.82, 54.98],
					[-1.64, 54.98],
					[-1.48, 54.99],
					[-1.42, 55.00]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Forth' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-4.00, 56.10],
					[-3.80, 56.08],
					[-3.60, 56.08],
					[-3.40, 56.06],
					[-3.20, 56.06],
					[-3.00, 56.05]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Tay' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-4.30, 56.60],
					[-4.10, 56.56],
					[-3.90, 56.54],
					[-3.70, 56.52],
					[-3.50, 56.50],
					[-3.30, 56.48],
					[-3.10, 56.46],
					[-3.00, 56.45]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Tweed' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-3.30, 55.60],
					[-3.10, 55.64],
					[-2.90, 55.68],
					[-2.70, 55.72],
					[-2.50, 55.74],
					[-2.30, 55.76],
					[-2.00, 55.77]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Exe' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-3.60, 51.10],
					[-3.54, 50.96],
					[-3.52, 50.84],
					[-3.50, 50.74],
					[-3.48, 50.66],
					[-3.44, 50.62],
					[-3.40, 50.60]
				]
			}
		},
		{
			type: 'Feature',
			properties: { name: 'Wye' },
			geometry: {
				type: 'LineString',
				coordinates: [
					[-3.50, 52.30],
					[-3.30, 52.24],
					[-3.10, 52.18],
					[-2.90, 52.12],
					[-2.72, 52.02],
					[-2.60, 51.90],
					[-2.66, 51.78],
					[-2.66, 51.70],
					[-2.66, 51.61]
				]
			}
		}
	]
} as const;
