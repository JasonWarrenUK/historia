<script lang="ts">
	import { fade } from 'svelte/transition';
	import MapCanvas from '$lib/components/MapCanvas.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

<svelte:head>
	<title>Historia — Britain 300–1066 CE</title>
</svelte:head>

<div class="min-h-screen bg-stone-900 text-stone-100 flex flex-col lg:flex-row">
	<!-- Map panel -->
	<div class="flex-1 flex flex-col min-h-0 lg:min-h-screen">
		<!-- Header -->
		<header class="bg-stone-800 border-b border-stone-700 p-3 shrink-0">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-xl font-serif font-bold text-amber-400">Historia</h1>
					<p class="text-stone-400 text-xs">Britain 300–1066 CE · From Roman Province to Norman Conquest</p>
				</div>
				<div class="text-right">
					<div class="text-2xl font-serif font-bold text-amber-300">{mapStore.displayYear} CE</div>
					<div class="text-xs text-stone-400">{mapStore.currentPeriod.name}</div>
				</div>
			</div>
		</header>

		<!-- Period description — fades when period changes -->
		<div class="bg-stone-800/50 border-b border-stone-700 px-3 py-2 shrink-0 overflow-hidden">
			{#key mapStore.nearestPeriodYear}
				<p class="text-xs text-stone-300 leading-relaxed" transition:fade={{ duration: 250 }}>
					{mapStore.currentPeriod.description}
				</p>
			{/key}
		</div>

		<!-- SVG map -->
		<MapCanvas />

		<!-- Timeline controls -->
		<Timeline />
	</div>

	<!-- Sidebar -->
	<Sidebar />
</div>
