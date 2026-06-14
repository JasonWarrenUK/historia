import { mapStore } from '$lib/stores/map.svelte.js';

export interface Shortcut {
	keys: string;
	description: string;
}

export const shortcutList: Shortcut[] = [
	{ keys: 'Space', description: 'Play / pause the timeline' },
	{ keys: '← / →', description: 'Step year by 5' },
	{ keys: 'Shift + ← / →', description: 'Step year by 25' },
	{ keys: 'Home / End', description: 'Jump to 300 / 1066 CE' },
	{ keys: 'Esc', description: 'Clear selection' }
];

const STEP = 5;
const STEP_LARGE = 25;

/**
 * Global keydown handler for timeline navigation. Ignores keystrokes that
 * originate from form controls so native behaviour (typing, slider arrows)
 * is preserved.
 */
export function handleGlobalKeydown(event: KeyboardEvent): void {
	const target = event.target as HTMLElement | null;
	if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;

	switch (event.key) {
		case ' ':
		case 'Spacebar': {
			// Avoid double-toggling when a button/tab already handles Space natively.
			if (target?.closest('button, a, [role="tab"]')) return;
			event.preventDefault();
			mapStore.togglePlayback();
			break;
		}
		case 'ArrowLeft':
			event.preventDefault();
			mapStore.setYear(mapStore.year - (event.shiftKey ? STEP_LARGE : STEP));
			break;
		case 'ArrowRight':
			event.preventDefault();
			mapStore.setYear(mapStore.year + (event.shiftKey ? STEP_LARGE : STEP));
			break;
		case 'Home':
			event.preventDefault();
			mapStore.setYear(mapStore.minYear, { animate: true });
			break;
		case 'End':
			event.preventDefault();
			mapStore.setYear(mapStore.maxYear, { animate: true });
			break;
		case 'Escape':
			mapStore.clearKingdom();
			mapStore.clearArtifact();
			break;
	}
}
