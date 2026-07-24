<script lang="ts">
  import { getStepContext } from '@svx-slides/core/deck/stepContext'

  const step = getStepContext()

  const synapses = [
    { label: 'glutamate', kind: 'exc', x: 8, y: 18 },
    { label: 'GABA', kind: 'inh', x: 12, y: 58 },
    { label: 'entrée', kind: 'exc', x: 20, y: 38 }
  ]
</script>

<div class="bio-neuron" aria-label="Fonctionnement schématique d’un neurone biologique">
  <div class="diagram">
    {#each synapses as synapse, index}
      <div
        class="synapse {synapse.kind}"
        data-active={$step >= 1}
        style={`left: ${synapse.x}%; top: ${synapse.y}%; --delay: ${index * 90}ms`}
      >
        <span>{synapse.label}</span>
      </div>
    {/each}

    <svg viewBox="0 0 720 360" role="img" aria-label="Dendrites, soma, axone et terminaisons synaptiques">
      <g class="dendrites" data-active={$step >= 1}>
        <path d="M250 180 C190 126 134 80 72 48" />
        <path d="M245 170 C182 166 124 166 64 146" />
        <path d="M246 192 C178 226 116 268 58 312" />
        <path d="M206 138 C172 110 152 86 142 54" />
        <path d="M200 214 C162 230 134 252 112 286" />
      </g>

      <g class="cell-body" data-threshold={$step >= 3}>
        <circle cx="292" cy="180" r="58" />
        <circle class="nucleus" cx="292" cy="180" r="18" />
      </g>

      <g class="axon" data-active={$step >= 4}>
        <path d="M348 180 C414 178 450 180 504 180 C560 180 604 158 662 118" />
        <path d="M504 180 C560 180 604 204 662 248" />
      </g>

      <g class="spikes" data-visible={$step >= 4}>
        <circle cx="392" cy="179" r="5" />
        <circle cx="462" cy="180" r="5" />
        <circle cx="536" cy="177" r="5" />
        <circle cx="610" cy="150" r="5" />
      </g>

      <g class="terminals" data-visible={$step >= 5}>
        <circle cx="668" cy="114" r="9" />
        <circle cx="668" cy="252" r="9" />
        <path d="M681 112 C704 106 710 96 718 82" />
        <path d="M681 254 C704 262 710 272 718 286" />
      </g>
    </svg>

    <div class="threshold" data-visible={$step >= 3}>
      <span>seuil</span>
      <strong>≈ −55 mV</strong>
    </div>
  </div>

  <ol class="steps">
    <li data-active={$step >= 1}>
      <span>01</span>
      <p>Des synapses libèrent des neurotransmetteurs sur les dendrites.</p>
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
  </ol>
</div>

<style>
  .bio-neuron {
    display: grid;
    gap: clamp(1rem, 1.8vw, 1.8rem);
    width: 100%;
  }

  .diagram {
    position: relative;
    min-height: min(43vh, 26rem);
    border: 1px solid var(--slide-rule, color-mix(in srgb, var(--slide-fg), transparent 84%));
    background:
      radial-gradient(circle at 36% 48%, var(--slide-accent-soft), transparent 18rem),
      color-mix(in srgb, var(--slide-bg), var(--slide-fg) 2%);
    overflow: hidden;
  }

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  path,
  circle {
    fill: none;
    stroke: var(--slide-muted);
    stroke-width: 5;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition:
      stroke 240ms ease,
      opacity 240ms ease,
      transform 240ms ease;
  }

  .dendrites,
  .axon,
  .spikes,
  .terminals {
    opacity: 0.28;
    transition: opacity 240ms ease;
  }

  .dendrites[data-active='true'],
  .axon[data-active='true'],
  .spikes[data-visible='true'],
  .terminals[data-visible='true'] {
    opacity: 1;
  }

  .dendrites[data-active='true'] path {
    stroke: var(--slide-accent);
  }

  .cell-body circle:first-child {
    fill: var(--slide-bg);
    stroke: var(--slide-fg);
  }

  .cell-body .nucleus {
    fill: var(--slide-accent-soft);
    stroke: var(--slide-accent);
    stroke-width: 3;
  }

  .cell-body[data-threshold='true'] circle:first-child {
    stroke: var(--slide-accent);
  }

  .axon[data-active='true'] path,
  .spikes circle,
  .terminals circle,
  .terminals path {
    stroke: var(--slide-accent);
  }

  .spikes circle,
  .terminals circle {
    fill: var(--slide-accent);
  }

  .synapse {
    position: absolute;
    z-index: 2;
    padding: 0.38rem 0.52rem;
    border: 1px solid var(--slide-rule, color-mix(in srgb, var(--slide-fg), transparent 84%));
    background: var(--slide-bg);
    color: var(--slide-muted);
    font-family: var(--font-mono);
    font-size: clamp(0.46rem, 0.62vw, 0.7rem);
    font-style: normal;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(0.35rem);
    transition:
      opacity 240ms ease var(--delay, 0ms),
      transform 240ms ease var(--delay, 0ms),
      color 240ms ease;
  }

  .synapse[data-active='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  .synapse.exc[data-active='true'] {
    color: var(--slide-accent);
  }

  .synapse.inh[data-active='true'] {
    color: var(--slide-fg);
  }

  .threshold {
    position: absolute;
    z-index: 2;
    right: 5%;
    top: 14%;
    display: grid;
    gap: 0.2rem;
    opacity: 0;
    transform: translateY(0.4rem);
    transition: 240ms ease;
  }

  .threshold[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  .threshold span,
  .steps span {
    color: var(--slide-accent);
    font-family: var(--font-mono);
    font-size: clamp(0.48rem, 0.64vw, 0.72rem);
    font-style: normal;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .threshold strong {
    color: var(--slide-fg);
    font-family: var(--font-heading);
    font-size: clamp(1.4rem, 2.5vw, 2.8rem);
    font-style: italic;
    font-weight: 300;
    letter-spacing: -0.06em;
    line-height: 0.95;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
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
    border-top: 1px solid var(--slide-rule, color-mix(in srgb, var(--slide-fg), transparent 84%));
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
    color: var(--slide-muted);
    font-size: clamp(0.75rem, 0.95vw, 1rem) !important;
    line-height: 1.35 !important;
  }

  @media (max-width: 980px) {
    .steps {
      grid-template-columns: 1fr;
    }
  }
</style>
