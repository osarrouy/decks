<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";
  import { cubicInOut } from "svelte/easing";
  import { Tween, prefersReducedMotion } from "svelte/motion";
  import { fade } from "svelte/transition";

  const step = getStepContext();
  let phase = $derived(Math.max(0, Math.min($step, 2)));

  // Shares of the 2025 global ad market (1 140 Md$), in percent of the ring.
  const total = 1140;
  const digital = 73.2;
  const companies = [
    { name: "Alphabet", amount: 295, tone: "100%" },
    { name: "Meta", amount: 196, tone: "68%" },
    { name: "Amazon", amount: 69, tone: "42%" },
  ].map((company) => ({ ...company, share: (company.amount / total) * 100 }));
  const digitalAmount = (total * digital) / 100;
  const companiesShare = companies.reduce((sum, c) => sum + c.share, 0);

  // The digital arc is drawn from the start as the three companies plus the
  // rest, in a single tone, so step 2 only has to split and recolor it.
  const segments = [
    ...companies.map((c, i) => ({
      start: companies.slice(0, i).reduce((sum, p) => sum + p.share, 0),
      end: companies.slice(0, i + 1).reduce((sum, p) => sum + p.share, 0),
      tone: c.tone,
    })),
    { start: companiesShare, end: digital, tone: "24%" },
  ];

  // How far the ring is drawn clockwise from the top.
  const motion = () => ({
    duration: prefersReducedMotion.current ? 0 : 900,
    easing: cubicInOut,
  });
  const reveal = new Tween(0);
  $effect(() => {
    reveal.set(phase >= 1 ? digital : 0, motion());
  });

  // Parts overlap the next one slightly to hide anti-aliasing seams.
  const drawn = (start: number, end: number) => {
    const length = Math.min(reveal.current, end) - start;
    if (length <= 0) return 0;
    return length + (end < digital ? 0.3 : 0);
  };

  const percent = (value: number) => `${Math.round(value)} %`;

  // Ring geometry in viewBox units; labels sit in two columns on each side.
  const cx = 130;
  const cy = 60;
  const r = 40;
  const column = 76;
  const point = (share: number, radius: number) => {
    const angle = (share / 100) * 2 * Math.PI;
    return [cx + radius * Math.sin(angle), cy - radius * Math.cos(angle)];
  };

  // Each label hangs from the middle of its part: a radial segment, then a
  // horizontal one ending in the label column.
  const labels = [
    {
      name: "Publicité numérique",
      value: percent(digital),
      at: 61,
      from: 1,
      tone: "100%",
    },
    ...segments.slice(0, 3).map((segment, i) => ({
      name: companies[i].name,
      value: `${companies[i].amount} Md$ · ${percent((companies[i].amount / digitalAmount) * 100)}`,
      at: (segment.start + segment.end) / 2,
      from: 2,
      tone: segment.tone,
    })),
  ].map((label) => {
    const [x1, y1] = point(label.at, r + 9);
    const [x2, y2] = point(label.at, r + 15);
    const side = x2 < cx ? -1 : 1;
    const x3 = cx + side * column;
    return { ...label, side, x3, y: y2, path: `M${x1} ${y1}L${x2} ${y2}H${x3}` };
  });
  // Narrow surfaces crop the view to the ring and list the labels below it.
  let width = $state(0);
  let height = $state(0);
  let narrow = $derived(width > 0 && width < height);

  let center = $derived(
    [
      { value: "1 140 Md$", label: "Marché mondial, 2025" },
      { value: percent(digital), label: "Publicité numérique" },
      {
        value: percent((companiesShare / digital) * 100),
        label: "Du numérique, trois groupes",
      },
    ][phase],
  );
</script>

<figure class:narrow bind:clientWidth={width} bind:clientHeight={height}>
  <svg viewBox={narrow ? `${cx - 50} ${cy - 50} 100 100` : "0 0 260 120"} role="img">
    <title>Le marché publicitaire mondial en 2025</title>
    <desc>
      1 140 milliards de dollars, dont 73 % de publicité numérique. Alphabet,
      Meta et Amazon réunissent environ deux tiers de cette part numérique.
    </desc>
    <g transform="rotate(-90 {cx} {cy})" aria-hidden="true">
      <circle class="track" {cx} {cy} {r} />
      {#each segments as segment}
        <circle
          class="arc"
          {cx}
          {cy}
          {r}
          pathLength="100"
          style:--_tone={phase >= 2 ? segment.tone : "100%"}
          style:stroke-dasharray="{drawn(segment.start, segment.end)} 100"
          style:stroke-dashoffset={-segment.start}
        />
      {/each}
    </g>

    {#key phase}
      <g in:fade={{ duration: prefersReducedMotion.current ? 0 : 400 }}>
        <text class="value" x={cx} y={cy}>{center.value}</text>
        <text class="label" x={cx} y={cy + 9}>{center.label}</text>
      </g>
    {/key}

    {#each narrow ? [] : labels as label}
      <g class="callout" class:visible={phase >= label.from}>
        <path pathLength="1" d={label.path} />
        <text
          class="name"
          x={label.x3 + label.side * 2}
          y={label.y - 0.6}
          text-anchor={label.side < 0 ? "end" : "start"}>{label.name}</text
        >
        <text
          class="amount"
          x={label.x3 + label.side * 2}
          y={label.y + 4.4}
          text-anchor={label.side < 0 ? "end" : "start"}>{label.value}</text
        >
      </g>
    {/each}
  </svg>

  {#if narrow}
    <ul>
      {#each labels as label}
        <li
          class:visible={phase >= label.from}
          style:--_tone={label.from === 1 && phase >= 2 ? "24%" : label.tone}
        >
          <span>{label.name}</span>
          <span>{label.value}</span>
        </li>
      {/each}
    </ul>
  {/if}
</figure>

<style>
  figure {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-content: center;
    gap: 4cqh;
    width: 100%;
    height: 100cqh; /* The slide height, so the aspect check sees the surface. */
    margin: 0;
  }

  svg {
    display: block;
    width: 100%;
    max-height: 86cqh;
  }

  .narrow svg {
    max-height: 50cqh;
    overflow: visible;
  }

  circle {
    fill: none;
    stroke-width: 14;
  }

  .track {
    stroke: var(--background-prominent);
  }

  .arc {
    stroke: color-mix(in srgb, var(--accent) var(--_tone), var(--background));
    transition: stroke 600ms ease;
  }

  text {
    fill: var(--text-prominent);
  }

  .value,
  .label {
    text-anchor: middle;
  }

  .value {
    font-family: var(--font-serif);
    font-size: 11px;
  }

  .label,
  .amount {
    fill: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 2.8px;
    text-transform: uppercase;
  }

  .name {
    font-size: 4.2px;
  }

  .amount {
    font-size: 3.2px;
    font-variant-numeric: tabular-nums;
  }

  path {
    fill: none;
    stroke: var(--text-muted);
    stroke-width: 0.2; /* About one pixel on a projected slide. */
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 500ms ease;
  }

  .callout text {
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .callout.visible path {
    stroke-dashoffset: 0;
    transition-delay: 500ms;
  }

  .callout.visible text {
    opacity: 1;
    transition-delay: 900ms;
  }

  ul {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
    font-variant-numeric: tabular-nums;
  }

  li {
    display: grid;
    grid-template-columns: 0.8em 1fr auto;
    align-items: center;
    gap: 0.6em;
    padding-block: 1.2cqh;
    border-bottom: var(--border-width) solid var(--border);
    opacity: 0;
    transition: opacity 300ms ease 900ms;
  }

  li::before {
    content: "";
    aspect-ratio: 1;
    background: color-mix(in srgb, var(--accent) var(--_tone), var(--background));
  }

  li.visible {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .arc,
    path,
    .callout text,
    .callout.visible path,
    .callout.visible text,
    li {
      transition: none;
    }
  }
</style>
