<script lang="ts">
	import { Info } from 'lucide-svelte';
	import { artifacts } from '$lib/data/artifacts.js';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

<div class="p-3">
	<h3 class="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
		<Info size={14} /> Artefacts & Folklore
	</h3>

	<div class="space-y-0.5 max-h-44 overflow-y-auto">
		{#each artifacts as artifact}
			{@const isVisible = Math.abs(artifact.year - mapStore.year) <= 150}
			<button
				onclick={() => mapStore.selectArtifact(artifact)}
				class={`w-full text-left p-1.5 rounded text-xs transition-colors flex items-center gap-2 ${
					mapStore.selectedArtifact?.id === artifact.id
						? 'bg-stone-600'
						: 'hover:bg-stone-700'
				} ${isVisible ? '' : 'opacity-50'}`}
			>
				<span class="text-base">{artifact.image}</span>
				<div class="flex-1 min-w-0">
					<div class="text-stone-200 truncate">{artifact.name}</div>
					<div class="text-stone-500">c. {artifact.year}</div>
				</div>
				<span class="text-stone-600 capitalize text-xs">{artifact.type}</span>
			</button>
		{/each}
	</div>
</div>
