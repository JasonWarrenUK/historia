import * as d3 from 'd3';
import { britishIslesGeoJSON } from '$lib/data/geo.js';
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
let currentProjection: d3.GeoProjection | null = null;
let currentWidth = 0;
let currentHeight = 0;

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
	onZoom: () => void
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

	svg.call(zoom);

	// Double-click to reset zoom
	svg.on('dblclick.zoom', () => {
		svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
	});
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

	// Reset zoom root transform
	svg.select('#zoom-root').attr('transform', null);

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

	// Project kingdom data
	interface KingdomDatum {
		kingdom: Kingdom;
		x: number;
		y: number;
		rx: number;
		ry: number;
	}

	const projected: KingdomDatum[] = kingdoms.flatMap((k) => {
		const coords = currentProjection!([k.center[0], k.center[1]]);
		if (!coords) return [];
		const stretch = k.stretch ?? 1;
		return [{ kingdom: k, x: coords[0], y: coords[1], rx: k.radius * stretch, ry: k.radius }];
	});

	// --- Territory ellipses ---
	const kingdomLayer = svg.select<SVGGElement>('#layer-kingdoms');
	const ellipses = kingdomLayer.selectAll<SVGEllipseElement, KingdomDatum>('ellipse.territory')
		.data(projected, (d) => d.kingdom.id);

	// Enter
	ellipses.enter()
		.append('ellipse')
		.attr('class', 'territory')
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('rx', (d) => d.rx)
		.attr('ry', (d) => d.ry)
		.attr('fill', (d) => `url(#grad-${d.kingdom.id})`)
		.attr('stroke', (d) => d.kingdom.color)
		.attr('stroke-width', 1.5)
		.attr('stroke-opacity', 0.7)
		.attr('fill-opacity', 0)
		.style('cursor', 'pointer')
		.on('click', (_event, d) => onKingdomClick(d.kingdom))
		.on('mouseenter', function (_event, d) {
			d3.select(this).attr('stroke-width', 2.5).attr('stroke-opacity', 1);
			const [px, py] = d3.pointer(_event, svgElement);
			onKingdomHover(d.kingdom, px, py);
		})
		.on('mousemove', function (_event) {
			const [px, py] = d3.pointer(_event, svgElement);
			// Update tooltip position — we just re-emit hover with same kingdom
			const datum = d3.select<SVGEllipseElement, KingdomDatum>(this).datum();
			onKingdomHover(datum.kingdom, px, py);
		})
		.on('mouseleave', function () {
			d3.select(this).attr('stroke-width', 1.5).attr('stroke-opacity', 0.7);
			onKingdomHover(null, 0, 0);
		})
		.transition().duration(400).ease(d3.easeCubicOut)
		.attr('fill-opacity', 1);

	// Update
	ellipses.transition().duration(400).ease(d3.easeCubicOut)
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('rx', (d) => d.rx)
		.attr('ry', (d) => d.ry);

	// Exit
	ellipses.exit()
		.transition().duration(200)
		.attr('fill-opacity', 0)
		.attr('stroke-opacity', 0)
		.remove();

	// Selection highlight ring
	const rings = kingdomLayer.selectAll<SVGEllipseElement, KingdomDatum>('ellipse.selection-ring')
		.data(projected.filter((d) => d.kingdom.id === selectedKingdomId), (d) => d.kingdom.id);

	rings.enter()
		.append('ellipse')
		.attr('class', 'selection-ring')
		.attr('pointer-events', 'none')
		.attr('fill', 'none')
		.attr('stroke', 'white')
		.attr('stroke-width', 2)
		.attr('stroke-dasharray', '4 3')
		.attr('stroke-opacity', 0)
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('rx', (d) => d.rx + 4)
		.attr('ry', (d) => d.ry + 4)
		.transition().duration(200)
		.attr('stroke-opacity', 0.8);

	rings.transition().duration(400)
		.attr('cx', (d) => d.x)
		.attr('cy', (d) => d.y)
		.attr('rx', (d) => d.rx + 4)
		.attr('ry', (d) => d.ry + 4);

	rings.exit()
		.transition().duration(150)
		.attr('stroke-opacity', 0)
		.remove();

	// --- Labels ---
	const labelLayer = svg.select<SVGGElement>('#layer-labels');
	const labels = labelLayer.selectAll<SVGGElement, KingdomDatum>('g.label')
		.data(projected.filter((d) => showLabelsAll || d.kingdom.radius >= 10), (d) => d.kingdom.id);

	const labelsEnter = labels.enter()
		.append('g')
		.attr('class', 'label')
		.attr('pointer-events', 'none')
		.attr('opacity', 0);

	labelsEnter.append('rect').attr('class', 'label-bg').attr('rx', 3);
	labelsEnter.append('text').attr('class', 'label-text');

	const allLabels = labels.merge(labelsEnter);

	// Measure and position text
	allLabels.each(function (d) {
		const g = d3.select(this);
		const labelY = d.y + d.ry + 6;

		const textEl = g.select<SVGTextElement>('text.label-text')
			.attr('x', d.x)
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
			.attr('x', d.x - textWidth / 2 - 4)
			.attr('y', labelY)
			.attr('width', textWidth + 8)
			.attr('height', 14)
			.attr('fill', d.kingdom.color);
	});

	allLabels.transition().duration(400)
		.attr('opacity', 1);

	labels.exit()
		.transition().duration(200)
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
		.on('click', (_event, d) => onArtifactClick(d.artifact))
		.on('mouseenter', function (_event, d) {
			d3.select(this).attr('font-size', '22px');
			const [px, py] = d3.pointer(_event, svgElement);
			onArtifactHover(d.artifact, px, py);
		})
		.on('mouseleave', function () {
			d3.select(this).attr('font-size', '18px');
			onArtifactHover(null, 0, 0);
		})
		.transition().duration(300)
		.attr('opacity', 1);

	markers.transition().duration(300)
		.attr('x', (d) => d.x)
		.attr('y', (d) => d.y);

	markers.exit()
		.transition().duration(200)
		.attr('opacity', 0)
		.remove();
}
