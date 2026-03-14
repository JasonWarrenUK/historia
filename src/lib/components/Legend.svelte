<script lang="ts">
	import { Layers } from 'lucide-svelte';
	import { typeColors } from '$lib/data/kingdoms.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

<div class="p-3 border-b border-stone-700">
	<h3 class="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
		<Layers size={14} /> Kingdom Types
	</h3>

	<div class="grid grid-cols-2 gap-1 mb-3">
		{#each Object.entries(typeColors) as [type, { bg, label }]}
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded-full shrink-0" style="background-color: {bg}"></div>
				<span class="text-xs text-stone-300">{label}</span>
			</div>
		{/each}
	</div>

	<div class="flex gap-4">
		<label class="flex items-center gap-1.5 text-xs text-stone-400 cursor-pointer">
			<input
				type="checkbox"
				checked={mapStore.showArtifacts}
				onchange={(e) => { mapStore.showArtifacts = (e.target as HTMLInputElement).checked; }}
				class="accent-amber-500"
			/>
			Artifacts
		</label>
		<label class="flex items-center gap-1.5 text-xs text-stone-400 cursor-pointer">
			<input
				type="checkbox"
				checked={mapStore.showEvents}
				onchange={(e) => { mapStore.showEvents = (e.target as HTMLInputElement).checked; }}
				class="accent-amber-500"
			/>
			Events
		</label>
	</div>
</div>
