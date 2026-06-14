<script lang="ts">
	import { Play, Pause } from 'lucide-svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';

	const range = mapStore.maxYear - mapStore.minYear;

	function periodPosition(y: number): number {
		return ((y - mapStore.minYear) / range) * 100;
	}
</script>

<div class="bg-stone-800 border-t border-stone-700 p-3 shrink-0">
	<div class="flex items-center gap-3 mb-3">
		<!-- Play/pause with event badge -->
		<div class="relative shrink-0">
			<button
				onclick={() => mapStore.togglePlayback()}
				class="p-3 bg-amber-600 hover:bg-amber-500 active:scale-95 rounded-full transition"
				aria-label={mapStore.playing ? 'Pause' : 'Play'}
				aria-pressed={mapStore.playing}
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
					class="absolute -top-2 -right-2 bg-amber-500 text-stone-900 text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center leading-none hover:bg-amber-400 active:scale-95 transition"
					aria-label="Jump to {mapStore.relevantEvents.length} event{mapStore.relevantEvents.length === 1 ? '' : 's'} nearby"
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
						style="left: {periodPosition(y)}%; background-color: rgba(251,191,36,0.35);"
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
				aria-valuetext="Year {mapStore.year} CE"
			/>
		</div>

		<span class="text-amber-300 font-mono text-sm shrink-0 w-16 text-right">{mapStore.displayYear} CE</span>
	</div>

	<!-- Period jump buttons -->
	<div class="flex flex-wrap gap-1">
		{#each mapStore.periodYears as y}
			<button
				onclick={() => mapStore.setYear(y, { animate: true })}
				aria-pressed={mapStore.nearestPeriodYear === y}
				class={`px-2.5 py-1.5 min-w-9 text-xs rounded transition active:scale-95 ${
					mapStore.nearestPeriodYear === y
						? 'bg-amber-600 text-white'
						: 'bg-stone-700 hover:bg-stone-600 text-stone-300'
				}`}
			>
				{y}
			</button>
		{/each}
	</div>
</div>
