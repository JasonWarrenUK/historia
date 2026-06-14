<script lang="ts">
	import { onDestroy } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { mapStore } from '$lib/stores/map.svelte.js';
	import '../app.css';

	let { children } = $props();

	onDestroy(() => mapStore.destroy());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
