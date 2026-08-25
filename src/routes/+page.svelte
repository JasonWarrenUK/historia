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
				<div class="flex items-center gap-3">
					<div class="text-right">
						<div class="text-2xl font-serif font-bold" style="color: #8b6914;">{mapStore.displayYear} CE</div>
						<div class="text-xs" style="color: #9a7550;">{mapStore.currentPeriod.name}</div>
					</div>
					<div class="relative">
						<button
							onclick={() => (showShortcuts = !showShortcuts)}
							class="p-2 rounded-lg transition-colors"
							style="background-color: #ddd0a0; color: #6b4c2a;"
							aria-label="Keyboard shortcuts"
							aria-expanded={showShortcuts}
						>
							<Keyboard size={18} />
						</button>
						{#if showShortcuts}
							<div
								class="absolute right-0 top-full mt-2 w-64 rounded-lg shadow-2xl p-3 z-30 border"
								style="background-color: #ede0b0; border-color: #c8a96e;"
								transition:fade={{ duration: 120 }}
							>
								<h2 class="text-xs font-semibold mb-2 uppercase tracking-wide" style="color: #9a7550;">Keyboard shortcuts</h2>
								<ul class="space-y-1.5">
									{#each shortcutList as shortcut}
										<li class="flex items-center justify-between gap-3 text-xs">
											<kbd class="px-1.5 py-0.5 rounded font-mono shrink-0" style="background-color: #f4e8c1; border: 1px solid #c8a96e; color: #8b6914;">{shortcut.keys}</kbd>
											<span class="text-right" style="color: #6b4c2a;">{shortcut.description}</span>
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

<!-- Screen-reader announcement: fires only when the historical period changes -->
<div class="sr-only" aria-live="polite">
	{mapStore.currentPeriod.name}, from {mapStore.nearestPeriodYear} CE
</div>
