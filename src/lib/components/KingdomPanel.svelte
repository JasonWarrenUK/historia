<script lang="ts">
	import { X, MapPin } from 'lucide-svelte';
	import { typeColors } from '$lib/data/kingdoms.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

{#if mapStore.selectedKingdom}
	{@const kingdom = mapStore.selectedKingdom}
	<div
		class="p-3 border-b"
		style="border-bottom-color: #c8a96e; border-left: 4px solid {kingdom.color};"
	>
		<div class="flex justify-between items-start mb-1">
			<h3 class="text-sm font-serif" style="color: #8b6914;">{kingdom.name}</h3>
			<button
				onclick={() => mapStore.clearKingdom()}
				class="transition-colors"
				style="color: #b08060;"
				aria-label="Close"
			>
				<X size={16} />
			</button>
		</div>

		<div
			class="inline-block px-2 py-0.5 rounded text-xs mb-2"
			style="background-color: {kingdom.color}; color: #f8f0d8;"
		>
			{typeColors[kingdom.type].label}
		</div>

		<p class="text-xs flex items-start gap-1" style="color: #6b4c2a;">
			<MapPin size={12} class="shrink-0 mt-0.5" />
			{kingdom.territory}
		</p>
	</div>
{/if}
