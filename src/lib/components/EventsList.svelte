<script lang="ts">
	import { Scroll } from 'lucide-svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

{#if mapStore.showEvents}
	<div class="p-3 border-b border-stone-700">
		<h3 class="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
			<Scroll size={14} /> Events (±30 years)
		</h3>

		<div class="space-y-1 max-h-40 overflow-y-auto">
			{#if mapStore.relevantEvents.length > 0}
				{#each mapStore.relevantEvents as event}
					<button
						onclick={() => mapStore.jumpToEvent(event.year)}
						class={`w-full text-left text-xs p-1.5 rounded transition-colors ${
							Math.abs(event.year - mapStore.year) <= 5
								? 'bg-amber-600/30 border border-amber-500/50'
								: 'bg-stone-700/50 hover:bg-stone-700'
						}`}
					>
						<span class="text-amber-400 font-mono">{event.year}</span>
						<span class="text-stone-300 ml-1">{event.text}</span>
					</button>
				{/each}
			{:else}
				<p class="text-stone-500 text-xs italic">No recorded events nearby</p>
			{/if}
		</div>
	</div>
{/if}
