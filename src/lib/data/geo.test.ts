import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { feature } from 'topojson-client';
import { mergeRegions, kingdomsToGeoJSON, kingdomLabelsToGeoJSON, type BritishIslesTopology } from './geo.js';
import { historicalPeriods } from './kingdoms.js';
import { eastAnglia700 } from './kingdom-east-anglia-700.js';
import * as fixtures from '../../../tests/fixtures/geo.js';

const topology = JSON.parse(
	readFileSync('static/data/british-isles.topo.json', 'utf8')
) as BritishIslesTopology;

const knownIds = new Set(
	[...topology.objects.regions.geometries, ...topology.objects.hundreds.geometries].map(
		(geometry) => (geometry.properties as { id: string }).id
	)
);

type Ring = number[][];

// Shoelace area in square degrees; adequate for comparing like with like
function ringArea(ring: Ring): number {
	let sum = 0;
	for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
		sum += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]);
	}
	return Math.abs(sum / 2);
}

function polygonsOf(geometry: GeoJSON.Geometry): Ring[][] {
	if (geometry.type === 'Polygon') return [geometry.coordinates];
	if (geometry.type === 'MultiPolygon') return geometry.coordinates;
	return [];
}

function geometryArea(geometry: GeoJSON.Geometry): number {
	return polygonsOf(geometry).reduce(
		(total, [outer, ...holes]) =>
			total + ringArea(outer) - holes.reduce((sum, hole) => sum + ringArea(hole), 0),
		0
	);
}

function ringContains(ring: Ring, [x, y]: [number, number]): boolean {
	let inside = false;
	for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
		const [xi, yi] = ring[i];
		const [xj, yj] = ring[j];
		if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}

function geometryContains(geometry: GeoJSON.Geometry, point: [number, number]): boolean {
	return polygonsOf(geometry).some(
		([outer, ...holes]) => ringContains(outer, point) && !holes.some((h) => ringContains(h, point))
	);
}

describe('kingdom data', () => {
	it('references only regions that exist in the topology', () => {
		const unknown = Object.entries(historicalPeriods).flatMap(([year, period]) =>
			period.kingdoms.flatMap((kingdom) =>
				[...kingdom.regions, ...(kingdom.contestedRegions ?? [])]
					.filter((id) => !knownIds.has(id))
					.map((id) => `${year} ${kingdom.id}: ${id}`)
			)
		);
		expect(unknown).toEqual([]);
	});

	it('assigns no region to two kingdoms in one period, beyond known legacy issues', () => {
		const clashes: string[] = [];
		for (const [year, period] of Object.entries(historicalPeriods)) {
			const allowed = fixtures.knownLegacyDoubleAssignments[Number(year)] ?? [];
			const seen = new Map<string, string>();
			for (const kingdom of period.kingdoms) {
				for (const id of kingdom.regions) {
					const owner = seen.get(id);
					if (owner && !allowed.includes(id)) clashes.push(`${year} ${id}: ${owner}, ${kingdom.id}`);
					seen.set(id, kingdom.id);
				}
			}
		}
		expect(clashes).toEqual([]);
	});

	it('draws every kingdom in every period', () => {
		for (const period of Object.values(historicalPeriods)) {
			const collection = kingdomsToGeoJSON(topology, period.kingdoms);
			expect(collection.features).toHaveLength(period.kingdoms.length);
		}
	});
});

describe('kingdom labels', () => {
	it('labels each kingdom once, even when it is drawn in several parts', () => {
		for (const period of Object.values(historicalPeriods)) {
			const labels = kingdomLabelsToGeoJSON(period.kingdoms).features;
			expect(labels.map((f) => f.properties!.id)).toEqual(period.kingdoms.map((k) => k.id));
		}
	});
});

describe('reference kingdom: East Anglia 700', () => {
	const merged = mergeRegions(topology, eastAnglia700.regions)!;

	it('is the kingdom used in the 700 period', () => {
		expect(historicalPeriods[700].kingdoms).toContain(eastAnglia700);
	});

	it('dissolves into one landmass with no holes', () => {
		const polygons = polygonsOf(merged);
		expect(polygons.every((rings) => rings.length === 1)).toBe(true);
		// Beyond the mainland, the source has Lothingland (cut off by the Waveney
		// and Breydon Water) and a coastal islet near Southwold
		expect(polygons).toHaveLength(3);
		const areas = polygons.map(([outer]) => ringArea(outer)).sort((a, b) => b - a);
		expect(areas[0] / areas.reduce((sum, area) => sum + area, 0)).toBeGreaterThan(0.98);
	});

	it('has no gaps or overlaps between its hundreds', () => {
		const hundreds = feature(topology, topology.objects.hundreds).features.filter((f) =>
			eastAnglia700.regions.includes(f.properties!.id)
		);
		const sumOfParts = hundreds.reduce((sum, f) => sum + geometryArea(f.geometry), 0);
		expect(geometryArea(merged) / sumOfParts).toBeCloseTo(1, 3);
	});

	it.each(Object.entries(fixtures.insideEastAnglia700))('contains %s', (_, point) => {
		expect(geometryContains(merged, point)).toBe(true);
	});

	it.each(Object.entries(fixtures.outsideEastAnglia700))('excludes %s', (_, point) => {
		expect(geometryContains(merged, point)).toBe(false);
	});

	it('keeps contested ground separate from its regions', () => {
		const contested = eastAnglia700.contestedRegions ?? [];
		expect(contested.length).toBeGreaterThan(0);
		expect(contested.filter((id) => eastAnglia700.regions.includes(id))).toEqual([]);
	});

	it('has complete descriptive data', () => {
		expect(eastAnglia700.founded).toBeLessThan(700);
		expect(eastAnglia700.ended).toBeGreaterThan(700);
		expect(geometryContains(merged, eastAnglia700.capital!.location)).toBe(true);
		expect(eastAnglia700.rulers!.length).toBeGreaterThan(0);
		expect(eastAnglia700.description).toBeTruthy();
		expect(eastAnglia700.sources!.every((source) => source.citation)).toBe(true);
	});
});
