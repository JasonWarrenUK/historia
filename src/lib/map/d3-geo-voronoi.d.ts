declare module 'd3-geo-voronoi' {
	import type { FeatureCollection, Geometry } from 'geojson';

	// Minimal typings for the subset of the GeoJSON API we use. The library
	// ships no types of its own (d3-geo-voronoi@2). Accessors and `.polygons()`
	// operate on whatever datum type the caller supplies.
	export interface GeoVoronoi<Datum = unknown> {
		(data?: Datum[]): GeoVoronoi<Datum>;
		x(accessor: (d: Datum) => number): GeoVoronoi<Datum>;
		y(accessor: (d: Datum) => number): GeoVoronoi<Datum>;
		polygons(data?: Datum[]): FeatureCollection<Geometry, { site: Datum; sitecoordinates: [number, number] }>;
		triangles(data?: Datum[]): FeatureCollection;
		links(data?: Datum[]): FeatureCollection;
		mesh(data?: Datum[]): Geometry;
	}

	export function geoVoronoi<Datum = unknown>(data?: Datum[]): GeoVoronoi<Datum>;
	export function geoDelaunay(points?: [number, number][]): unknown;
	export function geoContour(): unknown;
}
