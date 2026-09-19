<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";

  const messages = [
    "Un historique est partagé par tous les nœuds.",
    "Deux blocs valides arrivent presque simultanément : la chaîne diverge.",
    "Une branche reçoit un bloc supplémentaire.",
    "À difficulté égale, les nœuds suivent la plus longue chaîne valide.",
  ];

  const step = getStepContext();
  let phase = $derived(Math.min($step, messages.length - 1));
</script>

<figure
  data-phase={phase}
  aria-label="Choix entre deux branches valides à difficulté de production égale"
>
  <svg viewBox="0 0 760 390" role="img" aria-hidden="true">
    <defs>
      <symbol id="block" viewBox="0 0 54 64">
        <polygon class="top" points="3,18 27,3 51,18 27,33"></polygon>
        <polygon class="left" points="3,18 27,33 27,61 3,46"></polygon>
        <polygon class="right" points="27,33 51,18 51,46 27,61"></polygon>
      </symbol>
    </defs>

    <path class="link shared" d="M 18 195 H 205"></path>
    <use href="#block" x="185" y="163" width="54" height="64"></use>

    <g class:chosen={phase >= 3} class="decision">
      <rect
        class="rejected-area"
        x="304"
        y="226"
        width="410"
        height="108"
        rx="14"
      ></rect>
    </g>

    <g class:visible={phase >= 1} class="fork">
      <g class:chosen={phase >= 3} class="upper-branch">
        <path class="link" d="M 232 195 L 350 112 H 500"></path>
        <use href="#block" x="325" y="80" width="54" height="64"></use>
        <use href="#block" x="475" y="80" width="54" height="64"></use>
      </g>
      <g class:orphaned={phase >= 3} class="lower-branch">
        <path class="link" d="M 232 195 L 350 278 H 500"></path>
        <use href="#block" x="325" y="246" width="54" height="64"></use>
        <use href="#block" x="475" y="246" width="54" height="64"></use>
      </g>
    </g>

    <g class:visible={phase >= 2} class="extension">
      <path class="link" d="M 525 112 H 650"></path>
      <use href="#block" x="625" y="80" width="54" height="64"></use>
    </g>

    <g class:chosen={phase >= 3} class="decision">
      <text class="branch-label accepted" x="350" y="60">3 blocs</text>
      <g transform="translate(-300 0)">
        <circle class="status accepted" cx="690" cy="112" r="18"></circle>
        <path class="tick" d="m 681 112 7 7 13-16"></path>
      </g>
      <g transform="translate(-150 0)">
        <circle class="status accepted" cx="690" cy="112" r="18"></circle>
        <path class="tick" d="m 681 112 7 7 13-16"></path>
      </g>
      <circle class="status accepted" cx="690" cy="112" r="18"></circle>
      <path class="tick" d="m 681 112 7 7 13-16"></path>

      <text class="branch-label rejected" x="350" y="356"
        >2 blocs · branche écartée</text
      >
      <circle class="status rejected" cx="690" cy="278" r="18"></circle>
      <path class="cross" d="m 682 270 16 16 m 0-16-16 16"></path>
    </g>
  </svg>

  <figcaption>{messages[phase]}</figcaption>
</figure>

<style>
  figure {
    display: grid;
    width: 100%;
    margin: 0;
    gap: var(--space-4);
  }

  svg {
    display: block;
    width: 100%;
    max-height: 62cqh;
    overflow: visible;
  }

  .link {
    fill: none;
    stroke: var(--border-prominent);
    stroke-width: var(--border-width);
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .top {
    fill: var(--accent);
  }

  .left {
    fill: color-mix(in srgb, var(--accent), var(--text-prominent) 24%);
  }

  .right {
    fill: color-mix(in srgb, var(--accent), var(--text-prominent) 48%);
  }

  .fork,
  .extension {
    opacity: 0;
    transform: translateY(5px);
    transition:
      opacity 420ms ease,
      transform 420ms ease;
  }

  .fork.visible,
  .extension.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .lower-branch {
    transition: opacity 360ms ease;
  }

  .upper-branch .link {
    transition: stroke 360ms ease;
  }

  .upper-branch.chosen .link,
  .extension.visible .link {
    stroke: var(--accent);
  }

  .lower-branch.orphaned {
    opacity: 0.35;
  }

  .decision {
    opacity: 0;
    transition: opacity 360ms ease;
  }

  .decision.chosen {
    opacity: 1;
  }

  .status.accepted {
    fill: var(--accent);
  }

  .status.rejected,
  .rejected-area {
    fill: var(--background-subtle);
    stroke: var(--text-muted);
    stroke-width: var(--border-width);
    vector-effect: non-scaling-stroke;
  }

  .tick {
    fill: none;
    stroke: var(--background);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .cross {
    fill: none;
    stroke: var(--text-muted);
    stroke-width: 3;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }

  .branch-label {
    font-family: var(--font-mono);
    font-size: var(--font-size-lg);
    font-weight: var(--ui-weight);
    letter-spacing: var(--ui-letter-spacing);
    text-transform: uppercase;
  }

  .branch-label.accepted {
    fill: var(--accent);
  }

  .branch-label.rejected {
    fill: var(--text-muted);
  }

  figcaption {
    min-height: 2.8em;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: clamp(var(--font-size-lg), 1.45cqw, var(--heading-6-size));
    font-weight: var(--ui-weight);
    line-height: var(--ui-line-height);
    letter-spacing: var(--ui-letter-spacing);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .fork,
    .extension,
    .decision,
    .lower-branch {
      transition: none;
    }
  }
</style>
