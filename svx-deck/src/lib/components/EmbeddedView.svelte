<script lang="ts">
  import { Button, ThemeToggle } from "@dg/ui";
  import { onMount, untrack } from "svelte";
  import SlideSurface from "./SlideSurface.svelte";
  import { createDeckController } from "../deck/controller";
  import type { Deck } from "../deck/types";

  let { deck }: { deck: Deck } = $props();
  // An embedded reader must not drive other open decks or presenter windows.
  const controller = untrack(() =>
    createDeckController(
      deck.id,
      deck.slides.length,
      (slide) => deck.slides[slide]?.metadata.steps ?? 0,
      { broadcast: false },
    ),
  );
  const state = controller.state;
  onMount(controller.mount);
  let current = $derived(deck.slides[$state.slide]);
  let maxStep = $derived(current?.metadata.steps ?? 0);
</script>

<svelte:head><title>{deck.title}</title></svelte:head>

<main id="main" tabindex="-1">
  <div class="viewport">
    {#if current}<SlideSurface slide={current} step={$state.step} />{/if}
  </div>
  <nav aria-label="Navigation des slides">
    <Button
      icon={false}
      type="button"
      onclick={controller.previous}
      disabled={$state.slide === 0 && $state.step === 0}
      aria-label="Slide ou étape précédente">←</Button
    >
    <Button
      icon={false}
      type="button"
      onclick={controller.next}
      disabled={$state.slide === deck.slides.length - 1 &&
        $state.step === maxStep}
      aria-label="Slide ou étape suivante">→</Button
    >
    <label>
      <span class="sr-only">Choisir une slide</span>
      <select
        value={$state.slide}
        onchange={(event) => controller.goTo(Number(event.currentTarget.value))}
      >
        {#each deck.slides as slide, index}<option value={index}
            >{index + 1} / {deck.slides.length} · {slide.title}</option
          >{/each}
      </select>
    </label>
    <span class="step" aria-live="polite"
      >{#if maxStep}Étape {$state.step}/{maxStep}{/if}</span
    >

    <ThemeToggle />
  </nav>
</main>

<style>
  main {
    height: 100dvh;
    display: grid;
    grid-template-rows: minmax(0, 1fr) 52px;
    background: var(--background);
    color: var(--text-prominent);
  }
  .viewport {
    min-height: 0;
    overflow: hidden;
  }
  nav {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-top: 1px solid var(--border-prominent);
    font: var(--ui-weight) 12px/1.4 var(--font-mono);
  }
  label {
    flex: 1;
    min-width: 0;
  }
  select {
    width: 100%;
    min-height: 36px;
    border: 1px solid var(--border-prominent);
    border-radius: 0;
    background: var(--background);
    color: var(--text-prominent);
    padding: 4px 8px;
  }
  select:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .step:empty {
    display: none;
  }
  .step {
    font-size: 10px;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
</style>
