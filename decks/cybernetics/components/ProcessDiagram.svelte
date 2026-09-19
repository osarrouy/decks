<script lang="ts">
  import { getStepContext } from '@svx-slides/core/deck/stepContext'

  const step = getStepContext()

  const items = [
    { label: 'mdsvex', text: 'écriture' },
    { label: 'Svelte', text: 'composants' },
    { label: 'Runtime', text: 'navigation' },
    { label: 'Site', text: 'publication' }
  ]
</script>

<div class="process" aria-label="Pipeline de publication">
  {#each items as item, index}
    <div class="node" data-active={$step >= index + 1}>
      <strong>{item.label}</strong>
      <span>{item.text}</span>
    </div>
    {#if index < items.length - 1}
      <div class="arrow" data-active={$step >= index + 2}>→</div>
    {/if}
  {/each}
</div>

<style>
  .process {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    gap: clamp(0.6rem, 1.4vw, 1.4rem);
    align-items: center;
    width: 100%;
  }

  .node {
    display: grid;
    gap: 0.35rem;
    min-height: 9rem;
    place-items: center;
    padding: 1rem;
    border: 1px solid color-mix(in srgb, var(--text-prominent), transparent 82%);
    border-radius: 1rem;
    background: color-mix(in srgb, var(--background), var(--text-prominent) 4%);
    opacity: 0.28;
    transform: translateY(0.5rem) scale(0.98);
    transition: 260ms ease;
    text-align: center;
  }

  .node[data-active='true'] {
    border-color: var(--accent);
    background: var(--accent-subtle);
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  strong {
    color: var(--accent);
    font-size: clamp(1.3rem, 2vw, 2.1rem);
  }

  span {
    color: var(--text-muted);
    font-size: clamp(0.9rem, 1.2vw, 1.15rem);
  }

  .arrow {
    color: var(--accent);
    font-size: clamp(1.4rem, 2vw, 2.4rem);
    opacity: 0.18;
    transform: translateX(-0.25rem);
    transition: 260ms ease;
  }

  .arrow[data-active='true'] {
    opacity: 1;
    transform: translateX(0);
  }
</style>
