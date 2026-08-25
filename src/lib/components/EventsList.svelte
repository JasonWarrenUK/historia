<script lang="ts">
	import { Scroll } from 'lucide-svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

{#if mapStore.showEvents}
	<div class="p-3 border-b" style="border-color: #c8a96e;">
		<h3 class="text-xs font-semibold mb-2 flex items-center gap-2" style="color: #9a7550;">
			<Scroll size={14} /> Events (±30 years)
		</h3>

		<div class="space-y-1 max-h-40 overflow-y-auto">
			{#if mapStore.relevantEvents.length > 0}
				{#each mapStore.relevantEvents as event}
					<button
						onclick={() => mapStore.jumpToEvent(event.year)}
						class="w-full text-left text-xs p-1.5 rounded transition-colors"
						style={Math.abs(event.year - mapStore.year) <= 5
							? 'background-color: rgba(139, 105, 20, 0.15); border: 1px solid rgba(139, 105, 20, 0.4);'
							: 'background-color: rgba(221, 208, 160, 0.5);'}
					>
						<span class="font-mono" style="color: #8b6914;">{event.year}</span>
						<span class="ml-1" style="color: #6b4c2a;">{event.text}</span>
					</button>
				{/each}
			{:else}
				<p class="text-xs italic" style="color: #b08060;">No recorded events nearby</p>
			{/if}
		</div>
	</div>
{/if}
