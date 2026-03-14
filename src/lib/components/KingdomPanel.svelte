<script lang="ts">
	import { X, MapPin } from 'lucide-svelte';
	import { typeColors } from '$lib/data/kingdoms.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

{#if mapStore.selectedKingdom}
	{@const kingdom = mapStore.selectedKingdom}
	<div
		class="p-3 border-b border-stone-700"
		style="border-left: 4px solid {kingdom.color}"
	>
		<div class="flex justify-between items-start mb-1">
			<h3 class="text-sm font-serif text-amber-300">{kingdom.name}</h3>
			<button
				onclick={() => mapStore.clearKingdom()}
				class="text-stone-500 hover:text-stone-300 transition-colors"
				aria-label="Close"
			>
				<X size={16} />
			</button>
		</div>

		<div
			class="inline-block px-2 py-0.5 rounded text-xs mb-2 text-white"
			style="background-color: {kingdom.color}"
		>
			{typeColors[kingdom.type].label}
		</div>

		<p class="text-xs text-stone-300 flex items-start gap-1">
			<MapPin size={12} class="shrink-0 mt-0.5" />
			{kingdom.territory}
		</p>
	</div>
{/if}
