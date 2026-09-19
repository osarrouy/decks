<script lang="ts">
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
  const state = controller.state;

  onMount(controller.mount);

  let current = $derived(deck.slides[$state.slide]);
  let maxStep = $derived(current?.metadata.steps ?? 0);
  let progress = $derived(
    deck.slides.length ? (($state.slide + 1) / deck.slides.length) * 100 : 0,
  );
</script>

<svelte:head>
  <title>{deck.title} — révisions</title>
</svelte:head>

<main
  id="main"
  tabindex="-1"
  class="student-root"
  style={`--progress: ${progress}%`}
>
  <div class="student-shell">
    <header class="student-header">
      <div>
        <p class="student-kicker">Support de révision</p>
        <h1>{deck.title}</h1>
      </div>
      <div class="student-counter" aria-live="polite">
        <strong>{$state.slide + 1}</strong> / {deck.slides.length}
        <span>· étape {$state.step}{maxStep ? `/${maxStep}` : ""}</span>
      </div>
    </header>

    {#if current}
      <section
        class="student-slide-panel"
        aria-label={`Slide ${$state.slide + 1} : ${current.title}`}
      >
        <div class="student-slide-viewport">
          <SlidePreview slide={current} step={$state.step} />
        </div>
        <div class="student-slide-footer">
          <span>{current.title}</span>
          <span>Utilisez ← → ou Espace pour naviguer</span>
        </div>
      </section>

      <section
        class="student-notes presenter-notes"
        aria-live="polite"
        aria-label={`Notes : ${current.title}`}
      >
        <header class="student-notes-header">
          <span>Notes de cours</span>
          <span>{current.title}</span>
        </header>
        {#key $state.slide}
          {#if current.notes}
            <div class="student-notes-content presenter-notes-content">
              <Notes notes={current.notes} audience="student" />
            </div>
          {:else}
            <p class="student-notes-empty muted">
              Aucune note n’est disponible pour cette slide.
            </p>
          {/if}
        {/key}
      </section>

      <nav class="student-controls" aria-label="Navigation des slides">
        <Button icon={false} type="button" onclick={controller.previous}
          >← Précédent</Button
        >
        <Button icon={false} type="button" onclick={controller.next}
          >Suivant →</Button
        >
        <ThemeToggle />
      </nav>
    {/if}
  </div>
</main>

<style>
  .student-root {
    height: 100dvh;
    overflow: auto;
    background: var(--background);
    color: var(--text-prominent);
  }
  .student-shell {
    width: min(100% - 2rem, 76rem);
    margin: 0 auto;
    padding: var(--space-5) 0 var(--space-6);
  }
  .student-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);
    margin-bottom: var(--space-5);
  }
  .student-kicker {
    color: var(--accent);
    font: var(--ui-weight) 12px/1.6 var(--font-mono);
    text-transform: uppercase;
  }
  h1 {
    max-width: 28ch;
    font: var(--heading-weight) clamp(1.7rem, 4vw, 3rem)/1.1 var(--font-serif);
  }
  .student-counter {
    flex: 0 0 auto;
    color: var(--text-muted);
    font: var(--ui-weight) 12px/1.6 var(--font-mono);
  }
  .student-counter strong {
    color: var(--text-prominent);
  }
  .student-slide-panel,
  .student-notes {
    border: 1px solid var(--border-prominent);
    background: var(--background);
    overflow: hidden;
  }
  .student-slide-viewport {
    container-type: inline-size;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }
  .student-slide-footer,
  .student-notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-3) var(--space-4);
    font: var(--ui-weight) 12px/1.6 var(--font-mono);
    color: var(--text-muted);
  }
  .student-slide-footer {
    border-top: 1px solid var(--border-prominent);
  }
  .student-notes-header {
    border-bottom: 1px solid var(--border-prominent);
    text-transform: uppercase;
  }
  .student-notes-header span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .student-notes {
    margin-top: var(--space-5);
  }
  .student-notes-empty {
    padding: var(--space-5);
  }
  .student-controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-5);
  }
  @media (max-width: 44rem) {
    .student-shell {
      width: calc(100% - 1rem);
    }
    .student-header,
    .student-slide-footer {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-3);
    }
  }
</style>
