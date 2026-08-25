<script lang="ts">
	import { Play, Pause } from 'lucide-svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';

	const range = mapStore.maxYear - mapStore.minYear;

	function periodPosition(y: number): number {
		return ((y - mapStore.minYear) / range) * 100;
	}
</script>

<div class="border-t p-3 shrink-0" style="background-color: #ede0b0; border-color: #c8a96e;">
	<div class="flex items-center gap-3 mb-3">
		<!-- Play/pause with event badge -->
		<div class="relative shrink-0">
			<button
				onclick={() => mapStore.togglePlayback()}
				class="p-2 rounded-full transition-colors"
				style="background-color: #8b6914; color: #f8f0d8;"
				aria-label={mapStore.playing ? 'Pause' : 'Play'}
			>
				{#if mapStore.playing}
					<Pause size={18} />
				{:else}
					<Play size={18} />
				{/if}
			</button>
			{#if mapStore.showEvents && mapStore.relevantEvents.length > 0}
				<button
					onclick={() => mapStore.jumpToEvent(mapStore.relevantEvents[0].year)}
					class="absolute -top-1.5 -right-1.5 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none transition-colors"
					style="background-color: #a07a1e; color: #f8f0d8;"
					title="{mapStore.relevantEvents.length} event{mapStore.relevantEvents.length === 1 ? '' : 's'} nearby"
				>
					{mapStore.relevantEvents.length}
				</button>
			{/if}
		</div>

		<!-- Slider with period tick marks -->
		<div class="relative flex-1">
			<!-- Tick marks -->
			<div class="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
				{#each mapStore.periodYears as y}
					<div
						class="absolute top-0 bottom-0 w-px"
						style="left: {periodPosition(y)}%; background-color: rgba(139, 105, 20, 0.35);"
					></div>
				{/each}
			</div>

			<input
				type="range"
				min={mapStore.minYear}
				max={mapStore.maxYear}
				value={mapStore.year}
				oninput={(e) => mapStore.setYear(Number((e.target as HTMLInputElement).value))}
				class="relative w-full accent-amber-500 z-10"
				aria-label="Year slider"
			/>
		</div>

		<span class="font-mono text-sm shrink-0 w-16 text-right" style="color: #8b6914;">{mapStore.displayYear} CE</span>
	</div>

	<!-- Period jump buttons -->
	<div class="flex flex-wrap gap-1">
		{#each mapStore.periodYears as y}
			<button
				onclick={() => mapStore.setYear(y, { animate: true })}
				class="px-2 py-0.5 text-xs rounded transition-colors"
				style={mapStore.nearestPeriodYear === y
					? 'background-color: #8b6914; color: #f8f0d8;'
					: 'background-color: #ddd0a0; color: #6b4c2a;'}
			>
				{y}
			</button>
		{/each}
	</div>
</div>
