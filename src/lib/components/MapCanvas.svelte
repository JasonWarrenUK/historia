<script lang="ts">
	import { onMount } from 'svelte';
	import { initMap, resizeMap, updateKingdoms, updateArtifacts } from '$lib/map/renderer.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { Kingdom, Artifact } from '$lib/data/types.js';

	let svgEl = $state<SVGSVGElement | null>(null);
	let containerEl = $state<HTMLDivElement | null>(null);
	let dimensions = $state({ width: 500, height: 700 });
	let mapInitialised = $state(false);

	// Tooltip state
	let tooltipX = $state(0);
	let tooltipY = $state(0);
	let tooltipKingdom = $state<Kingdom | null>(null);
	let tooltipArtifact = $state<Artifact | null>(null);

	function handleKingdomHover(kingdom: Kingdom | null, x: number, y: number) {
		tooltipKingdom = kingdom;
		tooltipArtifact = null;
		tooltipX = x;
		tooltipY = y;
	}

	function handleArtifactHover(artifact: Artifact | null, x: number, y: number) {
		tooltipArtifact = artifact;
		tooltipKingdom = null;
		tooltipX = x;
		tooltipY = y;
	}

	// Called by zoom events so labels can recompute visibility thresholds
	function onZoom() {
		if (!svgEl || !mapInitialised) return;
		updateKingdoms(
			svgEl,
			mapStore.currentPeriod.kingdoms,
			mapStore.selectedKingdom?.id ?? null,
			(k) => { mapStore.selectedKingdom = k; },
			handleKingdomHover
		);
	}

	// Re-run when kingdoms or selection changes
	$effect(() => {
		if (!svgEl || !mapInitialised) return;
		mapStore.currentPeriod;
		mapStore.selectedKingdom;
		updateKingdoms(
			svgEl,
			mapStore.currentPeriod.kingdoms,
			mapStore.selectedKingdom?.id ?? null,
			(k) => { mapStore.selectedKingdom = k; },
			handleKingdomHover
		);
	});

	// Re-run when artefacts or visibility changes
	$effect(() => {
		if (!svgEl || !mapInitialised) return;
		mapStore.visibleArtifacts;
		mapStore.showArtifacts;
		updateArtifacts(
			svgEl,
			mapStore.visibleArtifacts,
			mapStore.showArtifacts,
			(a) => mapStore.selectArtifact(a),
			handleArtifactHover
		);
	});

	// Re-run on resize (after map is initialised)
	$effect(() => {
		if (!svgEl || !mapInitialised) return;
		const { width, height } = dimensions;
		resizeMap(svgEl, width, height);
		// After resize, re-draw data layers
		updateKingdoms(
			svgEl,
			mapStore.currentPeriod.kingdoms,
			mapStore.selectedKingdom?.id ?? null,
			(k) => { mapStore.selectedKingdom = k; },
			handleKingdomHover
		);
		updateArtifacts(
			svgEl,
			mapStore.visibleArtifacts,
			mapStore.showArtifacts,
			(a) => mapStore.selectArtifact(a),
			handleArtifactHover
		);
	});

	onMount(() => {
		if (!containerEl) return;

		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (!entry) return;
			const { width } = entry.contentRect;
			const w = Math.max(300, width);
			const h = Math.max(400, width * 1.4);

			if (!mapInitialised && svgEl) {
				dimensions = { width: w, height: h };
				initMap(svgEl, w, h, onZoom);
				mapInitialised = true;
				// Draw initial data
				updateKingdoms(
					svgEl,
					mapStore.currentPeriod.kingdoms,
					mapStore.selectedKingdom?.id ?? null,
					(k) => { mapStore.selectedKingdom = k; },
					handleKingdomHover
				);
				updateArtifacts(
					svgEl,
					mapStore.visibleArtifacts,
					mapStore.showArtifacts,
					(a) => mapStore.selectArtifact(a),
					handleArtifactHover
				);
			} else {
				dimensions = { width: w, height: h };
			}
		});

		observer.observe(containerEl);
		return () => observer.disconnect();
	});
</script>

<div bind:this={containerEl} class="relative flex-1 flex items-center justify-center p-2 bg-stone-900 min-h-0">
	<svg
		bind:this={svgEl}
		width={dimensions.width}
		height={dimensions.height}
		class="rounded-lg shadow-2xl"
	></svg>

	<Tooltip
		x={tooltipX}
		y={tooltipY}
		kingdom={tooltipKingdom}
		artifact={tooltipArtifact}
		containerWidth={dimensions.width}
		containerHeight={dimensions.height}
	/>
</div>
