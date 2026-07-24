<script lang="ts">
  import { onMount } from 'svelte'
  import SlidePreview from './SlidePreview.svelte'
  import { createDeckController } from '../deck/controller'
  import { notesToHtml } from '../deck/markdown'
  import type { Deck } from '../deck/types'

  export let deck: Deck

  const controller = createDeckController(
    deck.id,
    deck.slides.length,
    (slide) => deck.slides[slide]?.metadata.steps ?? 0
  )
  const state = controller.state

  let startedAt = Date.now()
  let now = Date.now()

  onMount(() => {
    const cleanup = controller.mount()
    const timer = window.setInterval(() => (now = Date.now()), 1000)
    return () => {
      cleanup()
      window.clearInterval(timer)
    }
  })

  $: current = deck.slides[$state.slide]
  $: nextSlide = deck.slides[$state.slide + 1]
  $: elapsed = Math.floor((now - startedAt) / 1000)
  $: elapsedLabel = `${Math.floor(elapsed / 60).toString().padStart(2, '0')}:${(elapsed % 60)
    .toString()
    .padStart(2, '0')}`

  function openProjection() {
    const projectionUrl = new URL('../', window.location.href)
    projectionUrl.hash = window.location.hash
    window.open(projectionUrl.toString(), `${deck.id}-projection`)
  }
</script>

<svelte:head>
  <title>{deck.title} — présentateur</title>
</svelte:head>

<div class="presenter-root" data-theme={deck.theme ?? 'default'}>
  <div class="presenter-grid">
    <div class="presenter-preview-stack">
      <section class="presenter-panel presenter-current">
        <header class="presenter-panel-header">
          <span>Slide actuelle</span>
          <span>{$state.slide + 1}/{deck.slides.length} · étape {$state.step}</span>
        </header>
        <div class="presenter-preview">
          <SlidePreview slide={current} step={$state.step} />
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
            {@html notesToHtml(current.notes)}
          </div>
        {:else}
          <p class="muted">Aucune note chargée. En build public, c’est le comportement attendu.</p>
        {/if}
      </section>

      <section class="presenter-panel presenter-controls">
        <button class="presenter-button" on:click={controller.previous}>← Précédent</button>
        <button class="presenter-button" on:click={controller.next}>Suivant →</button>
        <button class="presenter-button" on:click={openProjection}>Ouvrir projection</button>
        <span class="presenter-meta">{elapsedLabel}</span>
      </section>
    </aside>
  </div>
</div>
