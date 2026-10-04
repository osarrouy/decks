<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";

  const step = getStepContext();
  let publishFirst = $derived($step >= 1);
  const selected = [0, 18, 36, 54, 72, 90, 108, 126, 144];
  const contents = Array.from({ length: 168 }, (_, index) => ({
    index,
    rank: selected.indexOf(index),
    sourceX: 28 + (index % 14) * 25,
    sourceY: 176 + Math.floor(index / 14) * 24,
    publicX: 560 + (index % 21) * 22,
    publicY: 184 + Math.floor(index / 21) * 34,
  }));
</script>

<figure data-mode={publishFirst ? "publish-first" : "filter-first"}>
  <svg
    viewBox="0 0 1420 600"
    role="img"
    aria-label={publishFirst
      ? "Publier, puis filtrer : une multitude de contenus publics se partage une visibilité limitée."
      : "Filtrer, puis publier : seuls quelques contenus sélectionnés accèdent à la publication et à l’audience d’un média."}
  >
    <title
      >{publishFirst ? "Publish, then filter" : "Filter, then publish"}</title
    >
    <desc>
      Le filtre se déplace de l’accès à la publication vers la mise en
      visibilité. Les vignettes grises restent publiques dans le second état,
      même lorsqu’elles sont peu vues. Les quantités sont illustratives.
    </desc>

    <text class="heading" x="710" y="64" text-anchor="middle">
      {publishFirst ? "Publish, then filter" : "Filter, then publish"}
    </text>
    <g class="labels" text-anchor="middle">
      <text x="195" y="136">Produire</text>
      <text x="790" y="136">Publier</text>
      <text x="1250" y="136">Être vu</text>
    </g>

    <g class="sources" aria-hidden="true">
      {#each contents as content (content.index)}
        <rect x={content.sourceX} y={content.sourceY} width="18" height="17" />
      {/each}
    </g>

    <g class="arrows" aria-hidden="true">
      <path d="M 402 318 H 540 M 530 309 L 540 318 L 530 327" />
      <path d="M 1040 318 H 1150 M 1140 309 L 1150 318 L 1140 327" />
    </g>

    <g aria-hidden="true">
      {#each contents as content (content.index)}
        <g
          class="content"
          class:selected={content.rank >= 0}
          style:opacity={publishFirst || content.rank >= 0 ? 1 : 0}
          style:transform={publishFirst
            ? `translate(${content.publicX}px, ${content.publicY}px) scale(0.75)`
            : content.rank >= 0
              ? `translate(${660 + (content.rank % 3) * 86}px, ${198 + Math.floor(content.rank / 3) * 84}px) scale(2)`
              : `translate(${content.sourceX}px, ${content.sourceY}px) scale(0.75)`}
        >
          <rect width="24" height="32" />
          <path d="M 5 8 H 19 M 5 13 H 19 M 5 18 H 14" />
        </g>
      {/each}
    </g>

    <g class="audience" aria-hidden="true">
      {#each selected as _, index}
        <g
          transform={`translate(${1180 + (index % 3) * 50}, ${236 + Math.floor(index / 3) * 64})`}
        >
          <rect width="32" height="42" />
          <path d="M 7 12 H 25 M 7 19 H 25 M 7 26 H 19" />
        </g>
      {/each}
    </g>

    <g
      class="filter"
      style:transform={`translate(${publishFirst ? 1090 : 470}px, 318px)`}
      aria-hidden="true"
    >
      <path d="M -34 -128 L 12 -34 H 34 M -34 128 L 12 34 H 34" />
      <text y="-146" text-anchor="middle">Filtrer</text>
    </g>

    <g class="captions" text-anchor="middle">
      <text x="790" y="488">
        {publishFirst
          ? "Une multitude de contenus publics"
          : "Peu de contenus publiés"}
      </text>
      <text x="1250" y="488">Visibilité limitée</text>
    </g>
    <text class="scarcity" x="710" y="560" text-anchor="middle">
      {publishFirst ? "Rareté : visibilité" : "Rareté : accès à la publication"}
    </text>
  </svg>
</figure>

<style>
  figure {
    width: min(100%, calc(100cqh * 1420 / 600));
    margin: 0;
    color: var(--text-prominent);
  }

  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  text {
    fill: currentColor;
    font-family: var(--font-sans);
    font-size: 24px;
  }

  .heading {
    font-family: var(--font-serif);
    font-size: 48px;
  }

  .labels text,
  .scarcity,
  .filter text {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .sources rect {
    fill: color-mix(in srgb, var(--text-muted) 24%, transparent);
  }

  .arrows {
    fill: none;
    stroke: var(--border-prominent);
    stroke-width: 1;
  }

  .content {
    transition:
      transform 900ms ease-in-out,
      opacity 600ms ease-in-out;
  }

  .content rect {
    fill: color-mix(in srgb, var(--text-muted) 16%, transparent);
    stroke: color-mix(in srgb, var(--text-muted) 45%, transparent);
    stroke-width: 0.7;
  }

  .content path {
    fill: none;
    stroke: var(--text-muted);
    stroke-width: 0.7;
  }

  .selected rect,
  .audience rect {
    fill: color-mix(in srgb, var(--accent) 14%, var(--background));
    stroke: var(--accent);
  }

  .selected path,
  .audience path {
    fill: none;
    stroke: var(--accent);
  }

  .audience rect,
  .audience path {
    stroke-width: 1;
  }

  .filter {
    color: var(--accent);
    transition: transform 900ms ease-in-out;
  }

  .filter path {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
  }

  .captions text {
    fill: var(--text-muted);
  }

  .scarcity {
    fill: var(--accent);
    font-size: 28px;
  }

  @media (prefers-reduced-motion: reduce) {
    .content,
    .filter {
      transition: none;
    }
  }
</style>
