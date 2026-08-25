<script lang="ts">
	import { Info } from 'lucide-svelte';
	import { artifacts } from '$lib/data/artifacts.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

<div class="p-3">
	<h3 class="text-xs font-semibold mb-2 flex items-center gap-2" style="color: #9a7550;">
		<Info size={14} /> Artefacts & Folklore
	</h3>

	<div class="space-y-0.5 max-h-44 overflow-y-auto">
		{#each artifacts as artifact}
			{@const isVisible = Math.abs(artifact.year - mapStore.year) <= 150}
			<button
				onclick={() => mapStore.selectArtifact(artifact)}
				class="w-full text-left p-1.5 rounded text-xs transition-colors flex items-center gap-2 {isVisible ? '' : 'opacity-50'}"
				style={mapStore.selectedArtifact?.id === artifact.id
					? 'background-color: #cfc090;'
					: 'background-color: transparent;'}
			>
				<span class="text-base">{artifact.image}</span>
				<div class="flex-1 min-w-0">
					<div class="truncate" style="color: #2c1810;">{artifact.name}</div>
					<div style="color: #b08060;">c. {artifact.year}</div>
				</div>
				<span class="capitalize text-xs" style="color: #c8a96e;">{artifact.type}</span>
			</button>
		{/each}
	</div>
</div>
