import maplibregl from 'maplibre-gl';
import type { BritishIslesTopology } from '$lib/data/geo.js';
import { getCoastlineGeoJSON, kingdomsToGeoJSON as buildKingdomsGeoJSON, britishIslesRiversGeoJSON, getKingdomBounds } from '$lib/data/geo.js';
import type { Kingdom, Artifact } from '$lib/data/types.js';
import { ATLAS_COLORS, ATLAS_WIDTHS, ATLAS_OPACITIES } from './atlas-style.js';

export interface MapCallbacks {
	onKingdomClick: (kingdom: Kingdom) => void;
	onKingdomHover: (kingdom: Kingdom | null, x: number, y: number) => void;
	onArtifactClick: (artifact: Artifact) => void;
	onArtifactHover: (artifact: Artifact | null, x: number, y: number) => void;
}

// Dual-source crossfade state
let activeSource: 'a' | 'b' = 'a';
let kingdoms: Kingdom[] = [];
let topology: BritishIslesTopology | null = null;

function kingdomsToGeoJSON(ks: Kingdom[]): GeoJSON.FeatureCollection {
	if (!topology) return { type: 'FeatureCollection', features: [] };
	return buildKingdomsGeoJSON(topology, ks);
}

function artifactsToGeoJSON(artifacts: Artifact[]): GeoJSON.FeatureCollection {
	return {
		type: 'FeatureCollection',
		features: artifacts.map((a) => ({
			type: 'Feature',
			id: a.id,
			properties: {
				id: a.id,
				name: a.name,
				emoji: a.image,
				description: a.description,
				year: a.year,
				kingdom: a.kingdom
			},
			geometry: {
				type: 'Point',
				coordinates: [a.location[0], a.location[1]]
			}
		}))
	};
}

export function createMap(
	container: HTMLElement,
	topo: BritishIslesTopology,
	callbacks: MapCallbacks
): maplibregl.Map {
	topology = topo;

	const map = new maplibregl.Map({
		container,
		style: {
			version: 8,
			sources: {},
			layers: [
				{
					id: 'background',
					type: 'background',
					paint: { 'background-color': ATLAS_COLORS.ocean }
				}
			]
		},
		center: [-2.5, 54.5],
		zoom: 4.8,
		minZoom: 3,
		maxZoom: 12,
		attributionControl: false
	});

	map.on('load', () => {
		// Coastline source — extracted from topology
		const coastlineGeoJSON = getCoastlineGeoJSON(topo);
		map.addSource('coastline', {
			type: 'geojson',
			data: coastlineGeoJSON
		});

		// Land fill — warm cream parchment
		map.addLayer({
			id: 'land-fill',
			type: 'fill',
			source: 'coastline',
			paint: {
				'fill-color': ATLAS_COLORS.land
			}
		});

		// Land shadow — wider, darker stroke for an engraved depth effect
		map.addLayer({
			id: 'land-shadow',
			type: 'line',
			source: 'coastline',
			paint: {
				'line-color': ATLAS_COLORS.landShadow,
				'line-width': ATLAS_WIDTHS.coastShadow,
				'line-opacity': ATLAS_OPACITIES.coastShadow,
				'line-blur': 2
			}
		});

		// Coastline stroke — warm brown outline
		map.addLayer({
			id: 'coastline-stroke',
			type: 'line',
			source: 'coastline',
			paint: {
				'line-color': ATLAS_COLORS.coastStroke,
				'line-width': ATLAS_WIDTHS.coastStroke
			}
		});

		// Coastline inner highlight — subtle warm highlight inside the stroke
		map.addLayer({
			id: 'coastline-inner-highlight',
			type: 'line',
			source: 'coastline',
			paint: {
				'line-color': ATLAS_COLORS.coastInnerHighlight,
				'line-width': ATLAS_WIDTHS.coastInnerHighlight,
				'line-offset': -1
			}
		});

		// Parchment texture — very subtle warm tint over land
		map.addLayer({
			id: 'land-texture',
			type: 'fill',
			source: 'coastline',
			paint: {
				'fill-color': ATLAS_COLORS.landTexture
			}
		});

		// Rivers — dusty blue, semi-transparent
		map.addSource('rivers', {
			type: 'geojson',
			data: britishIslesRiversGeoJSON as unknown as GeoJSON.FeatureCollection
		});

		map.addLayer({
			id: 'rivers-line',
			type: 'line',
			source: 'rivers',
			paint: {
				'line-color': ATLAS_COLORS.riverBlue,
				'line-width': ATLAS_WIDTHS.river,
				'line-opacity': ATLAS_OPACITIES.river
			}
		});

		// Dual kingdom sources for crossfade
		const emptyGeoJSON: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features: [] };

		map.addSource('kingdoms-a', { type: 'geojson', data: emptyGeoJSON });
		map.addSource('kingdoms-b', { type: 'geojson', data: emptyGeoJSON });

		for (const src of ['a', 'b'] as const) {
			map.addLayer({
				id: `kingdoms-fill-${src}`,
				type: 'fill',
				source: `kingdoms-${src}`,
				paint: {
					'fill-color': ['get', 'color'],
					'fill-opacity': 0,
					'fill-opacity-transition': { duration: 400 }
				}
			});

			map.addLayer({
				id: `kingdoms-outline-${src}`,
				type: 'line',
				source: `kingdoms-${src}`,
				paint: {
					'line-color': ['get', 'color'],
					'line-width': ATLAS_WIDTHS.kingdomOutline,
					'line-opacity': 0,
					'line-opacity-transition': { duration: 400 }
				}
			});

			map.addLayer({
				id: `kingdoms-selection-${src}`,
				type: 'line',
				source: `kingdoms-${src}`,
				filter: ['==', ['get', 'id'], ''],
				paint: {
					'line-color': ATLAS_COLORS.selectionRing,
					'line-width': ATLAS_WIDTHS.selectionDash,
					'line-dasharray': [4, 3],
					'line-opacity': 0,
					'line-opacity-transition': { duration: 200 }
				}
			});

			map.addLayer({
				id: `kingdoms-labels-${src}`,
				type: 'symbol',
				source: `kingdoms-${src}`,
				layout: {
					'text-field': ['get', 'name'],
					'text-size': 11,
					'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
					'text-anchor': 'center',
					'text-max-width': 8
				},
				paint: {
					'text-color': ATLAS_COLORS.kingdomLabel,
					'text-halo-color': ATLAS_COLORS.labelHalo,
					'text-halo-width': 1.5,
					'text-opacity': 0,
					'text-opacity-transition': { duration: 400 }
				}
			});
		}

		// Artifact source
		map.addSource('artifacts', { type: 'geojson', data: emptyGeoJSON });

		map.addLayer({
			id: 'artifacts-layer',
			type: 'symbol',
			source: 'artifacts',
			layout: {
				'text-field': ['get', 'emoji'],
				'text-size': 20,
				'text-anchor': 'center',
				'text-allow-overlap': true
			},
			paint: {
				'text-opacity': 1
			}
		});

		// Interactivity
		_wireInteractivity(map, callbacks);
	});

	// Double-click to reset
	map.on('dblclick', () => {
		map.flyTo({ center: [-2.5, 54.5], zoom: 4.8, duration: 600 });
	});

	return map;
}

function _wireInteractivity(map: maplibregl.Map, callbacks: MapCallbacks) {
	const kingdomFillLayers = ['kingdoms-fill-a', 'kingdoms-fill-b'];
	const artifactLayer = 'artifacts-layer';

	// Kingdom click
	for (const layer of kingdomFillLayers) {
		map.on('click', layer, (e) => {
			if (!e.features?.length) return;
			const props = e.features[0].properties;
			const kingdom = kingdoms.find((k) => k.id === props.id);
			if (kingdom) callbacks.onKingdomClick(kingdom);
		});
	}

	// Kingdom hover
	let hoveredKingdomId: string | null = null;
	for (const layer of kingdomFillLayers) {
		map.on('mousemove', layer, (e) => {
			if (!e.features?.length) return;
			map.getCanvas().style.cursor = 'pointer';
			const id = e.features[0].properties.id;
			if (id !== hoveredKingdomId) {
				hoveredKingdomId = id;
				const kingdom = kingdoms.find((k) => k.id === id);
				if (kingdom) callbacks.onKingdomHover(kingdom, e.point.x, e.point.y);
			} else {
				const kingdom = kingdoms.find((k) => k.id === id);
				if (kingdom) callbacks.onKingdomHover(kingdom, e.point.x, e.point.y);
			}
		});

		map.on('mouseleave', layer, () => {
			map.getCanvas().style.cursor = '';
			hoveredKingdomId = null;
			callbacks.onKingdomHover(null, 0, 0);
		});
	}

	// Artifact click
	map.on('click', artifactLayer, (e) => {
		if (!e.features?.length) return;
		const props = e.features[0].properties;
		const artifact = {
			id: props.id,
			name: props.name,
			year: props.year,
			location: (e.features[0].geometry as GeoJSON.Point).coordinates as [number, number],
			kingdom: props.kingdom,
			description: props.description,
			image: props.emoji,
			type: 'artifact'
		} as import('$lib/data/types.js').Artifact;
		callbacks.onArtifactClick(artifact);
	});

	map.on('mousemove', artifactLayer, (e) => {
		if (!e.features?.length) return;
		map.getCanvas().style.cursor = 'pointer';
		const props = e.features[0].properties;
		const artifact = {
			id: props.id,
			name: props.name,
			year: props.year,
			location: (e.features[0].geometry as GeoJSON.Point).coordinates as [number, number],
			kingdom: props.kingdom,
			description: props.description,
			image: props.emoji,
			type: 'artifact'
		} as import('$lib/data/types.js').Artifact;
		callbacks.onArtifactHover(artifact, e.point.x, e.point.y);
	});

	map.on('mouseleave', artifactLayer, () => {
		map.getCanvas().style.cursor = '';
		callbacks.onArtifactHover(null, 0, 0);
	});
}

export function updateKingdoms(
	map: maplibregl.Map,
	newKingdoms: Kingdom[],
	selectedId: string | null
): void {
	kingdoms = newKingdoms;
	const inactive: 'a' | 'b' = activeSource === 'a' ? 'b' : 'a';
	const geoJSON = kingdomsToGeoJSON(newKingdoms);

	// Load data into inactive source
	(map.getSource(`kingdoms-${inactive}`) as maplibregl.GeoJSONSource)?.setData(geoJSON);

	// Fade out active, fade in inactive
	map.setPaintProperty(`kingdoms-fill-${activeSource}`, 'fill-opacity', 0);
	map.setPaintProperty(`kingdoms-outline-${activeSource}`, 'line-opacity', 0);
	map.setPaintProperty(`kingdoms-labels-${activeSource}`, 'text-opacity', 0);
	map.setPaintProperty(`kingdoms-selection-${activeSource}`, 'line-opacity', 0);

	map.setPaintProperty(`kingdoms-fill-${inactive}`, 'fill-opacity', ATLAS_OPACITIES.kingdomFill);
	map.setPaintProperty(`kingdoms-outline-${inactive}`, 'line-opacity', ATLAS_OPACITIES.kingdomOutline);
	map.setPaintProperty(`kingdoms-labels-${inactive}`, 'text-opacity', 1);

	// Selection ring on new source
	_applySelection(map, inactive, selectedId);

	activeSource = inactive;
}

function _applySelection(map: maplibregl.Map, src: 'a' | 'b', selectedId: string | null) {
	const filter = selectedId ? ['==', ['get', 'id'], selectedId] : ['==', ['get', 'id'], ''];
	map.setFilter(`kingdoms-selection-${src}`, filter as maplibregl.FilterSpecification);
	map.setPaintProperty(
		`kingdoms-selection-${src}`,
		'line-opacity',
		selectedId ? ATLAS_OPACITIES.selectionRing : 0
	);
}

export function highlightKingdom(map: maplibregl.Map, selectedId: string | null): void {
	_applySelection(map, activeSource, selectedId);
	// Clear inactive selection
	const inactive: 'a' | 'b' = activeSource === 'a' ? 'b' : 'a';
	map.setFilter(`kingdoms-selection-${inactive}`, ['==', ['get', 'id'], ''] as maplibregl.FilterSpecification);
	map.setPaintProperty(`kingdoms-selection-${inactive}`, 'line-opacity', 0);
}

export function updateArtifacts(
	map: maplibregl.Map,
	artifacts: Artifact[],
	visible: boolean
): void {
	const data = visible ? artifactsToGeoJSON(artifacts) : { type: 'FeatureCollection' as const, features: [] };
	(map.getSource('artifacts') as maplibregl.GeoJSONSource)?.setData(data);
}

export function fitToKingdom(
	map: maplibregl.Map,
	kingdom: Kingdom
): void {
	if (!topology) return;
	const bounds = getKingdomBounds(topology, kingdom.regions);
	if (!bounds) return;
	map.fitBounds(bounds, { padding: 60, duration: 600 });
}
