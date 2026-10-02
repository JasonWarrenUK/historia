/**
 * prepare-geo-data.ts
 *
 * Builds static/data/british-isles.topo.json from:
 *   - Domesday hundreds: Brookes, S. (2020) Domesday Shires and Hundreds of
 *     England [data-set]. York: Archaeology Data Service.
 *     https://doi.org/10.5284/1058999 (CC BY 4.0)
 *   - Legacy hand-drawn regions and coastline (data/legacy/), kept verbatim
 *     until every kingdom has migrated to hundreds (roadmap 1MF.1 onwards)
 *
 * Run: bun run geo:prepare (see data/raw/README.md for the download step)
 */

import { readFile, writeFile } from 'node:fs/promises';
import mapshaper from 'mapshaper';
import { topology } from 'topojson-server';
import type { Topology, GeometryObject } from 'topojson-specification';

const HUNDREDS_SHAPEFILE = 'data/raw/brookes-2020/DBhundreds.shp';
const LEGACY_TOPOLOGY = 'data/legacy/british-isles.legacy.topo.json';
const OUTPUT = 'static/data/british-isles.topo.json';

// Domesday shires whose hundreds are included; widened as kingdoms migrate
const HUNDRED_SHIRES = ['Norfolk', 'Suffolk', 'Cambridgeshire'];

// Percentage of removable vertices retained by Visvalingam simplification
const SIMPLIFY_PERCENT = '4%';

// ~1 m at British latitudes
const COORDINATE_PRECISION = 0.00001;

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[[\]()]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

async function buildHundreds(): Promise<GeoJSON.FeatureCollection> {
	const shireList = JSON.stringify(HUNDRED_SHIRES);
	const command = [
		`-i ${HUNDREDS_SHAPEFILE}`,
		`-filter '${shireList}.includes(County_1)'`,
		'-proj wgs84',
		'-clean',
		`-simplify ${SIMPLIFY_PERCENT} weighted keep-shapes`,
		'-clean',
		`-each 'shire=County_1, name=LAYER, terrId=TerrID'`,
		'-filter-fields shire,name,terrId',
		`-o hundreds.json format=geojson precision=${COORDINATE_PRECISION}`
	].join(' ');
	const output = await mapshaper.applyCommands(command);
	const collection = JSON.parse(String(output['hundreds.json'])) as GeoJSON.FeatureCollection;

	for (const feature of collection.features) {
		const { shire, name, terrId } = feature.properties as Record<string, string>;
		const id = `hd-${slugify(shire)}-${slugify(name)}`;
		feature.properties = { id, name, shire, terrId };
	}
	collection.features.sort((a, b) =>
		String(a.properties?.id).localeCompare(String(b.properties?.id))
	);

	const ids = collection.features.map((f) => f.properties?.id);
	const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
	if (duplicates.length > 0) throw new Error(`Duplicate hundred IDs: ${duplicates.join(', ')}`);
	return collection;
}

function shiftArcIndex(index: number, offset: number): number {
	return index >= 0 ? index + offset : ~(~index + offset);
}

function shiftArcs(arcs: unknown, offset: number): unknown {
	if (typeof arcs === 'number') return shiftArcIndex(arcs, offset);
	return (arcs as unknown[]).map((child) => shiftArcs(child, offset));
}

// Appends hundreds to the legacy topology without re-encoding legacy arcs,
// so legacy regions merge exactly as they did before
function combineTopologies(legacy: Topology, hundreds: Topology): Topology {
	const offset = legacy.arcs.length;
	const hundredsObject = hundreds.objects.hundreds as GeometryObject & {
		geometries: (GeometryObject & { arcs?: unknown })[];
	};
	const geometries = hundredsObject.geometries.map((geometry) =>
		'arcs' in geometry ? { ...geometry, arcs: shiftArcs(geometry.arcs, offset) } : geometry
	);
	return {
		...legacy,
		objects: {
			regions: legacy.objects.regions,
			hundreds: { type: 'GeometryCollection', geometries } as GeometryObject,
			coastline: legacy.objects.coastline
		},
		arcs: [...legacy.arcs, ...hundreds.arcs]
	} as Topology;
}

async function main(): Promise<void> {
	const legacy = JSON.parse(await readFile(LEGACY_TOPOLOGY, 'utf8')) as Topology;
	const hundredsGeoJSON = await buildHundreds();
	const hundredsTopology = topology({ hundreds: hundredsGeoJSON });
	const combined = combineTopologies(legacy, hundredsTopology);
	await writeFile(OUTPUT, JSON.stringify(combined));
	console.log(
		`Wrote ${OUTPUT}: ${hundredsGeoJSON.features.length} hundreds, ${combined.arcs.length} arcs`
	);
}

await main();
