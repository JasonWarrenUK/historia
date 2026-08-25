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

<div class="min-h-screen flex flex-col lg:flex-row" style="background-color: #f4e8c1; color: #2c1810;">
	<!-- Map panel -->
	<div class="flex-1 flex flex-col min-h-0 lg:min-h-screen">
		<!-- Header -->
		<header class="border-b p-3 shrink-0" style="background-color: #ede0b0; border-color: #c8a96e;">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-xl font-serif font-bold" style="color: #7a5a10;">Historia</h1>
					<p class="text-xs" style="color: #9a7550;">Britain 300–1066 CE · From Roman Province to Norman Conquest</p>
				</div>
				<div class="text-right">
					<div class="text-2xl font-serif font-bold" style="color: #8b6914;">{mapStore.displayYear} CE</div>
					<div class="text-xs" style="color: #9a7550;">{mapStore.currentPeriod.name}</div>
				</div>
			</div>
		</header>

		<!-- Period description — fades when period changes -->
		<div class="border-b px-3 py-2 shrink-0 overflow-hidden" style="background-color: rgba(237, 224, 176, 0.5); border-color: #c8a96e;">
			{#key mapStore.nearestPeriodYear}
				<p class="text-xs leading-relaxed" style="color: #6b4c2a;" transition:fade={{ duration: 250 }}>
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
