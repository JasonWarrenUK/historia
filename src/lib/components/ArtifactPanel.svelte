<script lang="ts">
	import { X } from 'lucide-svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';
</script>

{#if mapStore.selectedArtifact}
	{@const artifact = mapStore.selectedArtifact}
	<div class="p-3 border-b border-l-4" style="border-bottom-color: #c8a96e; border-left-color: #8b6914;">
		<div class="flex justify-between items-start mb-1">
			<div class="flex items-center gap-2">
				<span class="text-2xl">{artifact.image}</span>
				<div>
					<h3 class="text-sm font-serif" style="color: #8b6914;">{artifact.name}</h3>
					<p class="text-xs" style="color: #9a7550;">c. {artifact.year} CE</p>
				</div>
			</div>
			<button
				onclick={() => mapStore.clearArtifact()}
				class="transition-colors"
				style="color: #b08060;"
				aria-label="Close"
			>
				<X size={16} />
			</button>
		</div>
		<p class="text-xs mt-1" style="color: #6b4c2a;">{artifact.description}</p>
		<span class="inline-block mt-1.5 text-xs capitalize" style="color: #b08060;">{artifact.type}</span>
	</div>
{/if}
