<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";

  const step = getStepContext();
  let phase = $derived(Math.max(0, Math.min($step, 3)));
</script>

<figure
  aria-label="Émission cumulée de bitcoins et réduction de la récompense par bloc au fil des halvings"
>
  <svg viewBox="0 0 1000 470" role="img">
    <title>Courbe d’émission cumulée du bitcoin</title>
    <desc>
      La courbe augmente rapidement au départ, puis sa pente est divisée par
      deux tous les 210 000 blocs et se rapproche d’un plafond d’environ 21
      millions de bitcoins.
    </desc>

    <g class="grid" aria-hidden="true">
      <line x1="82" y1="54" x2="960" y2="54" />
      <line x1="82" y1="202" x2="960" y2="202" />
      <line x1="82" y1="350" x2="960" y2="350" />
    </g>

    <g class="axes" aria-hidden="true">
      <line x1="82" y1="42" x2="82" y2="350" />
      <line x1="82" y1="350" x2="960" y2="350" />
      <text x="64" y="58" text-anchor="end">21 M</text>
      <text x="64" y="206" text-anchor="end">10,5 M</text>
      <text x="64" y="354" text-anchor="end">0</text>
      <text class="axis-label" x="82" y="26">BITCOINS ÉMIS</text>
    </g>

    <line
      class:visible={phase >= 3}
      class="cap"
      x1="82"
      y1="54"
      x2="960"
      y2="54"
      aria-hidden="true"
    />
    <text
      class:visible={phase >= 3}
      class="cap-label"
      x="945"
      y="42"
      text-anchor="end">PLAFOND ≈ 21 MILLIONS</text
    >

    <g class="guides" aria-hidden="true">
      <line class:visible={phase >= 1} x1="192" y1="54" x2="192" y2="350" />
      <line class:visible={phase >= 2} x1="302" y1="54" x2="302" y2="350" />
      <line class:visible={phase >= 2} x1="412" y1="54" x2="412" y2="350" />
      <line class:visible={phase >= 2} x1="522" y1="54" x2="522" y2="350" />
      <line class:visible={phase >= 3} x1="632" y1="54" x2="632" y2="350" />
      <line class:visible={phase >= 3} x1="742" y1="54" x2="742" y2="350" />
      <line class:visible={phase >= 3} x1="852" y1="54" x2="852" y2="350" />
    </g>

    <g class="curve" aria-hidden="true">
      <path class="segment visible" d="M82 350 L192 202" />
      <path class:visible={phase >= 1} class="segment" d="M192 202 L302 128" />
      <path
        class:visible={phase >= 2}
        class="segment"
        d="M302 128 L412 91 L522 72"
      />
      <path
        class:visible={phase >= 3}
        class="segment"
        d="M522 72 L632 63 L742 58.5 L852 56.2 L925 55.2"
      />
      <path class:visible={phase >= 3} class="tail" d="M925 55.2 L960 54.5" />
    </g>

    <g class="points" aria-hidden="true">
      <circle class="visible" cx="82" cy="350" r="6" />
      <circle class="visible" cx="192" cy="202" r="6" />
      <circle class:visible={phase >= 1} cx="302" cy="128" r="6" />
      <circle class:visible={phase >= 2} cx="412" cy="91" r="6" />
      <circle class:visible={phase >= 2} cx="522" cy="72" r="6" />
      <circle class:visible={phase >= 3} cx="632" cy="63" r="6" />
      <circle class:visible={phase >= 3} cx="742" cy="58.5" r="6" />
      <circle class:visible={phase >= 3} cx="852" cy="56.2" r="6" />
    </g>

    <g class="dates" aria-hidden="true">
      <text class="visible" x="82" y="376" text-anchor="middle">2009</text>
      <text class:visible={phase >= 1} x="192" y="376" text-anchor="middle"
        >2012</text
      >
      <text class:visible={phase >= 2} x="302" y="376" text-anchor="middle"
        >2016</text
      >
      <text class:visible={phase >= 2} x="412" y="376" text-anchor="middle"
        >2020</text
      >
      <text class:visible={phase >= 2} x="522" y="376" text-anchor="middle"
        >2024</text
      >
      <text class:visible={phase >= 3} x="632" y="376" text-anchor="middle"
        >≈ 2028</text
      >
      <text class:visible={phase >= 3} x="742" y="376" text-anchor="middle"
        >≈ 2032</text
      >
      <text class:visible={phase >= 3} x="958" y="376" text-anchor="end"
        >… ≈ 2140</text
      >
    </g>

    <g class="rewards" aria-hidden="true">
      <g class="reward visible">
        <text x="137" y="416" text-anchor="middle">50 BTC / BLOC</text>
      </g>
      <g class:visible={phase >= 1} class="reward">
        <text x="247" y="416" text-anchor="middle">25 BTC</text>
      </g>
      <g class:visible={phase >= 2} class="reward">
        <text x="357" y="416" text-anchor="middle">12,5 BTC</text>
      </g>
      <g class:visible={phase >= 2} class="reward">
        <text x="467" y="416" text-anchor="middle">6,25 BTC</text>
      </g>
      <g class:visible={phase >= 2} class="reward active">
        <text x="577" y="416" text-anchor="middle">3,125 BTC</text>
      </g>
      <g class:visible={phase >= 3} class="reward tail-reward">
        <text x="802" y="416" text-anchor="middle"
          >… PUIS DE MOINS EN MOINS</text
        >
      </g>
    </g>

    <g class:visible={phase >= 1} class="halving-label" aria-hidden="true">
      <rect x="133" y="107" width="118" height="35" />
      <text x="192" y="130" text-anchor="middle">HALVING</text>
    </g>
  </svg>
</figure>

<style>
  figure {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    background: var(--background);
    color: var(--text-primary);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  text {
    fill: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 15px;
    letter-spacing: var(--ui-letter-spacing);
  }

  .axis-label,
  .cap-label,
  .reward text,
  .halving-label text {
    font-size: 13px;
    font-weight: var(--ui-weight);
  }

  .grid line {
    stroke: var(--border-subtle);
    stroke-dasharray: 3 8;
    stroke-width: var(--border-width);
  }

  .axes line {
    stroke: var(--border-prominent);
    stroke-width: var(--border-width);
  }

  .guides line {
    opacity: 0;
    stroke: color-mix(in srgb, var(--accent), transparent 72%);
    stroke-dasharray: 2 7;
    stroke-width: var(--border-width);
    transition: opacity 260ms ease;
  }

  .cap {
    opacity: 0;
    stroke: var(--accent);
    stroke-dasharray: 8 7;
    stroke-width: 2;
    transition: opacity 280ms ease;
  }

  .cap-label {
    fill: var(--accent);
    opacity: 0;
    transition: opacity 280ms ease;
  }

  .segment,
  .tail {
    fill: none;
    opacity: 0;
    stroke: var(--accent);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 5;
    transition: opacity 260ms ease;
    vector-effect: non-scaling-stroke;
  }

  .tail {
    stroke-dasharray: 4 8;
  }

  .points circle {
    fill: var(--background);
    opacity: 0;
    stroke: var(--accent);
    stroke-width: 4;
    transition: opacity 260ms ease;
    vector-effect: non-scaling-stroke;
  }

  .dates text,
  .reward,
  .halving-label {
    opacity: 0;
    transition: opacity 260ms ease;
  }

  .reward text {
    fill: var(--text-primary);
  }

  .reward.active text {
    fill: var(--accent);
  }

  .halving-label rect {
    fill: var(--background);
    stroke: var(--accent);
    stroke-width: var(--border-width);
  }

  .halving-label text {
    fill: var(--accent);
  }

  .guides line.visible,
  .cap.visible,
  .cap-label.visible,
  .segment.visible,
  .tail.visible,
  .points circle.visible,
  .dates text.visible,
  .reward.visible,
  .halving-label.visible {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .guides line,
    .cap,
    .cap-label,
    .segment,
    .tail,
    .points circle,
    .dates text,
    .reward,
    .halving-label {
      transition: none;
    }
  }
</style>
