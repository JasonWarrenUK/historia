<script lang="ts">
	import { Layers, BookOpen, Scroll, Info } from 'lucide-svelte';
	import Legend from '$lib/components/Legend.svelte';
	import KingdomPanel from '$lib/components/KingdomPanel.svelte';
	import ArtifactPanel from '$lib/components/ArtifactPanel.svelte';
	import EventsList from '$lib/components/EventsList.svelte';
	import KingdomsList from '$lib/components/KingdomsList.svelte';
	import ArtifactsList from '$lib/components/ArtifactsList.svelte';
	import { mapStore } from '$lib/stores/map.svelte.js';

	type Tab = 'map' | 'kingdoms' | 'events' | 'artefacts';
	let activeTab = $state<Tab>('map');

	// Auto-switch tab when a selection is made
	$effect(() => {
		if (mapStore.selectedKingdom) activeTab = 'kingdoms';
	});

	$effect(() => {
		if (mapStore.selectedArtifact) activeTab = 'artefacts';
	});

	const hasSelection = $derived(!!(mapStore.selectedKingdom || mapStore.selectedArtifact));

	const tabs: { id: Tab; label: string; icon: typeof Layers }[] = [
		{ id: 'map', label: 'Map', icon: Layers },
		{ id: 'kingdoms', label: 'Kingdoms', icon: BookOpen },
		{ id: 'events', label: 'Events', icon: Scroll },
		{ id: 'artefacts', label: 'Artefacts', icon: Info },
	];
</script>

<aside class="w-full lg:w-80 border-l flex flex-col lg:max-h-screen" style="background-color: #ede0b0; border-color: #c8a96e;">
	<!-- Selection detail — pinned at top when something is selected -->
	{#if hasSelection}
		<div class="shrink-0">
			<KingdomPanel />
			<ArtifactPanel />
		</div>
	{:else}
		<div class="p-3 border-b shrink-0" style="border-color: #c8a96e;">
			<p class="text-xs italic" style="color: #b08060;">Click a kingdom or artefact on the map to see details.</p>
		</div>
	{/if}

	<!-- Tab bar -->
	<div class="flex border-b shrink-0" style="border-color: #c8a96e;">
		{#each tabs as tab}
			{@const Icon = tab.icon}
			<button
				onclick={() => { activeTab = tab.id; }}
				class="flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors border-b-2"
				style={activeTab === tab.id
					? 'border-color: #8b6914; color: #7a5a10;'
					: 'border-color: transparent; color: #b08060;'}
				aria-label={tab.label}
			>
				<Icon size={14} />
				<span>{tab.label}</span>
			</button>
		{/each}
	</div>

	<!-- Tab content -->
	<div class="flex-1 overflow-y-auto">
		{#if activeTab === 'map'}
			<Legend />
		{:else if activeTab === 'kingdoms'}
			<KingdomsList />
		{:else if activeTab === 'events'}
			<EventsList />
		{:else if activeTab === 'artefacts'}
			<ArtifactsList />
		{/if}
	</div>
</aside>
