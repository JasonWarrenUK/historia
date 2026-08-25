<script lang="ts">
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { createMap, updateKingdoms, updateArtifacts, highlightKingdom } from '$lib/map/map-renderer.js';
	import { loadTopology } from '$lib/data/geo.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import MapDecorations from '$lib/components/MapDecorations.svelte';
	import type { Kingdom, Artifact } from '$lib/data/types.js';
	import type { Map as MapLibreMap } from 'maplibre-gl';

	let containerEl = $state<HTMLDivElement | null>(null);
	let map: MapLibreMap | null = null;
	let mapReady = $state(false);
	let topoError = $state<string | null>(null);

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

	// Kingdoms/period effect
	$effect(() => {
		if (!map || !mapReady) return;
		const ks = mapStore.currentPeriod.kingdoms;
		const selectedId = mapStore.selectedKingdom?.id ?? null;
		updateKingdoms(map, ks, selectedId);
	});

	// Selection highlight effect (selection changes without period change)
	$effect(() => {
		if (!map || !mapReady) return;
		mapStore.currentPeriod; // track period too so highlight updates after crossfade
		const selectedId = mapStore.selectedKingdom?.id ?? null;
		highlightKingdom(map, selectedId);
	});

	// Artifacts effect
	$effect(() => {
		if (!map || !mapReady) return;
		updateArtifacts(map, mapStore.visibleArtifacts, mapStore.showArtifacts);
	});

	onMount(() => {
		if (!containerEl) return;

		loadTopology().then((topo) => {
			if (!containerEl) return;

			map = createMap(containerEl, topo, {
				onKingdomClick: (k) => { mapStore.selectedKingdom = k; },
				onKingdomHover: handleKingdomHover,
				onArtifactClick: (a) => mapStore.selectArtifact(a),
				onArtifactHover: handleArtifactHover
			});

			map.on('load', () => {
				mapReady = true;
				updateKingdoms(map!, mapStore.currentPeriod.kingdoms, mapStore.selectedKingdom?.id ?? null);
				updateArtifacts(map!, mapStore.visibleArtifacts, mapStore.showArtifacts);
			});
		}).catch((err) => {
			topoError = err.message ?? 'Failed to load map data';
		});

		return () => {
			map?.remove();
			map = null;
		};
	});
</script>

<div bind:this={containerEl} class="relative flex-1 min-h-0">
	{#if topoError}
		<div class="absolute inset-0 flex items-center justify-center bg-stone-100 text-stone-600">
			<p>Map data failed to load: {topoError}</p>
		</div>
	{/if}
	<MapDecorations
		periodName={mapStore.currentPeriod.name}
		year={mapStore.nearestPeriodYear}
	/>
	<Tooltip
		x={tooltipX}
		y={tooltipY}
		kingdom={tooltipKingdom}
		artifact={tooltipArtifact}
		containerWidth={containerEl?.clientWidth ?? 500}
		containerHeight={containerEl?.clientHeight ?? 700}
	/>
</div>
