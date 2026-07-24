<script lang="ts">
    import { onMount } from "svelte";
    import SlideSurface from "./SlideSurface.svelte";
    import { createDeckController } from "../deck/controller";
    import type { Deck } from "../deck/types";

    export let deck: Deck;

    const controller = createDeckController(
        deck.id,
        deck.slides.length,
        (slide) => deck.slides[slide]?.metadata.steps ?? 0,
    );
    const state = controller.state;

    onMount(controller.mount);

    $: current = deck.slides[$state.slide];
    $: progress = deck.slides.length
        ? (($state.slide + 1) / deck.slides.length) * 100
        : 0;
</script>

<svelte:head>
    <title>{deck.title}</title>
</svelte:head>

<main class="deck" data-theme={deck.theme ?? "default"} style={`--progress: ${progress}%`}>
    <header class="deck-header" aria-hidden="true">
        <span>{deck.title}</span>
        <span>{$state.slide + 1} / {deck.slides.length}</span>
    </header>

    {#if current}
        <SlideSurface slide={current} step={$state.step} />
    {/if}
</main>
