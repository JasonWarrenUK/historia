import * as d3 from 'd3';
import { britishIslesGeoJSON } from '$lib/data/geo.js';
import { computeTerritories, type Territory } from '$lib/map/territories.js';
import type { Kingdom, Artifact } from '$lib/data/types.js';

export interface RenderOptions {
	width: number;
	height: number;
	kingdoms: Kingdom[];
	visibleArtifacts: Artifact[];
	showArtifacts: boolean;
	selectedKingdomId: string | null;
	onKingdomClick: (kingdom: Kingdom) => void;
	onKingdomHover: (kingdom: Kingdom | null, x: number, y: number) => void;
	onArtifactClick: (artifact: Artifact) => void;
	onArtifactHover: (artifact: Artifact | null, x: number, y: number) => void;
}

// Module-level state for the persistent map instance
let zoomTransform = d3.zoomIdentity;
let zoomBehavior: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null;
let currentProjection: d3.GeoProjection | null = null;
let currentWidth = 0;
let currentHeight = 0;

// Respect the user's reduced-motion preference for D3 transitions
function dur(ms: number): number {
	return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
		? 0
		: ms;
}

export function buildProjection(width: number, height: number): d3.GeoProjection {
	return d3
		.geoAlbers()
		.center([0, 55.4])
		.rotate([3.0, 0])
		.parallels([50, 60])
		.scale(width * 5)
		.translate([width / 2, height / 2]);
}

function ensureGradients(defs: d3.Selection<SVGDefsElement, unknown, null, undefined>, kingdoms: Kingdom[]) {
	kingdoms.forEach((k) => {
		const id = `grad-${k.id}`;
		if (defs.select(`#${id}`).empty()) {
			const grad = defs.append('radialGradient')
				.attr('id', id)
				.attr('cx', '40%')
				.attr('cy', '35%')
				.attr('r', '65%');
			grad.append('stop').attr('offset', '0%').attr('stop-color', k.color).attr('stop-opacity', 0.6);
			grad.append('stop').attr('offset', '100%').attr('stop-color', k.color).attr('stop-opacity', 0.15);
		}
	});
}

export function initMap(
	svgElement: SVGSVGElement,
	width: number,
	height: number,
	onZoom: () => void,
	onBackgroundClick: () => void
): void {
	currentWidth = width;
	currentHeight = height;
	currentProjection = buildProjection(width, height);

	const svg = d3.select(svgElement);
	svg.selectAll('*').remove();

	svg.attr('width', width).attr('height', height);

	// Defs for gradients
	svg.append('defs').attr('id', 'map-defs');

	// Ocean background (static, outside zoom root)
	svg.append('rect')
		.attr('id', 'layer-ocean')
		.attr('width', width)
		.attr('height', height)
		.attr('fill', '#1a365d');

	// Zoom root — all geographic layers live inside this
	const zoomRoot = svg.append('g').attr('id', 'zoom-root');

	zoomRoot.append('g').attr('id', 'layer-land');
	zoomRoot.append('g').attr('id', 'layer-kingdoms');
	zoomRoot.append('g').attr('id', 'layer-labels');
	zoomRoot.append('g').attr('id', 'layer-artifacts');

	// Draw land (static for this projection)
	drawLand(svg, currentProjection);

	// Zoom behaviour
	const zoom = d3.zoom<SVGSVGElement, unknown>()
		.scaleExtent([1, 8])
		.on('zoom', (event) => {
			zoomTransform = event.transform;
			zoomRoot.attr('transform', event.transform.toString());
			onZoom();
		});
	zoomBehavior = zoom;

	svg.call(zoom);

	// Click on empty ocean/land (not a kingdom or artifact) clears the selection.
	// d3-zoom suppresses the click that follows a pan gesture, so dragging the
	// map won't deselect — only genuine clicks reach this handler.
	svg.on('click', () => onBackgroundClick());

	// Double-click to reset zoom
	svg.on('dblclick.zoom', () => {
		svg.transition().duration(dur(400)).call(zoom.transform, d3.zoomIdentity);
	});
}

export function zoomIn(svgElement: SVGSVGElement): void {
	if (!zoomBehavior) return;
	d3.select(svgElement).transition().duration(dur(250)).call(zoomBehavior.scaleBy, 1.5);
}

export function zoomOut(svgElement: SVGSVGElement): void {
	if (!zoomBehavior) return;
	d3.select(svgElement).transition().duration(dur(250)).call(zoomBehavior.scaleBy, 1 / 1.5);
}

export function resetZoom(svgElement: SVGSVGElement): void {
	if (!zoomBehavior) return;
	d3.select(svgElement).transition().duration(dur(400)).call(zoomBehavior.transform, d3.zoomIdentity);
}

function drawLand(
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	projection: d3.GeoProjection
): void {
	const path = d3.geoPath().projection(projection);
	const layer = svg.select<SVGGElement>('#layer-land');
	layer.selectAll('*').remove();

	layer
		.selectAll('path')
		.data(britishIslesGeoJSON.features)
		.enter()
		.append('path')
		.attr('d', path as unknown as string)
		.attr('fill', '#4a5568')
		.attr('stroke', '#718096')
		.attr('stroke-width', 0.8);
}

export function resizeMap(svgElement: SVGSVGElement, width: number, height: number): void {
	currentWidth = width;
	currentHeight = height;
	currentProjection = buildProjection(width, height);
	zoomTransform = d3.zoomIdentity;

	const svg = d3.select(svgElement);
	svg.attr('width', width).attr('height', height);
	svg.select('#layer-ocean').attr('width', width).attr('height', height);

	// Reset zoom root transform and sync d3-zoom's internal element state so the
	// next gesture starts from identity rather than a stale transform.
	svg.select('#zoom-root').attr('transform', null);
	if (zoomBehavior) svg.call(zoomBehavior.transform, d3.zoomIdentity);

	drawLand(svg, currentProjection);
}

export function updateKingdoms(
	svgElement: SVGSVGElement,
	kingdoms: Kingdom[],
	selectedKingdomId: string | null,
	onKingdomClick: (kingdom: Kingdom) => void,
	onKingdomHover: (kingdom: Kingdom | null, x: number, y: number) => void
): void {
	if (!currentProjection) return;

	const svg = d3.select(svgElement);
	const defs = svg.select<SVGDefsElement>('#map-defs');
	ensureGradients(defs, kingdoms);

	const scale = zoomTransform.k;
	const showLabelsAll = scale >= 2;

	// Build territory polygons (tessellated + clipped to the coastline) and a
	// geoPath that renders them in the same projection as the land layer.
	const path = d3.geoPath().projection(currentProjection);
	const territories = computeTerritories(kingdoms, currentProjection);

	interface KingdomDatum {
		kingdom: Kingdom;
		feature: Territory['feature'];
		cx: number;
		cy: number;
	}

	const data: KingdomDatum[] = territories.map((t) => {
		const [cx, cy] = path.centroid(t.feature);
		return { kingdom: t.kingdom, feature: t.feature, cx, cy };
	});

	// --- Territory polygons ---
	const kingdomLayer = svg.select<SVGGElement>('#layer-kingdoms');
	const paths = kingdomLayer.selectAll<SVGPathElement, KingdomDatum>('path.territory')
		.data(data, (d) => d.kingdom.id);

	// Enter
	paths.enter()
		.append('path')
		.attr('class', 'territory')
		.attr('d', (d) => path(d.feature))
		.attr('fill', (d) => `url(#grad-${d.kingdom.id})`)
		.attr('stroke', (d) => d.kingdom.color)
		.attr('stroke-width', 1.5)
		.attr('stroke-opacity', 0.7)
		.attr('fill-opacity', 0)
		.style('cursor', 'pointer')
		.on('click', (event, d) => {
			event.stopPropagation();
			onKingdomClick(d.kingdom);
		})
		.on('pointerenter', function (event, d) {
			d3.select(this).attr('stroke-width', 2.5).attr('stroke-opacity', 1);
			if (event.pointerType === 'touch') return;
			const [px, py] = d3.pointer(event, svgElement);
			onKingdomHover(d.kingdom, px, py);
		})
		.on('pointermove', function (event) {
			if (event.pointerType === 'touch') return;
			const [px, py] = d3.pointer(event, svgElement);
			// Update tooltip position — we just re-emit hover with same kingdom
			const datum = d3.select<SVGPathElement, KingdomDatum>(this).datum();
			onKingdomHover(datum.kingdom, px, py);
		})
		.on('pointerleave', function () {
			d3.select(this).attr('stroke-width', 1.5).attr('stroke-opacity', 0.7);
			onKingdomHover(null, 0, 0);
		})
		.transition().duration(dur(400)).ease(d3.easeCubicOut)
		.attr('fill-opacity', 1);

	// Update — territory shape differs entirely between periods, so set `d`
	// directly rather than tweening the path string.
	paths
		.attr('d', (d) => path(d.feature))
		.attr('fill', (d) => `url(#grad-${d.kingdom.id})`)
		.attr('stroke', (d) => d.kingdom.color);

	// Exit
	paths.exit()
		.transition().duration(dur(200))
		.attr('fill-opacity', 0)
		.attr('stroke-opacity', 0)
		.remove();

	// Selection highlight — the same territory outline, dashed in white.
	const rings = kingdomLayer.selectAll<SVGPathElement, KingdomDatum>('path.selection-ring')
		.data(data.filter((d) => d.kingdom.id === selectedKingdomId), (d) => d.kingdom.id);

	rings.enter()
		.append('path')
		.attr('class', 'selection-ring')
		.attr('pointer-events', 'none')
		.attr('fill', 'none')
		.attr('stroke', 'white')
		.attr('stroke-width', 2)
		.attr('stroke-dasharray', '4 3')
		.attr('stroke-opacity', 0)
		.attr('d', (d) => path(d.feature))
		.transition().duration(dur(200))
		.attr('stroke-opacity', 0.9);

	rings.attr('d', (d) => path(d.feature));

	rings.exit()
		.transition().duration(dur(150))
		.attr('stroke-opacity', 0)
		.remove();

	// --- Labels ---
	const labelLayer = svg.select<SVGGElement>('#layer-labels');
	const labels = labelLayer.selectAll<SVGGElement, KingdomDatum>('g.label')
		.data(
			data.filter(
				(d) => (showLabelsAll || d.kingdom.radius >= 10) && isFinite(d.cx) && isFinite(d.cy)
			),
			(d) => d.kingdom.id
		);

	const labelsEnter = labels.enter()
		.append('g')
		.attr('class', 'label')
		.attr('pointer-events', 'none')
		.attr('opacity', 0);

	labelsEnter.append('rect').attr('class', 'label-bg').attr('rx', 3);
	labelsEnter.append('text').attr('class', 'label-text');

	const allLabels = labels.merge(labelsEnter);

	// Measure and position text at the territory centroid
	allLabels.each(function (d) {
		const g = d3.select(this);
		const labelY = d.cy - 7;

		const textEl = g.select<SVGTextElement>('text.label-text')
			.attr('x', d.cx)
			.attr('y', labelY + 9)
			.attr('text-anchor', 'middle')
			.attr('fill', 'white')
			.attr('font-size', '9px')
			.attr('font-weight', '600')
			.text(d.kingdom.name);

		// getBBox requires the element to be in the DOM — it will be after first render
		let textWidth = d.kingdom.name.length * 5.5; // fallback
		try {
			const bbox = textEl.node()?.getBBox();
			if (bbox && bbox.width > 0) textWidth = bbox.width;
		} catch {
			// getBBox may throw if element not yet rendered
		}

		g.select('rect.label-bg')
			.attr('x', d.cx - textWidth / 2 - 4)
			.attr('y', labelY)
			.attr('width', textWidth + 8)
			.attr('height', 14)
			.attr('fill', d.kingdom.color);
	});

	allLabels.transition().duration(dur(400))
		.attr('opacity', 1);

	labels.exit()
		.transition().duration(dur(200))
		.attr('opacity', 0)
		.remove();
}

export function updateArtifacts(
	svgElement: SVGSVGElement,
	visibleArtifacts: Artifact[],
	showArtifacts: boolean,
	onArtifactClick: (artifact: Artifact) => void,
	onArtifactHover: (artifact: Artifact | null, x: number, y: number) => void
): void {
	if (!currentProjection) return;

	const svg = d3.select(svgElement);
	const layer = svg.select<SVGGElement>('#layer-artifacts');

	interface ArtifactDatum {
		artifact: Artifact;
		x: number;
		y: number;
	}

	const data: ArtifactDatum[] = showArtifacts
		? visibleArtifacts.flatMap((a) => {
				const coords = currentProjection!([a.location[0], a.location[1]]);
				if (!coords) return [];
				return [{ artifact: a, x: coords[0], y: coords[1] }];
			})
		: [];

	const markers = layer.selectAll<SVGTextElement, ArtifactDatum>('text.artifact')
		.data(data, (d) => d.artifact.id);

	markers.enter()
		.append('text')
		.attr('class', 'artifact')
		.attr('text-anchor', 'middle')
		.attr('dominant-baseline', 'middle')
		.attr('font-size', '18px')
		.style('cursor', 'pointer')
		.style('filter', 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))')
		.attr('x', (d) => d.x)
		.attr('y', (d) => d.y)
		.attr('opacity', 0)
		.text((d) => d.artifact.image)
		.on('click', (event, d) => {
			event.stopPropagation();
			onArtifactClick(d.artifact);
		})
		.on('pointerenter', function (event, d) {
			d3.select(this).attr('font-size', '22px');
			if (event.pointerType === 'touch') return;
			const [px, py] = d3.pointer(event, svgElement);
			onArtifactHover(d.artifact, px, py);
		})
		.on('pointerleave', function () {
			d3.select(this).attr('font-size', '18px');
			onArtifactHover(null, 0, 0);
		})
		.transition().duration(dur(300))
		.attr('opacity', 1);

	markers.transition().duration(dur(300))
		.attr('x', (d) => d.x)
		.attr('y', (d) => d.y);

	markers.exit()
		.transition().duration(dur(200))
		.attr('opacity', 0)
		.remove();
}
