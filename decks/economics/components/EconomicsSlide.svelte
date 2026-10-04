<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div class="page">
  {@render children()}
</div>

<style>
  .page {
    width: 100%;
    height: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4cqh;
    font-size: min(3.1cqw, 5cqh);
    line-height: 1.3;
  }

  .page :global(h1),
  .page :global(h2),
  .page :global(p),
  .page :global(figure),
  .page :global(dl) {
    margin: 0;
  }

  .page :global(h1) {
    max-width: 15ch;
    font-size: min(8.2cqw, 15cqh);
    line-height: 1.02;
  }

  .page :global(h2) {
    max-width: 26ch;
    font-size: min(5.8cqw, 10cqh);
    line-height: 1.07;
  }

  .page :global(.meta) {
    font-family: var(--font-mono);
    font-size: 0.52em;
    line-height: 1.35;
    text-transform: uppercase;
    letter-spacing: var(--metadata-letter-spacing);
    color: var(--text-muted);
  }

  .page :global(.accent) {
    color: var(--accent);
  }

  .page :global(.large) {
    font-family: var(--font-mono);
    font-size: 2em;
    line-height: 1.05;
    color: var(--accent);
  }

  .page :global(.columns) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5cqw;
    align-items: start;
  }

  .page :global(.columns.three) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3cqw;
  }

  .page :global(.columns > div),
  .page :global(.stack) {
    display: grid;
    gap: 2.5cqh;
    min-width: 0;
  }

  .page :global(.rows) {
    display: grid;
    gap: 0;
  }

  .page :global(.rows > div) {
    display: grid;
    grid-template-columns: 0.8fr 1.5fr;
    gap: 3cqw;
    padding: 1.9cqh 0;
    border-bottom: 1px solid var(--border);
  }

  .page :global(dt) {
    font-family: var(--font-mono);
    color: var(--accent);
    font-size: 0.72em;
    align-self: center;
  }

  .page :global(dd) {
    margin: 0;
  }

  .page :global(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85em;
    font-variant-numeric: tabular-nums;
  }

  .page :global(th),
  .page :global(td) {
    padding: 2cqh 1cqw;
    border-bottom: 1px solid var(--border);
    text-align: left;
  }

  .page :global(th) {
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.7em;
    font-weight: var(--ui-weight);
  }

  .page :global(.chart) {
    display: block;
    width: 100%;
    max-height: 54cqh;
    overflow: visible;
    color: var(--text-prominent);
    font-family: var(--font-sans);
  }

  .page :global(.chart text) {
    fill: currentColor;
    font-size: 28px;
  }

  .page :global(.chart .small) {
    font-size: 20px;
    fill: var(--text-muted);
    font-family: var(--font-mono);
  }

  .page :global(.chart .line) {
    fill: none;
    stroke: var(--text-muted);
    stroke-width: 1.2;
    vector-effect: non-scaling-stroke;
  }

  .page :global(.chart .highlight) {
    fill: var(--accent);
  }

  .page :global(.chart .area) {
    fill: var(--background-prominent);
    stroke: var(--border);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .page :global(.bar) {
    height: 5cqh;
    background: var(--background-prominent);
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .page :global(.bar > span) {
    display: block;
    height: 100%;
    background: var(--accent);
  }

  .page :global(.bar-label) {
    display: flex;
    justify-content: space-between;
    gap: 2cqw;
  }

  .page :global(.mock) {
    padding: 4cqh 3cqw;
    border: 1px solid var(--border-prominent);
    display: grid;
    gap: 3cqh;
    font-size: 0.8em;
  }

  .page :global(.mock .accept) {
    display: block;
    padding: 1.5cqh 1cqw;
    background: var(--accent);
    color: var(--background);
    text-align: center;
    font-weight: var(--ui-weight);
  }

  .page :global(.mock .refuse) {
    font-size: 0.7em;
    text-align: center;
    text-decoration: underline;
  }

  .page :global(.banner) {
    width: 100%;
    image-rendering: auto;
  }

  .page :global(.formula) {
    font-size: 1.2em;
    color: var(--accent);
    font-family: var(--font-mono);
  }

  @container (aspect-ratio < 1) {
    .page {
      font-size: 4.8cqw;
      gap: 3cqh;
    }

    .page :global(h1) {
      font-size: 11cqw;
    }

    .page :global(h2) {
      font-size: 8cqw;
    }

    .page :global(.columns),
    .page :global(.columns.three) {
      grid-template-columns: minmax(0, 1fr);
      gap: 3cqh;
    }

    .page :global(.columns > div) {
      gap: 1cqh;
    }

    .page :global(th),
    .page :global(td) {
      padding: 1.5cqh 0.7cqw;
      overflow-wrap: anywhere;
    }
  }
</style>
