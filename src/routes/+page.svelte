<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Keyboard } from 'lucide-svelte';
	import MapCanvas from '$lib/components/MapCanvas.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';
	import { handleGlobalKeydown, shortcutList } from '$lib/shortcuts.js';

	let showShortcuts = $state(false);

	function onWindowKeydown(event: KeyboardEvent) {
		// Let Escape close the help popover before it clears the map selection.
		if (event.key === 'Escape' && showShortcuts) {
			showShortcuts = false;
			return;
		}
		handleGlobalKeydown(event);
	}

	const description =
		'Interactive historical map of Britain 300–1066 CE — kingdoms, events and artefacts from Roman province to Norman conquest.';
</script>

<svelte:head>
	<title>Historia — Britain 300–1066 CE</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="Historia — Britain 300–1066 CE" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
</svelte:head>

<svelte:window onkeydown={onWindowKeydown} />

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
				<div class="flex items-center gap-3">
					<div class="text-right">
						<div class="text-2xl font-serif font-bold text-amber-300">{mapStore.displayYear} CE</div>
						<div class="text-xs text-stone-400">{mapStore.currentPeriod.name}</div>
					</div>
					<div class="relative">
						<button
							onclick={() => (showShortcuts = !showShortcuts)}
							class="p-2 rounded-lg bg-stone-700 hover:bg-stone-600 active:scale-95 text-stone-300 transition"
							aria-label="Keyboard shortcuts"
							aria-expanded={showShortcuts}
						>
							<Keyboard size={18} />
						</button>
						{#if showShortcuts}
							<div
								class="absolute right-0 top-full mt-2 w-64 bg-stone-800 border border-stone-700 rounded-lg shadow-2xl p-3 z-30"
								transition:fade={{ duration: 120 }}
							>
								<h2 class="text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wide">Keyboard shortcuts</h2>
								<ul class="space-y-1.5">
									{#each shortcutList as shortcut}
										<li class="flex items-center justify-between gap-3 text-xs">
											<kbd class="px-1.5 py-0.5 bg-stone-900 border border-stone-600 rounded font-mono text-amber-300 shrink-0">{shortcut.keys}</kbd>
											<span class="text-stone-300 text-right">{shortcut.description}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
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

<!-- Screen-reader announcement: fires only when the historical period changes -->
<div class="sr-only" aria-live="polite">
	{mapStore.currentPeriod.name}, from {mapStore.nearestPeriodYear} CE
</div>
