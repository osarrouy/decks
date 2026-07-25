<div
  class="anti-aircraft"
  role="img"
  aria-label="Une cible mobile suit une trajectoire. Un système mesure sa position, anticipe sa position future, émet une action, puis réintroduit l’écart observé pour corriger la prédiction suivante."
>
  <svg viewBox="0 0 1000 470" aria-hidden="true">
    <defs>
      <marker
        id="feedback-arrow"
        markerWidth="8"
        markerHeight="8"
        refX="7"
        refY="4"
        orient="auto"
      >
        <path d="M0 0 L8 4 L0 8 Z" class="arrow-head" />
      </marker>
    </defs>

    <path
      class="flight-path"
      d="M72 159 C230 101 392 132 520 101 C650 70 796 74 934 117"
    />

    <g class="moving-target">
      <path class="target-cross" d="M-11 0 L11 0 M0 -11 L0 11" />
      <circle class="target-center" cx="0" cy="0" r="2.5" />
      <animateMotion
        dur="9s"
        repeatCount="indefinite"
        path="M72 159 C230 101 392 132 520 101 C650 70 796 74 934 117"
      />
    </g>

    <g class="measurement">
      <path class="measurement-line" d="M232 383 L382 124" />
      <path class="sample-bracket" d="M363 118 L401 118 M382 99 L382 137" />
      <circle class="sample-ring ring-one" cx="382" cy="118" r="13" />
      <circle class="sample-ring ring-two" cx="382" cy="118" r="27" />
      <circle class="sample-dot dot-one" cx="368" cy="126" r="3.5" />
      <circle class="sample-dot dot-two" cx="386" cy="111" r="3" />
      <circle class="sample-dot dot-three" cx="397" cy="121" r="2.5" />
      <text class="scene-label measured-label" x="318" y="82">POSITION MESURÉE</text>
    </g>

    <g class="prediction">
      <path class="prediction-line" d="M382 118 C456 106 530 96 610 88" />
      <circle class="prediction-ring" cx="610" cy="88" r="21" />
      <path class="prediction-cross" d="M610 56 L610 120 M578 88 L642 88" />
      <text class="scene-label prediction-label" x="554" y="44">POSITION ANTICIPÉE</text>
    </g>

    <g class="correction-target">
      <circle cx="644" cy="96" r="7" />
      <path d="M620 96 L668 96" />
      <text class="scene-label" x="656" y="125">POSITION RÉELLE</text>
    </g>

    <path
      class="trajectory"
      d="M232 383 C338 250 465 154 610 88"
    />

    <g class="action-pulse">
      <circle cx="0" cy="0" r="5" />
      <path d="M-21 0 L-7 0" />
      <animateMotion
        dur="9s"
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints="0;0;0;1;1"
        keyTimes="0;0.42;0.46;0.65;1"
        path="M232 383 C338 250 465 154 610 88"
      />
    </g>

    <g class="action-arrival">
      <circle cx="610" cy="88" r="8" />
      <circle cx="610" cy="88" r="20" />
    </g>

    <path
      class="feedback"
      marker-end="url(#feedback-arrow)"
      d="M644 102 C720 180 698 300 588 346 C470 395 326 356 246 385"
    />
    <text class="scene-label feedback-label" x="547" y="365">ÉCART RÉINTRODUIT</text>

    <g class="system-node" transform="translate(232 383)">
      <circle r="23" />
      <path d="M-13 0 L13 0 M0 -13 L0 13" />
      <circle class="system-center" r="3" />
    </g>
    <text class="system-label" x="232" y="433" text-anchor="middle">SYSTÈME</text>
  </svg>

  <div class="cycle" aria-hidden="true">
    <span class="observe">observer</span>
    <span class="arrow">→</span>
    <span class="predict">anticiper</span>
    <span class="arrow">→</span>
    <span class="act">agir</span>
    <span class="arrow">→</span>
    <span class="correct">corriger</span>
    <span class="loop-arrow">↺</span>
  </div>
</div>

<style>
  .anti-aircraft {
    --cycle: 9s;
    --ink-soft: color-mix(in srgb, var(--fg), transparent 72%);
    --ink-faint: color-mix(in srgb, var(--fg), transparent 88%);

    display: grid;
    gap: clamp(0.45rem, 0.9vw, 0.85rem);
    width: 100%;
    min-height: 0;
  }

  svg {
    display: block;
    width: 100%;
    height: clamp(18rem, 45vh, 31rem);
    overflow: visible;
  }

  path,
  circle {
    vector-effect: non-scaling-stroke;
  }

  .flight-path {
    fill: none;
    stroke: var(--ink-faint);
    stroke-dasharray: 4 12;
    stroke-linecap: round;
    stroke-width: 1.3;
  }

  .moving-target {
    animation: target-visibility var(--cycle) linear infinite;
    color: var(--fg);
  }

  .target-cross {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-width: 1.4;
  }

  .target-center {
    fill: var(--accent);
    stroke: none;
  }

  .measurement {
    animation: measure-phase var(--cycle) linear infinite;
  }

  .measurement-line {
    fill: none;
    stroke: var(--accent);
    stroke-dasharray: 6 9;
    stroke-width: 1.5;
  }

  .sample-bracket,
  .sample-ring {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1.3;
  }

  .sample-ring {
    transform-box: fill-box;
    transform-origin: center;
  }

  .ring-one {
    animation: sample-pulse var(--cycle) ease-out infinite;
  }

  .ring-two {
    animation: sample-pulse var(--cycle) ease-out 180ms infinite;
  }

  .sample-dot {
    fill: color-mix(in srgb, var(--accent), white 45%);
    stroke: none;
  }

  .dot-one {
    animation: sample-noise-one var(--cycle) ease-in-out infinite;
  }

  .dot-two {
    animation: sample-noise-two var(--cycle) ease-in-out infinite;
  }

  .dot-three {
    animation: sample-noise-three var(--cycle) ease-in-out infinite;
  }

  .prediction {
    animation: prediction-phase var(--cycle) linear infinite;
  }

  .prediction-line,
  .prediction-cross,
  .prediction-ring {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1.5;
  }

  .prediction-line {
    stroke-dasharray: 220;
    stroke-dashoffset: 220;
    animation: draw-prediction var(--cycle) ease-in-out infinite;
  }

  .prediction-cross,
  .prediction-ring {
    stroke-dasharray: 4 6;
  }

  .prediction-ring {
    fill: color-mix(in srgb, var(--accent), transparent 94%);
  }

  .correction-target {
    animation: correction-target-phase var(--cycle) linear infinite;
  }

  .correction-target circle {
    fill: var(--bg);
    stroke: var(--fg);
    stroke-width: 1.5;
  }

  .correction-target path {
    fill: none;
    stroke: var(--fg);
    stroke-dasharray: 2 5;
    stroke-width: 1;
  }

  .trajectory {
    fill: none;
    stroke: color-mix(in srgb, var(--accent), transparent 30%);
    stroke-dasharray: 460;
    stroke-dashoffset: 460;
    stroke-width: 1.6;
    animation: draw-trajectory var(--cycle) ease-in-out infinite;
  }

  .action-pulse {
    animation: projectile-phase var(--cycle) linear infinite;
  }

  .action-pulse circle {
    fill: var(--accent);
    stroke: none;
  }

  .action-pulse path {
    fill: none;
    stroke: color-mix(in srgb, var(--accent), white 54%);
    stroke-linecap: round;
    stroke-width: 3;
  }

  .action-arrival {
    animation: impact-phase var(--cycle) ease-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  .action-arrival circle {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1.5;
  }

  .feedback {
    fill: none;
    stroke: var(--accent);
    stroke-dasharray: 9 10;
    stroke-dashoffset: 150;
    stroke-width: 1.5;
    animation: feedback-phase var(--cycle) ease-in-out infinite;
  }

  .arrow-head {
    fill: var(--accent);
  }

  .scene-label,
  .system-label {
    fill: var(--muted);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.12em;
  }

  .measured-label {
    animation: measure-phase var(--cycle) linear infinite;
  }

  .prediction-label {
    animation: prediction-phase var(--cycle) linear infinite;
  }

  .feedback-label {
    animation: feedback-label-phase var(--cycle) linear infinite;
  }

  .system-node circle,
  .system-node path {
    fill: none;
    stroke: var(--fg);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.4;
  }

  .system-node>circle:first-child {
    fill: var(--bg);
  }

  .system-node .system-center {
    fill: var(--accent);
    stroke: none;
  }

  .cycle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0.55rem, 1.4vw, 1.5rem);
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: clamp(0.72rem, 0.95vw, 1rem);
    font-weight: 350;
    letter-spacing: 0.13em;
    line-height: 1;
    text-transform: uppercase;
  }

  .cycle span:not(.arrow, .loop-arrow) {
    transition: color 180ms linear;
  }

  .cycle .arrow,
  .cycle .loop-arrow {
    color: color-mix(in srgb, var(--muted), transparent 38%);
  }

  .observe {
    animation: observe-word var(--cycle) linear infinite;
  }

  .predict {
    animation: predict-word var(--cycle) linear infinite;
  }

  .act {
    animation: act-word var(--cycle) linear infinite;
  }

  .correct {
    animation: correct-word var(--cycle) linear infinite;
  }

  .loop-arrow {
    display: inline-block;
    animation: loop-word var(--cycle) linear infinite;
  }

  @keyframes target-visibility {
    0%,
    4%,
    96%,
    100% {
      opacity: 0;
    }
    9%,
    91% {
      opacity: 1;
    }
  }

  @keyframes measure-phase {
    0%,
    8%,
    34%,
    100% {
      opacity: 0;
    }
    13%,
    29% {
      opacity: 1;
    }
  }

  @keyframes sample-pulse {
    0%,
    11% {
      opacity: 0;
      transform: scale(0.45);
    }
    18% {
      opacity: 0.9;
    }
    31% {
      opacity: 0;
      transform: scale(1.5);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }

  @keyframes sample-noise-one {
    0%,
    12%,
    33%,
    100% {
      opacity: 0;
      transform: translate(0, 0);
    }
    18%,
    28% {
      opacity: 0.9;
      transform: translate(4px, -3px);
    }
  }

  @keyframes sample-noise-two {
    0%,
    12%,
    33%,
    100% {
      opacity: 0;
      transform: translate(0, 0);
    }
    18%,
    28% {
      opacity: 0.75;
      transform: translate(-4px, 2px);
    }
  }

  @keyframes sample-noise-three {
    0%,
    12%,
    33%,
    100% {
      opacity: 0;
      transform: translate(0, 0);
    }
    18%,
    28% {
      opacity: 0.6;
      transform: translate(2px, 5px);
    }
  }

  @keyframes prediction-phase {
    0%,
    24%,
    55%,
    100% {
      opacity: 0;
    }
    31%,
    50% {
      opacity: 1;
    }
  }

  @keyframes draw-prediction {
    0%,
    27% {
      stroke-dashoffset: 220;
    }
    40%,
    52% {
      stroke-dashoffset: 0;
    }
    56%,
    100% {
      stroke-dashoffset: -220;
    }
  }

  @keyframes draw-trajectory {
    0%,
    41% {
      opacity: 0;
      stroke-dashoffset: 460;
    }
    46% {
      opacity: 0.85;
    }
    64% {
      opacity: 0.85;
      stroke-dashoffset: 0;
    }
    69%,
    100% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
  }

  @keyframes projectile-phase {
    0%,
    44%,
    66%,
    100% {
      opacity: 0;
    }
    47%,
    63% {
      opacity: 1;
    }
  }

  @keyframes impact-phase {
    0%,
    62% {
      opacity: 0;
      transform: scale(0.4);
    }
    67% {
      opacity: 1;
    }
    75%,
    100% {
      opacity: 0;
      transform: scale(1.8);
    }
  }

  @keyframes correction-target-phase {
    0%,
    63%,
    89%,
    100% {
      opacity: 0;
    }
    69%,
    84% {
      opacity: 0.72;
    }
  }

  @keyframes feedback-phase {
    0%,
    66% {
      opacity: 0;
      stroke-dashoffset: 150;
    }
    72% {
      opacity: 0.9;
    }
    87% {
      opacity: 0.9;
      stroke-dashoffset: 0;
    }
    92%,
    100% {
      opacity: 0;
      stroke-dashoffset: 0;
    }
  }

  @keyframes feedback-label-phase {
    0%,
    69%,
    89%,
    100% {
      opacity: 0;
    }
    75%,
    85% {
      opacity: 1;
    }
  }

  @keyframes observe-word {
    0%,
    8%,
    32%,
    100% {
      color: var(--muted);
    }
    13%,
    27% {
      color: var(--accent);
    }
  }

  @keyframes predict-word {
    0%,
    25%,
    54%,
    100% {
      color: var(--muted);
    }
    32%,
    49% {
      color: var(--accent);
    }
  }

  @keyframes act-word {
    0%,
    46%,
    69%,
    100% {
      color: var(--muted);
    }
    52%,
    64% {
      color: var(--accent);
    }
  }

  @keyframes correct-word {
    0%,
    65%,
    92%,
    100% {
      color: var(--muted);
    }
    72%,
    87% {
      color: var(--accent);
    }
  }

  @keyframes loop-word {
    0%,
    69%,
    92%,
    100% {
      color: var(--muted);
      transform: rotate(0);
    }
    76%,
    87% {
      color: var(--accent);
      transform: rotate(-180deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .anti-aircraft *,
    .anti-aircraft *::before,
    .anti-aircraft *::after {
      animation: none !important;
    }

    .measurement,
    .prediction,
    .correction-target,
    .trajectory,
    .feedback,
    .feedback-label {
      opacity: 0.72;
    }

    .action-pulse,
    .action-arrival {
      opacity: 0;
    }

    .prediction-line,
    .trajectory,
    .feedback {
      stroke-dashoffset: 0;
    }

    .cycle .observe {
      color: var(--accent);
    }
  }
</style>
