<script lang="ts">
	import { BookOpen } from 'lucide-svelte';
	import { typeColors } from '$lib/data/kingdoms.js';
	import { mapStore } from '$lib/stores/map.svelte.js';

	let query = $state('');
	const filtered = $derived(
		mapStore.currentPeriod.kingdoms.filter((k) =>
			k.name.toLowerCase().includes(query.trim().toLowerCase())
		)
	);
</script>

<div class="p-3 border-b border-stone-700">
	<h3 class="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
		<BookOpen size={14} /> Kingdoms ({mapStore.nearestPeriodYear} CE)
	</h3>

	<input
		type="search"
		bind:value={query}
		placeholder="Filter kingdoms…"
		aria-label="Filter kingdoms"
		class="w-full mb-2 px-2 py-1.5 text-xs bg-stone-700 rounded border border-stone-600 text-stone-200 placeholder:text-stone-500"
	/>

	<div class="space-y-0.5 max-h-44 overflow-y-auto">
		{#each filtered as kingdom}
			<button
				onclick={() => { mapStore.selectedKingdom = kingdom; }}
				class={`w-full text-left p-1.5 rounded text-xs transition-colors flex items-center gap-2 ${
					mapStore.selectedKingdom?.id === kingdom.id
						? 'bg-stone-600'
						: 'hover:bg-stone-700'
				}`}
			>
				<div class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: {kingdom.color}"></div>
				<span class="text-stone-200 flex-1 text-left">{kingdom.name}</span>
				<span class="text-stone-500 text-xs">{typeColors[kingdom.type].label}</span>
			</button>
		{/each}
		{#if filtered.length === 0}
			<p class="text-stone-500 text-xs italic p-1.5">No kingdoms match "{query}"</p>
		{/if}
	</div>
</div>
