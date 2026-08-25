<script lang="ts">
	import { Layers } from 'lucide-svelte';
	import { typeColors } from '$lib/data/kingdoms.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

<div class="p-3 border-b" style="border-color: #c8a96e;">
	<h3 class="text-xs font-semibold mb-2 flex items-center gap-2" style="color: #9a7550;">
		<Layers size={14} /> Kingdom Types
	</h3>

	<div class="grid grid-cols-2 gap-1 mb-3">
		{#each Object.entries(typeColors) as [type, { bg, label }]}
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded-full shrink-0" style="background-color: {bg}"></div>
				<span class="text-xs" style="color: #6b4c2a;">{label}</span>
			</div>
		{/each}
	</div>

	<div class="flex gap-4">
		<label class="flex items-center gap-1.5 text-xs cursor-pointer" style="color: #9a7550;">
			<input
				type="checkbox"
				checked={mapStore.showArtifacts}
				onchange={(e) => { mapStore.showArtifacts = (e.target as HTMLInputElement).checked; }}
				class="accent-amber-500"
			/>
			Artefacts
		</label>
		<label class="flex items-center gap-1.5 text-xs cursor-pointer" style="color: #9a7550;">
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
