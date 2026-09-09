<script lang="ts">
  import { onMount, untrack } from "svelte";
  import SlideSurface from "./SlideSurface.svelte";
  import { createDeckController } from "../deck/controller";
  import type { Deck } from "../deck/types";

  let { deck }: { deck: Deck } = $props();

  const controller = untrack(() =>
    createDeckController(
      deck.id,
      deck.slides.length,
      (slide) => deck.slides[slide]?.metadata.steps ?? 0,
    ),
  );
  const state = controller.state;

  onMount(controller.mount);

  let current = $derived(deck.slides[$state.slide]);
  let progress = $derived(
    deck.slides.length ? (($state.slide + 1) / deck.slides.length) * 100 : 0,
  );
</script>

<svelte:head>
  <title>{deck.title}</title>
</svelte:head>

<main id="main" tabindex="-1" class="deck" style={`--progress: ${progress}%`}>
  <header class="deck-header" aria-hidden="true">
    <span>{deck.title}</span>
    <span>{$state.slide + 1} / {deck.slides.length}</span>
  </header>

  {#if current}
    <SlideSurface slide={current} step={$state.step} />
  {/if}
</main>

<style>
  .deck {
    position: relative;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    background: var(--background);
  }
  .deck-header {
    display: none;
  }
  .deck::after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: var(--progress, 0%);
    height: 2px;
    background: var(--accent);
    transition: width 180ms ease;
    content: "";
  }
  @media (prefers-reduced-motion: reduce) {
    .deck::after {
      transition: none;
    }
  }
</style>
