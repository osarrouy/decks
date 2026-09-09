<script lang="ts">
  import { base } from "$app/paths";
  import { Button, ThemeToggle } from "@dg/ui";
  import { onMount, untrack } from "svelte";
  import SlidePreview from "./SlidePreview.svelte";
  import { createDeckController } from "../deck/controller";
  import Notes from "./Notes.svelte";
  import type { Deck } from "../deck/types";

  let { deck }: { deck: Deck } = $props();

  const controller = untrack(() =>
    createDeckController(
      deck.id,
      deck.slides.length,
      (slide) => deck.slides[slide]?.metadata.steps ?? 0,
    ),
  );
  const position = controller.state;

  const startedAt = Date.now();
  let now = $state(Date.now());

  onMount(() => {
    const cleanup = controller.mount();
    const timer = window.setInterval(() => (now = Date.now()), 1000);
    return () => {
      cleanup();
      window.clearInterval(timer);
    };
  });

  let current = $derived(deck.slides[$position.slide]);
  let nextSlide = $derived(deck.slides[$position.slide + 1]);
  let elapsed = $derived(Math.floor((now - startedAt) / 1000));
  let elapsedLabel = $derived(
    `${Math.floor(elapsed / 60)
      .toString()
      .padStart(2, "0")}:${(elapsed % 60).toString().padStart(2, "0")}`,
  );

  function openProjection() {
    const projectionUrl = new URL(`${base}/`, window.location.origin);
    projectionUrl.hash = window.location.hash;
    window.open(projectionUrl.toString(), `${deck.id}-projection`);
  }
</script>

<svelte:head>
  <title>{deck.title} — présentateur</title>
</svelte:head>

<main id="main" tabindex="-1" class="presenter-root">
  <div class="presenter-grid">
    <div class="presenter-preview-stack">
      <section class="presenter-panel presenter-current">
        <header class="presenter-panel-header">
          <span>Slide actuelle</span>
          <span
            >{$position.slide + 1}/{deck.slides.length} · étape {$position.step}</span
          >
        </header>
        <div class="presenter-preview">
          <SlidePreview slide={current} step={$position.step} />
        </div>
      </section>

      <section class="presenter-panel presenter-next">
        <header class="presenter-panel-header">
          <span>Slide suivante</span>
        </header>
        <div class="presenter-preview">
          <SlidePreview slide={nextSlide} step={0} />
        </div>
      </section>
    </div>

    <aside class="presenter-side">
      <section class="presenter-panel presenter-notes">
        <header class="presenter-panel-header">
          <span>Notes</span>
        </header>
        {#if current?.notes}
          <div class="presenter-notes-content">
            <Notes notes={current.notes} />
          </div>
        {:else}
          <p class="muted">
            Aucune note chargée. En build public, c’est le comportement attendu.
          </p>
        {/if}
      </section>

      <section class="presenter-panel presenter-controls">
        <Button
          icon={false}
          class="presenter-button"
          onclick={controller.previous}>← Précédent</Button
        >
        <Button icon={false} class="presenter-button" onclick={controller.next}
          >Suivant →</Button
        >
        <Button icon={false} class="presenter-button" onclick={openProjection}
          >Ouvrir projection</Button
        >
        <ThemeToggle />
        <span class="presenter-meta">{elapsedLabel}</span>
      </section>
    </aside>
  </div>
</main>

<style>
  .presenter-root {
    height: 100dvh;
    overflow: auto;
    padding: var(--space-4);
    background: var(--background);
    color: var(--text-prominent);
  }
  .presenter-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    gap: var(--space-4);
    height: 100%;
    min-height: 34rem;
  }
  .presenter-panel {
    border: 1px solid var(--border-prominent);
    background: var(--background);
    min-width: 0;
    overflow: hidden;
  }
  .presenter-panel-header {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border-prominent);
    color: var(--text-muted);
    font: var(--ui-weight) 11px/1.6 var(--font-mono);
    text-transform: uppercase;
  }
  .presenter-preview-stack {
    display: grid;
    grid-template-rows: minmax(0, 1.22fr) minmax(8rem, 0.78fr);
    gap: var(--space-4);
    min-height: 0;
  }
  .presenter-current,
  .presenter-next,
  .presenter-notes {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .presenter-preview {
    flex: 1;
    min-height: 0;
  }
  .presenter-side {
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    gap: var(--space-4);
    min-height: 0;
  }
  .presenter-notes-content {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }
  .muted {
    color: var(--text-muted);
    padding: var(--space-5);
  }
  .presenter-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
  }
  .presenter-meta {
    margin-left: auto;
    color: var(--text-muted);
    font: var(--ui-weight) 12px/1.6 var(--font-mono);
  }
  @media (max-width: 980px) {
    .presenter-grid {
      height: auto;
      grid-template-columns: minmax(0, 1fr);
    }
    .presenter-preview-stack {
      height: 70vh;
      min-height: 22rem;
    }
    .presenter-notes-content {
      max-height: 70vh;
    }
  }
</style>
