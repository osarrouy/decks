<script lang="ts">
  import { onMount } from 'svelte'
  import SlideSurface from './SlideSurface.svelte'
  import { createDeckController } from '../deck/controller'
  import type { Deck } from '../deck/types'

  export let deck: Deck
  // An embedded reader must not drive other open decks or presenter windows.
  const controller = createDeckController(deck.id, deck.slides.length,
    (slide) => deck.slides[slide]?.metadata.steps ?? 0, { broadcast: false })
  const state = controller.state
  onMount(controller.mount)
  $: current = deck.slides[$state.slide]
  $: maxStep = current?.metadata.steps ?? 0
</script>

<svelte:head><title>{deck.title}</title></svelte:head>

<main data-theme={deck.theme ?? 'default'}>
  <div class="viewport">
    {#if current}<SlideSurface slide={current} step={$state.step} />{/if}
  </div>
  <nav aria-label="Navigation des slides">
    <button type="button" on:click={controller.previous}
      disabled={$state.slide === 0 && $state.step === 0} aria-label="Slide ou étape précédente">←</button>
    <button type="button" on:click={controller.next}
      disabled={$state.slide === deck.slides.length - 1 && $state.step === maxStep} aria-label="Slide ou étape suivante">→</button>
    <label>
      <span class="sr-only">Choisir une slide</span>
      <select value={$state.slide} on:change={(event) => controller.goTo(Number(event.currentTarget.value))}>
        {#each deck.slides as slide, index}<option value={index}>{index + 1} / {deck.slides.length} · {slide.title}</option>{/each}
      </select>
    </label>
    <span class="step" aria-live="polite">{#if maxStep}Étape {$state.step}/{maxStep}{/if}</span>

  </nav>
</main>

<style>
  /* Scale rem-based slide typography with the iframe, keeping controls readable. */
  :global(html) { font-size: clamp(4px, 1.25vw, 16px); }
  main { height: 100dvh; display: grid; grid-template-rows: minmax(0, 1fr) 52px; background: var(--bg); color: var(--fg); }
  .viewport { min-height: 0; overflow: hidden; }
  nav { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-top: 1px solid var(--rule, #ccc); font: 12px/1.4 ui-sans-serif, system-ui, sans-serif; }
  label { flex: 1; min-width: 0; }
  select { width: 100%; }
  button, select { min-height: 36px; border: 1px solid var(--rule, #ccc); border-radius: 0; background: var(--bg); color: var(--fg); padding: 4px 8px; }
  button { width: 38px; cursor: pointer; }
  button:disabled { opacity: .35; cursor: default; }
  :is(button, select):focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .step:empty { display: none; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
</style>
