<script lang="ts">
	import { X } from 'lucide-svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

{#if mapStore.selectedArtifact}
	{@const artifact = mapStore.selectedArtifact}
	<div class="p-3 border-b border-stone-700 border-l-4 border-l-amber-600">
		<div class="flex justify-between items-start mb-1">
			<div class="flex items-center gap-2">
				<span class="text-2xl">{artifact.image}</span>
				<div>
					<h3 class="text-sm font-serif text-amber-300">{artifact.name}</h3>
					<p class="text-xs text-stone-400">c. {artifact.year} CE</p>
				</div>
			</div>
			<button
				onclick={() => mapStore.clearArtifact()}
				class="text-stone-500 hover:text-stone-300 transition-colors"
				aria-label="Close"
			>
				<X size={16} />
			</button>
		</div>
		<p class="text-xs text-stone-300 mt-1">{artifact.description}</p>
		<span class="inline-block mt-1.5 text-xs text-stone-500 capitalize">{artifact.type}</span>
	</div>
{/if}
