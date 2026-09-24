<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";

  let { overview = false }: { overview?: boolean } = $props();

  const messages = [
    "Le hash d’un bloc dépend de son contenu, du hash précédent et d’un nonce.",
    "Le bloc 43 reprend le hash du bloc 42 comme hash précédent.",
    "Le bloc 44 reprend à son tour le hash du bloc 43 : la chaîne se prolonge.",
    "Modifier une transaction ancienne produit immédiatement un nouveau hash.",
    "Le bloc suivant pointe encore vers l’ancien hash : le lien est rompu.",
    "Corriger le lien change l’empreinte du bloc 43 : le lien avec le bloc 44 se rompt.",
    "Il faut refaire les preuves de travail et dépasser la chaîne qui continue de grandir.",
  ];

  const step = getStepContext();
  let phase = $derived(
    overview ? 2 : Math.max(0, Math.min($step, messages.length - 1)),
  );

  let blocks = $derived([
    {
      number: "42",
      data: phase >= 3 ? "Alice → Charlie" : "Alice → Bob",
      previous: "0000…",
      nonce: phase === 6 ? "à retrouver" : "71 042",
      hash: phase === 6 ? "à recalculer" : phase >= 3 ? "8f2c…" : "00a4…",
    },
    {
      number: "43",
      data: "Chloé → Dan",
      previous:
        phase === 6 ? "nouveau hash 42" : phase === 5 ? "8f2c…" : "00a4…",
      nonce: phase === 6 ? "à retrouver" : "18 593",
      hash: phase === 6 ? "à recalculer" : phase === 5 ? "9b1d…" : "007b…",
    },
    {
      number: "44",
      data: "Ève → Farid",
      previous: phase === 6 ? "nouveau hash 43" : "007b…",
      nonce: phase === 6 ? "à retrouver" : "92 771",
      hash: phase === 6 ? "à recalculer" : "003e…",
    },
  ]);

  const positions = [35, 375, 715];
</script>

<figure
  class:overview
  data-phase={phase}
  aria-label={overview
    ? "Chaque bloc reprend l’empreinte du bloc précédent"
    : "Chaînage des blocs par les hashes et recalcul des preuves de travail"}
>
  <svg
    class="typography"
    viewBox={overview ? "0 50 1000 350" : "0 0 1000 500"}
    role="img"
    aria-hidden="true"
  >
    <defs>
      <marker
        id="hash-link-arrow-muted"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" class="arrow-head muted"></path>
      </marker>
      <marker
        id="hash-link-arrow-accent"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" class="arrow-head accent"></path>
      </marker>
    </defs>

    <g class:visible={phase === 6} class="rework">
      <text x="500" y="25" text-anchor="middle">Recalcul séquentiel</text>

      {#each positions as x, index}
        <g
          class="work-step"
          class:step-1={index === 0}
          class:step-2={index === 1}
          class:step-3={index === 2}
        >
          <circle cx={x + 125} cy="58" r="18"></circle>
          <text x={x + 125} y="63" text-anchor="middle">{index + 1}</text>
        </g>
      {/each}

      <path
        class="work-link first"
        d="M 181 58 H 479"
        marker-end="url(#hash-link-arrow-accent)"
      ></path>
      <path
        class="work-link second"
        d="M 521 58 H 819"
        marker-end="url(#hash-link-arrow-accent)"
      ></path>
    </g>

    <path
      class="chain-link first"
      class:active={overview || phase === 1 || phase === 5}
      class:broken={phase === 4}
      class:work={phase === 6}
      d="M 290 250 H 365"
      marker-end={overview || phase === 1 || phase >= 4
        ? "url(#hash-link-arrow-accent)"
        : "url(#hash-link-arrow-muted)"}
    ></path>
    <path
      class="chain-link second"
      class:active={phase === 2}
      class:broken={phase >= 5 && phase < 6}
      class:work={phase === 6}
      d="M 630 250 H 705"
      marker-end={phase === 2 || phase >= 5
        ? "url(#hash-link-arrow-accent)"
        : "url(#hash-link-arrow-muted)"}
    ></path>

    {#each blocks as block, index}
      {@const x = positions[index]}
      <g
        class="block"
        class:muted={(phase === 0 && index > 0) || (phase === 1 && index > 1)}
        class:changed={phase >= 3 && phase < 6 && index === 0}
        class:invalid={(phase >= 4 && phase < 6 && index === 1) ||
          (phase >= 5 && phase < 6 && index === 2)}
        class:recalculating={phase === 6}
        transform={`translate(${x} 100)`}
      >
        <rect class="card" width="250" height={overview ? 252 : 300} rx="14"
        ></rect>
        <path
          class="header"
          d="M 14 0 H 236 A 14 14 0 0 1 250 14 V 54 H 0 V 14 A 14 14 0 0 1 14 0"
        ></path>
        <text class="title" x="20" y="35">BLOC {block.number}</text>

        <text class="label" x="20" y="83">Transactions</text>
        <text class="value data" x="20" y="108">{block.data}</text>

        <line x1="20" y1="127" x2="230" y2="127"></line>
        <text class="label" x="20" y="153">Hash précédent</text>
        <text
          class="value previous"
          class:matching={(overview && index > 0) ||
            (phase === 1 && index === 1) ||
            (phase === 2 && index === 2)}
          x="20"
          y="178">{block.previous}</text
        >

        {#if !overview}
          <rect
            class="nonce-background"
            x="12"
            y="194"
            width="226"
            height="40"
            rx="6"
          ></rect>
          <text class="label inline" x="20" y="220">Nonce</text>
          <text class="value nonce" x="230" y="220" text-anchor="end"
            >{block.nonce}</text
          >
        {/if}

        <rect
          class="hash-background"
          x="12"
          y={overview ? 194 : 242}
          width="226"
          height="44"
          rx="6"
        ></rect>
        <text class="label inline" x="20" y={overview ? 222 : 270}>Hash</text>
        <text
          class="value hash"
          class:matching={(overview && index < 2) ||
            (phase === 1 && index === 0) ||
            (phase === 2 && index === 1)}
          x="230"
          y={overview ? 222 : 270}
          text-anchor="end">{block.hash}</text
        >
      </g>
    {/each}

    <g class:visible={phase === 4} class="break first">
      <circle cx="330" cy="250" r="17"></circle>
      <path d="m 322 242 16 16 m 0-16-16 16"></path>
    </g>
    <g class:visible={phase >= 5 && phase < 6} class="break second">
      <circle cx="670" cy="250" r="17"></circle>
      <path d="m 662 242 16 16 m 0-16-16 16"></path>
    </g>
  </svg>

  {#if !overview}
    <figcaption>{messages[phase]}</figcaption>
  {/if}
</figure>

<style>
  figure {
    display: grid;
    width: 100%;
    margin: 0;
    gap: var(--space-4);
  }

  figure.overview * {
    transition: none;
    animation: none;
  }

  svg {
    /* The viewBox scales the diagram, including its local type scale. */
    --font-size-base: 16px;

    display: block;
    width: 100%;
    max-height: 64cqh;
    overflow: visible;
    font-family: var(--font-mono);
  }

  .block {
    opacity: 1;
    transition:
      opacity 360ms ease,
      transform 460ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .block.muted {
    opacity: 0.22;
  }

  .card {
    fill: var(--background);
    stroke: var(--border-prominent);
    stroke-width: var(--border-width);
    vector-effect: non-scaling-stroke;
    transition:
      fill 320ms ease,
      stroke 320ms ease;
  }

  .header {
    fill: var(--background-subtle);
    transition: fill 320ms ease;
  }

  .block.changed .card,
  .block.invalid .card {
    stroke: var(--accent);
  }

  .block.invalid {
    opacity: 0.48;
  }

  .block.changed .data,
  .block.changed .hash,
  .block.invalid .previous {
    fill: var(--accent);
  }

  .block.changed .hash-background,
  .block.invalid .hash-background,
  .block.recalculating .nonce-background,
  .block.recalculating .hash-background {
    fill: var(--accent-subtle);
  }

  .block.recalculating .nonce,
  .block.recalculating .hash {
    fill: var(--accent);
  }

  line {
    stroke: var(--border-subtle);
    stroke-width: var(--border-width);
    vector-effect: non-scaling-stroke;
  }

  .title,
  .label,
  .value,
  .rework {
    text-transform: uppercase;
  }

  .title {
    fill: var(--text-prominent);
    font-size: var(--heading-6-size);
    font-weight: var(--ui-weight);
    letter-spacing: var(--ui-letter-spacing);
  }

  .label {
    fill: var(--text-muted);
    font-size: var(--font-size-lg);
    letter-spacing: var(--ui-letter-spacing);
  }

  .label.inline {
    dominant-baseline: middle;
  }

  .value {
    fill: var(--text-primary);
    font-size: var(--heading-5-size);
    transition: fill 320ms ease;
  }

  .value.matching {
    fill: var(--accent);
  }

  .nonce-background,
  .hash-background {
    fill: var(--background-subtle);
    transition: fill 320ms ease;
  }

  .chain-link,
  .work-link {
    fill: none;
    stroke: var(--border-prominent);
    stroke-width: var(--border-width);
    vector-effect: non-scaling-stroke;
    transition:
      stroke 320ms ease,
      stroke-dashoffset 520ms ease;
  }

  .chain-link.active,
  .chain-link.broken,
  .chain-link.work,
  .work-link {
    stroke: var(--accent);
  }

  .chain-link.broken {
    stroke-dasharray: 5 7;
  }

  .chain-link.work {
    stroke-dasharray: 7 8;
    animation: flow 900ms linear infinite;
  }

  .arrow-head.muted {
    fill: var(--border-prominent);
  }

  .arrow-head.accent {
    fill: var(--accent);
  }

  .break,
  .rework {
    opacity: 0;
    transition:
      opacity 280ms ease,
      transform 360ms ease;
  }

  .break.visible,
  .rework.visible {
    opacity: 1;
  }

  .break circle {
    fill: var(--background);
    stroke: var(--accent);
    stroke-width: var(--border-width);
    vector-effect: non-scaling-stroke;
  }

  .break path {
    fill: none;
    stroke: var(--accent);
    stroke-linecap: round;
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
  }

  .rework > text {
    fill: var(--accent);
    font-size: var(--font-size-lg);
    letter-spacing: var(--ui-letter-spacing);
  }

  .work-step,
  .work-link {
    opacity: 0;
    transition:
      opacity 240ms ease,
      stroke-dashoffset 420ms ease;
  }

  .work-step circle {
    fill: var(--accent);
  }

  .work-step text {
    fill: var(--background);
    font-size: var(--font-size-lg);
    font-weight: var(--ui-weight);
  }

  .rework.visible .step-1 {
    opacity: 1;
    transition-delay: 80ms;
  }

  .rework.visible .work-link.first {
    opacity: 1;
    transition-delay: 300ms;
  }

  .rework.visible .step-2 {
    opacity: 1;
    transition-delay: 600ms;
  }

  .rework.visible .work-link.second {
    opacity: 1;
    transition-delay: 820ms;
  }

  .rework.visible .step-3 {
    opacity: 1;
    transition-delay: 1120ms;
  }

  figcaption {
    min-height: 2.8em;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: clamp(var(--font-size-lg), 1.35cqw, var(--heading-6-size));
    font-weight: var(--ui-weight);
    line-height: var(--ui-line-height);
    letter-spacing: var(--ui-letter-spacing);
    text-align: center;
  }

  @keyframes flow {
    to {
      stroke-dashoffset: -15;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .block,
    .card,
    .header,
    .value,
    .nonce-background,
    .hash-background,
    .chain-link,
    .break,
    .rework,
    .work-step,
    .work-link {
      transition: none;
    }

    .chain-link.work {
      animation: none;
    }
  }
</style>
