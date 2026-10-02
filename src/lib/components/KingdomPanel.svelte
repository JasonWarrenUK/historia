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

		{#if kingdom.founded !== undefined || kingdom.ended !== undefined}
			<p class="text-xs mt-2 text-ink-light">
				<span class="font-serif text-gold">Dates:</span>
				{kingdom.founded ?? '?'} to {kingdom.ended ?? '?'} CE
			</p>
		{/if}

		{#if kingdom.capital}
			<p class="text-xs mt-1 text-ink-light">
				<span class="font-serif text-gold">Royal centre:</span>
				{kingdom.capital.name}
			</p>
		{/if}

		{#if kingdom.description}
			<p class="text-xs mt-2 leading-relaxed text-ink-light">{kingdom.description}</p>
		{/if}

		{#if kingdom.rulers?.length}
			<details class="text-xs mt-2 text-ink-light">
				<summary class="font-serif cursor-pointer text-gold">
					Rulers ({kingdom.rulers.length})
				</summary>
				<ul class="mt-1 space-y-0.5">
					{#each kingdom.rulers as ruler (ruler.name)}
						<li>{ruler.name} <span class="text-ink-muted">({ruler.reign})</span></li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if kingdom.sources?.length}
			<details class="text-xs mt-2 text-ink-light">
				<summary class="font-serif cursor-pointer text-gold">
					Sources ({kingdom.sources.length})
				</summary>
				<ul class="mt-1 space-y-1 list-disc pl-4">
					{#each kingdom.sources as source (source.citation)}
						<li>
							{#if source.url}
								<a href={source.url} target="_blank" rel="noopener noreferrer" class="underline">
									{source.citation}
								</a>
							{:else}
								{source.citation}
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		{/if}
	</div>
{/if}
