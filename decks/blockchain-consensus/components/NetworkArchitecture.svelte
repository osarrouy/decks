<script lang="ts">
  import { cubicInOut } from "svelte/easing";
  import { prefersReducedMotion, Tween } from "svelte/motion";
  import { getStepContext } from "@svx-deck/core/deck/stepContext";

  const step = getStepContext();
  const distributed = $derived($step >= 1);
  const morph = Tween.of(() => (distributed ? 1 : 0), {
    duration: () => (prefersReducedMotion.current ? 0 : 1000),
    easing: cubicInOut,
  });

  const central = [
    [500, 280],
    [280, 150],
    [710, 150],
    [810, 300],
    [710, 440],
    [280, 440],
    [180, 300],
  ];
  const peers = [
    [495, 125],
    [255, 185],
    [730, 175],
    [815, 365],
    [540, 465],
    [220, 395],
    [475, 310],
  ];
  const links = [
    [0, 1],
    [0, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 1],
    [0, 6],
    [1, 6],
    [2, 6],
    [4, 6],
    [5, 6],
  ];

  function mix(from: number, to: number) {
    return from + (to - from) * morph.current;
  }

  const nodes = $derived(
    central.map(([x, y], i) => ({
      x: mix(x, peers[i][0]),
      y: mix(y, peers[i][1]),
    })),
  );
  const edges = $derived(
    links.map(([a, b], i) => {
      const client = central[(i % 6) + 1];
      const x1 = mix(central[0][0], peers[a][0]);
      const y1 = mix(central[0][1], peers[a][1]);
      const x2 = mix(client[0], peers[b][0]);
      const y2 = mix(client[1], peers[b][1]);
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }),
  );
</script>

<figure data-network={distributed ? "distributed" : "centralized"}>
  <svg viewBox="0 0 1000 550" role="img">
    <title>
      {distributed
        ? "Réseau distribué pair-à-pair"
        : "Architecture client–serveur centralisée"}
    </title>
    <desc>
      {distributed
        ? "Les nœuds échangent de proche en proche. Chacun conserve une copie du registre, sans serveur central."
        : "Six clients communiquent avec un serveur central qui conserve le registre."}
    </desc>

    <g aria-hidden="true">
      <text class="heading" x="500" y="42" text-anchor="middle">
        {distributed ? "Réseau distribué" : "Client–serveur"}
      </text>

      {#each edges as path, i}
        <g opacity={i < 6 ? 1 : morph.current}>
          <path class="link" d={path} />
          <path
            class="signal"
            d={path}
            pathLength="100"
            style:animation-delay={`${-i * 0.37}s`}
          />
        </g>
      {/each}

      {#each nodes as node, i}
        <g class="node" transform={`translate(${node.x} ${node.y})`}>
          <circle class="surface" r={i === 0 ? mix(46, 34) : 34} />
          <circle
            class="accent"
            r={i === 0 ? mix(46, 34) : 34}
            opacity={i === 0 ? 1 : morph.current}
          />

          {#if i !== 0}
            <g class="icon client" opacity={1 - morph.current}>
              <rect x="-15" y="-12" width="30" height="21" rx="3" />
              <path d="M 0 9 V 15 M -9 15 H 9" />
            </g>
          {/if}

          <g class="icon ledger" opacity={i === 0 ? 1 : morph.current}>
            <rect x="-13" y="-17" width="26" height="34" rx="3" />
            <path d="M -6 -8 H 6 M -6 0 H 6 M -6 8 H 6" />
          </g>

          {#if i === 0}
            <text class="label" y="78" opacity={1 - morph.current}>Serveur</text
            >
          {:else if i === 1}
            <text class="label" y="61">{distributed ? "Nœud" : "Client"}</text>
          {/if}
        </g>
      {/each}
    </g>
  </svg>
</figure>

<style>
  figure {
    width: 100%;
    margin: 0;
  }

  svg {
    display: block;
    width: 100%;
    max-height: 72cqh;
    overflow: visible;
  }

  .heading {
    fill: var(--text-prominent);
    font-family: var(--font-serif);
    font-size: 42px;
    font-weight: var(--heading-weight);
  }

  .link {
    fill: none;
    stroke: var(--border-prominent);
    stroke-width: 2;
  }

  .signal {
    fill: none;
    stroke: var(--accent);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 0.7 99.3;
    animation: circulate 3.4s linear infinite;
  }

  .surface {
    fill: var(--background);
    stroke: var(--text-muted);
    stroke-width: 1.5;
  }

  .accent {
    fill: var(--accent-subtle);
    stroke: var(--accent);
    stroke-width: 2;
  }

  .icon {
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .client {
    stroke: var(--text-muted);
  }

  .ledger {
    stroke: var(--accent);
  }

  .label {
    fill: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 19px;
    text-anchor: middle;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  @keyframes circulate {
    to {
      stroke-dashoffset: -100;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .signal {
      animation: none;
      display: none;
    }
  }
</style>
