<script lang="ts">
  import { getStepContext } from '@svx-slides/core/deck/stepContext'

  const step = getStepContext()
</script>

<div class="bio-neuron" aria-label="Fonctionnement schématique d’un neurone biologique">
  <div class="diagram">
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-label="Fonctionnement d’un neurone, puis recul révélant le réseau neuronal qui l’entoure"
    >
      <defs>
        <g id="context-neuron">
          <path
            class="context-dendrites"
            d="M-27 0 C-43 -8 -57 -20 -75 -29 M-51 -14 C-61 -4 -69 7 -73 20 M-49 -12 C-61 -29 -70 -43 -75 -57 M-28 2 C-45 10 -58 20 -72 35 M-51 16 C-61 31 -65 44 -65 58"
          />
          <path
            class="context-soma"
            d="M-28 0 C-28 -17 -17 -28 0 -29 C17 -30 29 -17 29 0 C29 18 17 29 0 29 C-17 29 -28 17 -28 0 Z"
          />
          <ellipse class="context-nucleus" cx="0" cy="0" rx="8" ry="9" />
          <path
            class="context-axon"
            d="M29 0 C55 -3 82 4 109 0 C124 -2 136 -8 148 -16 M148 -16 C165 -26 181 -39 197 -51 M148 -16 C166 -8 181 3 197 17"
          />
        </g>
      </defs>

      <g class="neural-scene" data-overview={$step >= 6}>
        <g class="network-context" data-visible={$step >= 6} aria-hidden="true">
          <path class="context-link" d="M-15 35 C-6 35 1 35 8 35" />
          <path class="context-link" d="M-20 130 C-8 130 0 130 8 130" />
          <path class="context-link" d="M-16 316 C-5 320 4 329 10 334" />
          <path class="context-link" d="M718 64 C733 68 748 76 764 83" />
          <path class="context-link" d="M718 168 C738 173 757 179 777 181" />
          <path class="context-link" d="M718 297 C738 309 757 330 775 351" />
          <path class="context-link faint" d="M165 -43 C197 6 216 55 242 110" />
          <path class="context-link faint" d="M687 -35 C650 8 621 48 594 91" />
          <path class="context-link faint" d="M433 411 C400 357 370 300 337 241" />

          <use href="#context-neuron" transform="translate(-112 35) scale(0.66)" />
          <use href="#context-neuron" transform="translate(-109 130) scale(0.61)" />
          <use href="#context-neuron" transform="translate(-111 315) rotate(7) scale(0.65)" />
          <use href="#context-neuron" transform="translate(130 -91) rotate(30) scale(0.72)" />
          <use href="#context-neuron" transform="translate(373 -93) rotate(88) scale(0.68)" />
          <use href="#context-neuron" transform="translate(833 -47) rotate(166) scale(0.7)" />
          <use href="#context-neuron" transform="translate(822 84) scale(0.72)" />
          <use href="#context-neuron" transform="translate(840 181) scale(0.72)" />
          <use href="#context-neuron" transform="translate(824 356) rotate(-8) scale(0.72)" />
          <use href="#context-neuron" transform="translate(586 449) rotate(-72) scale(0.68)" />
          <use href="#context-neuron" transform="translate(300 451) rotate(-103) scale(0.68)" />
          <use href="#context-neuron" transform="translate(38 432) rotate(-28) scale(0.7)" />
        </g>

        <g class="focal-neuron">
      <g class="synaptic-inputs" data-active={$step >= 1}>
        <path class="input-fibre" d="M8 35 C25 34 39 47 49 47" />
        <path class="input-fibre" d="M8 130 C24 130 36 130 46 130" />
        <path class="input-fibre" d="M10 334 C26 330 38 313 48 313" />

        <circle class="bouton" cx="54" cy="47" r="5" />
        <circle class="bouton" cx="51" cy="130" r="5" />
        <circle class="bouton" cx="53" cy="313" r="5" />

        <circle class="transmitter" cx="61" cy="48" r="1.8" />
        <circle class="transmitter" cx="64" cy="49" r="1.4" />
        <circle class="transmitter" cx="58" cy="130" r="1.8" />
        <circle class="transmitter" cx="61" cy="130" r="1.4" />
        <circle class="transmitter" cx="60" cy="311" r="1.8" />
        <circle class="transmitter" cx="63" cy="309" r="1.4" />
      </g>

      <g class="synapse-callout" data-visible={$step >= 1}>
        <path d="M55 55 C51 63 45 69 37 74" />
        <text x="12" y="84">synapse</text>
      </g>

      <g class="dendrites" data-active={$step >= 1}>
        <path class="primary" d="M253 146 C227 130 200 111 170 94" />
        <path class="secondary" d="M170 94 C151 82 134 72 118 65" />
        <path class="secondary" d="M118 65 C99 57 83 52 69 50" />
        <path class="secondary" d="M170 94 C149 72 143 49 145 24" />
        <path class="secondary" d="M170 94 C148 97 129 102 111 110" />
        <path class="secondary" d="M111 110 C92 108 76 110 62 116" />
        <path class="tertiary" d="M118 65 C99 47 82 34 60 25" />
        <path class="tertiary" d="M118 65 C102 71 90 80 80 94" />

        <path class="primary" d="M241 176 C213 171 185 159 154 146" />
        <path class="secondary" d="M154 146 C136 140 119 134 103 132" />
        <path class="secondary" d="M103 132 C87 130 75 130 65 130" />
        <path class="secondary" d="M154 146 C137 153 123 160 112 166" />
        <path class="secondary" d="M112 166 C99 172 89 179 82 186" />
        <path class="secondary" d="M154 146 C139 126 128 109 124 91" />
        <path class="tertiary" d="M103 132 C87 143 72 154 57 164" />
        <path class="tertiary" d="M112 166 C92 168 74 170 57 178" />
        <path class="tertiary" d="M112 166 C92 177 76 190 62 204" />

        <path class="primary" d="M248 209 C220 220 192 233 157 247" />
        <path class="secondary" d="M157 247 C140 254 125 261 112 267" />
        <path class="secondary" d="M112 267 C94 277 82 287 74 298" />
        <path class="secondary" d="M74 298 C70 302 67 305 66 308" />
        <path class="secondary" d="M157 247 C141 244 126 242 113 240" />
        <path class="secondary" d="M113 240 C97 238 85 238 76 238" />
        <path class="secondary" d="M157 247 C149 260 143 271 137 279" />
        <path class="secondary" d="M137 279 C131 291 128 302 127 312" />
        <path class="tertiary" d="M112 267 C92 266 75 271 59 281" />
        <path class="tertiary" d="M74 298 C84 307 90 318 92 331" />
        <path class="tertiary" d="M113 240 C104 226 94 217 82 211" />
        <path class="tertiary" d="M137 279 C153 291 163 305 168 323" />
      </g>

      <g class="dendritic-signals" data-visible={$step >= 2}>
        <path d="M69 50 C83 52 99 57 118 65 C134 72 151 82 170 94 C200 111 227 130 253 146" />
        <path d="M65 130 C75 130 87 130 103 132 C119 134 136 140 154 146 C185 159 213 171 241 176" />
        <path d="M66 308 C67 305 70 302 74 298 C82 287 94 277 112 267 C125 261 140 254 157 247 C192 233 220 220 248 209" />
      </g>

      <g class="axon" data-active={$step >= 4}>
        <path class="primary" d="M346 179 C389 177 434 184 480 180 C504 178 522 173 538 164" />
        <path class="secondary" d="M538 164 C576 143 608 120 648 108" />
        <path class="secondary" d="M538 164 C576 179 610 211 648 247" />
      </g>

      <g class="axonal-signals" data-visible={$step >= 4}>
        <path d="M346 179 C389 177 434 184 480 180 C504 178 522 173 538 164" />
        <path d="M538 164 C576 143 608 120 648 108 C663 99 672 84 679 74" />
        <path d="M648 108 C665 121 676 139 681 155" />
        <path d="M538 164 C576 179 610 211 648 247 C662 258 674 273 681 286" />
      </g>

      <g class="cell-body" data-threshold={$step >= 3}>
        <path
          class="soma"
          d="M241 177 C240 150 253 128 276 118 C300 108 327 116 342 137 C357 158 356 185 345 207 C333 231 307 244 281 239 C258 235 242 211 241 177 Z"
        />
        <ellipse class="nucleus" cx="293" cy="178" rx="17" ry="19" />
      </g>

      <g class="terminals" data-visible={$step >= 5}>
        <path class="terminal-fibre" d="M648 108 C663 99 672 84 679 74" />
        <path class="terminal-fibre" d="M648 108 C665 121 676 139 681 155" />
        <path class="terminal-fibre" d="M648 247 C662 258 674 273 681 286" />

        <path class="receiving-fibre" d="M701 74 C708 72 713 68 718 64" />
        <path class="receiving-fibre" d="M703 155 C709 157 714 162 718 168" />
        <path class="receiving-fibre" d="M703 286 C709 288 714 292 718 297" />

        <circle class="bouton" cx="684" cy="74" r="5" />
        <circle class="bouton" cx="686" cy="155" r="5" />
        <circle class="bouton" cx="686" cy="286" r="5" />

        <circle class="transmitter" cx="692" cy="74" r="1.8" />
        <circle class="transmitter" cx="696" cy="74" r="1.4" />
        <circle class="transmitter" cx="694" cy="155" r="1.8" />
        <circle class="transmitter" cx="698" cy="155" r="1.4" />
        <circle class="transmitter" cx="694" cy="286" r="1.8" />
        <circle class="transmitter" cx="698" cy="286" r="1.4" />
      </g>
        </g>
      </g>
    </svg>

  </div>

  <ol class="steps">
    <li data-active={$step >= 1}>
      <span>01</span>
      <p>Les boutons synaptiques libèrent des neurotransmetteurs dans une fine fente.</p>
    </li>
    <li data-active={$step >= 2}>
      <span>02</span>
      <p>Chaque entrée modifie localement le potentiel de membrane.</p>
    </li>
    <li data-active={$step >= 3}>
      <span>03</span>
      <p>Le soma intègre excitations et inhibitions dans le temps.</p>
    </li>
    <li data-active={$step >= 4}>
      <span>04</span>
      <p>Si le seuil est atteint, un potentiel d’action parcourt l’axone.</p>
    </li>
    <li data-active={$step >= 5}>
      <span>05</span>
      <p>Aux terminaisons, le signal redevient chimique et affecte d’autres neurones.</p>
    </li>
    <li data-active={$step >= 6}>
      <span>06</span>
      <p>Un réseau plastique peut apprendre et produire des activités complexes.</p>
    </li>
  </ol>
</div>

<style>
  .bio-neuron {
    --neuron-bleed: clamp(1rem, 3.5vw, 4rem);

    display: grid;
    gap: clamp(0.7rem, 1.2vw, 1.2rem);
    width: calc(100% + var(--neuron-bleed) + var(--neuron-bleed));
    margin-inline: calc(0px - var(--neuron-bleed));
  }

  .diagram {
    position: relative;
    min-height: min(50vh, 31rem);
    overflow: visible;
  }

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .neural-scene {
    transform-box: view-box;
    transform-origin: center;
    transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .neural-scene[data-overview='true'] {
    transform: scale(0.56);
  }

  .network-context {
    opacity: 0;
    transition: opacity 520ms ease 180ms;
  }

  .network-context[data-visible='true'] {
    opacity: 0.58;
  }

  .network-context .context-link,
  :global(.context-dendrites),
  :global(.context-axon),
  :global(.context-soma),
  :global(.context-nucleus) {
    stroke: color-mix(in srgb, var(--muted), transparent 24%);
  }

  .network-context .context-link {
    stroke-width: 1.35;
  }

  .network-context .context-link.faint {
    opacity: 0.5;
  }

  :global(.context-dendrites),
  :global(.context-axon) {
    stroke-width: 1.55;
  }

  :global(.context-soma) {
    fill: var(--bg);
    stroke-width: 1.8;
  }

  :global(.context-nucleus) {
    fill: color-mix(in srgb, var(--bg), var(--fg) 7%);
    stroke-width: 1.2;
  }

  path,
  circle,
  ellipse {
    fill: none;
    stroke: var(--muted);
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
    transition:
      stroke 240ms ease,
      opacity 240ms ease,
      transform 240ms ease;
  }

  .dendrites,
  .axon,
  .synaptic-inputs,
  .synapse-callout,
  .terminals {
    opacity: 0.32;
    transition: opacity 240ms ease;
  }

  .dendrites[data-active='true'],
  .axon[data-active='true'],
  .synaptic-inputs[data-active='true'],
  .synapse-callout[data-visible='true'],
  .terminals[data-visible='true'] {
    opacity: 1;
  }

  .dendrites .primary,
  .axon .primary {
    stroke-width: 2.8;
  }

  .dendrites .secondary,
  .axon .secondary {
    stroke-width: 2.1;
  }

  .dendrites .tertiary {
    stroke-width: 1.45;
  }

  .dendrites[data-active='true'] path,
  .synaptic-inputs[data-active='true'] .input-fibre,
  .synaptic-inputs[data-active='true'] .bouton {
    stroke: var(--accent);
  }

  .synaptic-inputs .input-fibre {
    stroke-width: 1.6;
  }

  .synaptic-inputs .bouton {
    fill: var(--accent-soft);
    stroke-width: 1.6;
  }

  .synaptic-inputs .transmitter {
    fill: var(--accent);
    stroke: none;
  }

  .synapse-callout path {
    stroke: var(--muted);
    stroke-width: 1;
  }

  .synapse-callout text {
    fill: var(--muted);
    stroke: none;
    font-family: var(--font-mono);
    font-size: 8px;
    font-style: normal;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .dendritic-signals,
  .axonal-signals {
    opacity: 0;
    transition: opacity 240ms ease;
  }

  .dendritic-signals[data-visible='true'],
  .axonal-signals[data-visible='true'] {
    opacity: 1;
  }

  .dendritic-signals path,
  .axonal-signals path {
    stroke: color-mix(in srgb, var(--accent), transparent 55%);
    stroke-width: 4.2;
    stroke-dasharray: 0.4 17.6;
    animation: signal-flow 1.45s linear infinite;
  }

  .dendritic-signals path:nth-child(2),
  .axonal-signals path:nth-child(2) {
    animation-delay: -0.48s;
  }

  .dendritic-signals path:nth-child(3),
  .axonal-signals path:nth-child(3) {
    animation-delay: -0.96s;
  }

  .axonal-signals path:nth-child(4) {
    animation-delay: -0.72s;
  }

  .cell-body .soma {
    fill: var(--bg);
    stroke: color-mix(in srgb, var(--muted), transparent 62%);
    stroke-width: 2.7;
  }

  .cell-body .nucleus {
    fill: color-mix(in srgb, var(--bg), var(--fg) 9%);
    stroke: color-mix(in srgb, var(--muted), transparent 28%);
    stroke-width: 1.8;
    transition:
      fill 240ms ease,
      stroke 240ms ease;
  }

  .cell-body[data-threshold='true'] .soma {
    stroke: var(--accent);
  }

  .cell-body[data-threshold='true'] .nucleus {
    fill: var(--accent-soft);
    stroke: var(--accent);
  }

  .axon[data-active='true'] path,
  .terminals[data-visible='true'] .terminal-fibre,
  .terminals[data-visible='true'] .receiving-fibre,
  .terminals[data-visible='true'] .bouton {
    stroke: var(--accent);
  }

  .terminals .terminal-fibre,
  .terminals .receiving-fibre {
    stroke-width: 1.5;
  }

  .terminals .bouton {
    fill: var(--accent-soft);
    stroke-width: 1.6;
  }

  .terminals .transmitter {
    fill: var(--accent);
    stroke: none;
  }

  @keyframes signal-flow {
    from {
      stroke-dashoffset: 0;
    }

    to {
      stroke-dashoffset: -18;
    }
  }

  .steps span {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: clamp(0.48rem, 0.64vw, 0.72rem);
    font-style: normal;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 0.55rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .steps li {
    display: grid;
    align-content: start;
    gap: 0.45rem;
    min-height: 7rem;
    padding: 0.8rem;
    border-top: 1px solid var(--rule, color-mix(in srgb, var(--fg), transparent 84%));
    opacity: 0.28;
    transform: translateY(0.35rem);
    transition: 240ms ease;
  }

  .steps li[data-active='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  .steps p {
    margin: 0;
    color: var(--muted);
    font-size: clamp(0.75rem, 0.95vw, 1rem) !important;
    line-height: 1.35 !important;
  }

  @media (max-width: 980px) {
    .steps {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .neural-scene,
    .network-context {
      transition: none;
    }

    .dendritic-signals path,
    .axonal-signals path {
      animation: none;
    }
  }
</style>
