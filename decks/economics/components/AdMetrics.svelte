<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";
  import { prefersReducedMotion } from "svelte/motion";
  import { fade } from "svelte/transition";

  const step = getStepContext();
  let phase = $derived(Math.max(0, Math.min($step, 2)));

  const metrics = [
    { name: "CPM", unit: "Mille impressions", count: "1 000 impressions" },
    { name: "CPC", unit: "Un clic", count: "20 clics" },
    { name: "CPA", unit: "Une action définie", count: "1 action" },
  ];

  // A thousand impressions with the proportions of the fictive campaign on the
  // next slide: 2 % are clicked and 5 % of clicks lead to an action. One click
  // per row, scattered across columns by the golden ratio.
  const columns = 50;
  const rows = 20;
  const clicks = Array.from({ length: rows }, (_, row) => ({
    row,
    column: Math.floor(((0.37 + row * 0.618034) % 1) * columns),
  }));
  const action = clicks[11];
  const cells = Array.from({ length: columns * rows }, (_, i) => {
    const row = Math.floor(i / columns);
    const column = i % columns;
    const click = clicks[row].column === column;
    return {
      row,
      column,
      level: row === action.row && column === action.column ? 2 : click ? 1 : 0,
      delay: (i * 37) % 500, // Dissolves the grid instead of switching it at once.
    };
  });

  // Narrow surfaces turn the grid upright.
  let width = $state(0);
  let height = $state(0);
  let narrow = $derived(width > 0 && width < height);
  const pitch = 10;
</script>

<figure class:narrow bind:clientWidth={width} bind:clientHeight={height}>
  <dl>
    {#each metrics as metric, i}
      <div class:active={phase === i}>
        <dt>{metric.name}</dt>
        <dd>{metric.unit}</dd>
      </div>
    {/each}
  </dl>

  <svg
    viewBox="0 0 {(narrow ? rows : columns) * pitch} {(narrow ? columns : rows) * pitch}"
    role="img"
  >
    <title>Ce que l’annonceur paie</title>
    <desc>
      Mille impressions forment la base du CPM. Seule une vingtaine donne lieu
      à un clic, base du CPC, et une seule à une action, base du CPA.
    </desc>
    {#each cells as cell}
      <circle
        cx={((narrow ? cell.row : cell.column) + 0.5) * pitch}
        cy={((narrow ? cell.column : cell.row) + 0.5) * pitch}
        r={pitch * 0.3}
        class:lit={cell.level >= phase}
        style:transition-delay="{prefersReducedMotion.current ? 0 : cell.delay}ms"
      />
    {/each}
  </svg>

  {#key phase}
    <p in:fade={{ duration: prefersReducedMotion.current ? 0 : 400, delay: 300 }}>
      {metrics[phase].count}
    </p>
  {/key}
</figure>

<style>
  figure {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    justify-items: center;
    gap: 4cqh;
    width: 100%;
    height: 100cqh; /* The slide height, so the aspect check sees the surface. */
    margin: 0;
  }

  dl {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-5);
    width: 100%;
    margin: 0;
  }

  dl div {
    color: var(--text-muted);
    transition: color 400ms ease;
  }

  dl .active {
    color: var(--text-prominent);
  }

  dt {
    font-family: var(--font-serif);
    font-size: var(--heading-3-size);
    transition: color 400ms ease;
  }

  .active dt {
    color: var(--accent);
  }

  dd,
  p {
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--metadata-font-size);
    text-transform: uppercase;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 0;
  }

  circle {
    fill: var(--border);
    transition: fill 500ms ease;
  }

  circle.lit {
    fill: var(--accent);
  }

  p {
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  @media (prefers-reduced-motion: reduce) {
    dl div,
    dt,
    circle {
      transition: none;
    }
  }
</style>
