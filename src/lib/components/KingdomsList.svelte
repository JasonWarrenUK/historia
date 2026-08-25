<script lang="ts">
	import { BookOpen } from 'lucide-svelte';
	import { typeColors } from '$lib/data/kingdoms.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

<div class="p-3 border-b" style="border-color: #c8a96e;">
	<h3 class="text-xs font-semibold mb-2 flex items-center gap-2" style="color: #9a7550;">
		<BookOpen size={14} /> Kingdoms ({mapStore.nearestPeriodYear} CE)
	</h3>

	<div class="space-y-0.5 max-h-44 overflow-y-auto">
		{#each mapStore.currentPeriod.kingdoms as kingdom}
			<button
				onclick={() => { mapStore.selectedKingdom = kingdom; }}
				class="w-full text-left p-1.5 rounded text-xs transition-colors flex items-center gap-2"
				style={mapStore.selectedKingdom?.id === kingdom.id
					? 'background-color: #cfc090;'
					: 'background-color: transparent;'}
			>
				<div class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: {kingdom.color}"></div>
				<span class="flex-1 text-left" style="color: #2c1810;">{kingdom.name}</span>
				<span class="text-xs" style="color: #b08060;">{typeColors[kingdom.type].label}</span>
			</button>
		{/each}
	</div>
</div>
