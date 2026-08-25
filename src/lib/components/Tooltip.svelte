<script lang="ts">
	import { typeColors } from '$lib/data/kingdoms.js';
	import type { Kingdom, Artifact } from '$lib/data/types.js';

	interface Props {
		x: number;
		y: number;
		kingdom?: Kingdom | null;
		artifact?: Artifact | null;
		containerWidth?: number;
		containerHeight?: number;
	}

	let { x, y, kingdom = null, artifact = null, containerWidth = 0, containerHeight = 0 }: Props = $props();

	const visible = $derived(!!(kingdom || artifact));

	// Flip to the left if near the right edge
	const flipX = $derived(x > containerWidth * 0.65);
	const flipY = $derived(y > containerHeight * 0.75);
</script>

{#if visible}
	<div
		class="absolute z-10 pointer-events-none"
		style="left: {x}px; top: {y}px; transform: translate({flipX ? 'calc(-100% - 12px)' : '12px'}, {flipY ? '-100%' : '-50%'})"
	>
		<div class="rounded-lg shadow-2xl p-2.5 min-w-36 max-w-52 border" style="background-color: rgba(244, 232, 193, 0.97); color: #2c1810; border-color: #c8a96e;">
			{#if kingdom}
				<div class="flex items-center gap-1.5 mb-1">
					<div class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: {kingdom.color}"></div>
					<span class="text-sm font-serif leading-tight" style="color: #8b6914;">{kingdom.name}</span>
				</div>
				<div class="inline-block px-1.5 py-0.5 rounded text-xs mb-1.5" style="background-color: {kingdom.color}; color: #f8f0d8;">
					{typeColors[kingdom.type].label}
				</div>
				<p class="text-xs leading-snug" style="color: #9a7550;">{kingdom.territory}</p>
			{:else if artifact}
				<div class="flex items-center gap-2 mb-1">
					<span class="text-xl">{artifact.image}</span>
					<div>
						<div class="text-sm font-serif leading-tight" style="color: #8b6914;">{artifact.name}</div>
						<div class="text-xs" style="color: #b08060;">c. {artifact.year} CE</div>
					</div>
				</div>
				<p class="text-xs leading-snug" style="color: #9a7550;">{artifact.description}</p>
			{/if}
		</div>
	</div>
{/if}
