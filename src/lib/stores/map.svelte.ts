import type { Kingdom, Artifact } from '$lib/data/types.js';
import { historicalPeriods, findNearestPeriod, periodYears } from '$lib/data/kingdoms.js';
import { artifacts } from '$lib/data/artifacts.js';
import { keyEvents } from '$lib/data/events.js';

const MIN_YEAR = 300;
const MAX_YEAR = 1066;
const PLAYBACK_STEP = 5;
const PLAYBACK_INTERVAL_MS = 200;
const EVENT_WINDOW = 30;
const ARTIFACT_WINDOW = 150;
const YEAR_ANIM_DURATION_MS = 300;

function createMapStore() {
	let year = $state(600);
	let displayYear = $state(600);
	let playing = $state(false);
	let selectedKingdom = $state<Kingdom | null>(null);
	let selectedArtifact = $state<Artifact | null>(null);
	let showArtifacts = $state(true);
	let showEvents = $state(true);
	let playbackTimer: ReturnType<typeof setInterval> | null = null;
	let yearAnimFrame: number | null = null;

	const nearestPeriodYear = $derived(findNearestPeriod(year));
	const currentPeriod = $derived(historicalPeriods[nearestPeriodYear]);
	const relevantEvents = $derived(keyEvents.filter((e) => e.year >= year - EVENT_WINDOW && e.year <= year + EVENT_WINDOW));
	const visibleArtifacts = $derived(artifacts.filter((a) => Math.abs(a.year - year) <= ARTIFACT_WINDOW));

	function animateDisplayYear(from: number, to: number) {
		if (yearAnimFrame !== null) cancelAnimationFrame(yearAnimFrame);
		const start = performance.now();
		const delta = to - from;

		function tick(now: number) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / YEAR_ANIM_DURATION_MS, 1);
			// ease-out cubic
			const eased = 1 - Math.pow(1 - progress, 3);
			displayYear = Math.round(from + delta * eased);
			if (progress < 1) {
				yearAnimFrame = requestAnimationFrame(tick);
			} else {
				displayYear = to;
				yearAnimFrame = null;
			}
		}

		yearAnimFrame = requestAnimationFrame(tick);
	}

	function startPlayback() {
		if (playbackTimer !== null) return;
		playbackTimer = setInterval(() => {
			if (year >= MAX_YEAR) {
				stopPlayback();
				return;
			}
			const prev = year;
			year = Math.min(year + PLAYBACK_STEP, MAX_YEAR);
			animateDisplayYear(prev, year);
		}, PLAYBACK_INTERVAL_MS);
	}

	function stopPlayback() {
		if (playbackTimer !== null) {
			clearInterval(playbackTimer);
			playbackTimer = null;
		}
		playing = false;
	}

	function togglePlayback() {
		if (playing) {
			stopPlayback();
		} else {
			if (year >= MAX_YEAR) {
				year = MIN_YEAR;
				displayYear = MIN_YEAR;
			}
			playing = true;
			startPlayback();
		}
	}

	function setYear(newYear: number, options?: { animate?: boolean }) {
		const clamped = Math.max(MIN_YEAR, Math.min(MAX_YEAR, newYear));
		const prev = year;
		year = clamped;
		if (options?.animate) {
			animateDisplayYear(prev, clamped);
		} else {
			if (yearAnimFrame !== null) cancelAnimationFrame(yearAnimFrame);
			displayYear = clamped;
		}
	}

	function jumpToEvent(eventYear: number) {
		setYear(eventYear, { animate: true });
	}

	function selectArtifact(artifact: Artifact) {
		selectedArtifact = artifact;
		if (Math.abs(artifact.year - year) > ARTIFACT_WINDOW) {
			setYear(artifact.year, { animate: true });
		}
	}

	function clearKingdom() {
		selectedKingdom = null;
	}

	function clearArtifact() {
		selectedArtifact = null;
	}

	return {
		get year() { return year; },
		get displayYear() { return displayYear; },
		get playing() { return playing; },
		get selectedKingdom() { return selectedKingdom; },
		set selectedKingdom(k: Kingdom | null) { selectedKingdom = k; },
		get selectedArtifact() { return selectedArtifact; },
		get showArtifacts() { return showArtifacts; },
		set showArtifacts(v: boolean) { showArtifacts = v; },
		get showEvents() { return showEvents; },
		set showEvents(v: boolean) { showEvents = v; },
		get nearestPeriodYear() { return nearestPeriodYear; },
		get currentPeriod() { return currentPeriod; },
		get relevantEvents() { return relevantEvents; },
		get visibleArtifacts() { return visibleArtifacts; },
		get periodYears() { return periodYears; },
		get minYear() { return MIN_YEAR; },
		get maxYear() { return MAX_YEAR; },
		togglePlayback,
		setYear,
		jumpToEvent,
		selectArtifact,
		clearKingdom,
		clearArtifact
	};
}

export const mapStore = createMapStore();
