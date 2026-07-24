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

<div class="deck-shell" data-theme={deck.theme ?? "default"}>
    <main class="deck-stage">
        <header class="deck-chrome" aria-hidden="true">
            <div class="deck-title">{deck.title}</div>
            <div class="deck-counter">
                {$state.slide + 1} / {deck.slides.length}
            </div>
        </header>

        {#if current}
            <SlideSurface slide={current} step={$state.step} />
        {/if}
    </main>

    <div class="deck-progress" style={`width: ${progress}%`}></div>
</div>
