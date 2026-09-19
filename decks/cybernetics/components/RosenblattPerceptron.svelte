<script lang="ts">
  import { getStepContext } from '@svx-slides/core/deck/stepContext'

  const step = getStepContext()

  const inputs = [
    { label: 'x₁', value: 0.8, before: 0.4, after: 0.9 },
    { label: 'x₂', value: 0.6, before: -0.7, after: -0.2 }
  ]

  $: updated = $step >= 4
  $: bias = updated ? -0.28 : -0.36
  $: weights = inputs.map((input) => (updated ? input.after : input.before))
  $: activation = inputs.reduce((total, input, index) => total + input.value * weights[index], bias)
  $: output = activation >= 0 ? 1 : 0
  $: target = 1
  $: error = target - output
</script>

<div class="perceptron" aria-label="Perceptron de Rosenblatt">
  <section class="perceptron-card mcp" data-visible={$step >= 0}>
    <span class="card-label">McCulloch · Pitts</span>
    <strong>règle fixée</strong>
    <p>Poids et seuil sont posés d’avance : le neurone exécute une fonction logique.</p>
  </section>

  <section class="perceptron-card rosenblatt" data-visible={$step >= 1}>
    <span class="card-label">Rosenblatt · 1958</span>
    <strong>règle ajustable</strong>
    <p>Le perceptron garde le seuil, mais apprend ses poids à partir d’exemples.</p>
  </section>

  <div class="model" data-updated={updated}>
    <div class="input-stack">
      {#each inputs as input, index}
        <div class="weighted-input" data-visible={$step >= 1} style={`--delay: ${index * 90}ms`}>
          <span>{input.label}</span>
          <strong>{input.value}</strong>
          <em>w = {weights[index].toFixed(1)}</em>
        </div>
      {/each}
      <div class="weighted-input bias" data-visible={$step >= 1}>
        <span>b</span>
        <strong>{bias.toFixed(2)}</strong>
        <em>biais</em>
      </div>
    </div>

    <div class="unit" data-active={$step >= 2}>
      <span class="sum">Σ xᵢwᵢ + b</span>
      <strong>{activation.toFixed(2)}</strong>
      <span class="cut">{activation >= 0 ? '≥ 0' : '< 0'}</span>
    </div>

    <div class="prediction" data-visible={$step >= 2} data-correct={$step >= 4}>
      <span>y</span>
      <strong>{output}</strong>
      <em>{$step >= 4 ? 'corrigé' : 'prédit'}</em>
    </div>
  </div>

  <div class="learning" data-visible={$step >= 3}>
    <div class="example">
      <span class="card-label">exemple supervisé</span>
      <strong>t = {target}</strong>
      <p>Si la prédiction ne coïncide pas avec la cible, l’erreur devient un signal de correction.</p>
    </div>

    <div class="update" data-visible={$step >= 4}>
      <span class="mono">Δw = η(t − y)x</span>
      <span class="mono">Δb = η(t − y)</span>
      <p>Le poids n’est plus seulement un paramètre logique : il devient une mémoire de l’entraînement.</p>
    </div>
  </div>

  <div class="plane" data-visible={$step >= 2} data-updated={updated}>
    <span class="axis x">x₁</span>
    <span class="axis y">x₂</span>
    <div class="boundary before"></div>
    <div class="boundary after"></div>
    <div class="point positive known">+</div>
    <div class="point negative">−</div>
    <div class="point training" data-error={$step >= 3} data-corrected={updated}>+</div>
    <div class="caption">
      {$step >= 4 ? 'frontière déplacée par correction' : 'frontière de décision initiale'}
    </div>
  </div>
</div>

<style>
  .perceptron {
    display: grid;
    grid-template-columns: minmax(13rem, 0.72fr) minmax(20rem, 1fr) minmax(16rem, 0.86fr);
    grid-template-rows: auto 1fr auto;
    gap: clamp(1rem, 1.7vw, 1.7rem);
    align-items: stretch;
    width: 100%;
    min-height: min(61vh, 36rem);
  }

  .perceptron-card,
  .learning,
  .plane,
  .model {
    border: 1px solid var(--border-prominent, color-mix(in srgb, var(--text-prominent), transparent 84%));
    background: color-mix(in srgb, var(--background), var(--text-prominent) 3%);
  }

  .perceptron-card {
    display: grid;
    align-content: start;
    gap: 0.55rem;
    padding: 1rem;
    opacity: 0.36;
    transform: translateY(0.35rem);
    transition: 240ms ease;
  }

  .perceptron-card[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  .perceptron-card strong,
  .example strong {
    color: var(--text-prominent);
    font-family: var(--font-serif);
    font-size: clamp(1.7rem, 2.8vw, 3.2rem);
    font-style: italic;
    font-weight: 300;
    letter-spacing: -0.07em;
    line-height: 0.95;
  }

  .perceptron-card p,
  .example p,
  .update p {
    margin: 0;
    color: var(--text-muted);
    font-size: clamp(0.78rem, 1.05vw, 1.04rem) !important;
    line-height: 1.45 !important;
  }

  .card-label,
  .mono,
  .weighted-input span,
  .weighted-input em,
  .sum,
  .cut,
  .prediction span,
  .prediction em,
  .axis,
  .caption {
    font-family: var(--font-mono);
    font-style: normal;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .card-label {
    color: var(--accent);
    font-size: clamp(0.5rem, 0.66vw, 0.74rem);
  }

  .model {
    grid-column: 2;
    grid-row: 1 / 3;
    display: grid;
    grid-template-columns: 0.92fr 1fr 0.62fr;
    gap: 0.85rem;
    align-items: center;
    padding: clamp(1rem, 1.6vw, 1.5rem);
  }

  .input-stack {
    display: grid;
    gap: 0.75rem;
  }

  .weighted-input {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.2rem 0.65rem;
    align-items: baseline;
    padding: 0.72rem 0.8rem;
    border-top: 1px solid var(--border-prominent, color-mix(in srgb, var(--text-prominent), transparent 84%));
    opacity: 0;
    transform: translateX(-0.4rem);
    transition:
      opacity 240ms ease var(--delay, 0ms),
      transform 240ms ease var(--delay, 0ms);
  }

  .weighted-input[data-visible='true'] {
    opacity: 1;
    transform: translateX(0);
  }

  .weighted-input span,
  .weighted-input em {
    color: var(--text-muted);
    font-size: clamp(0.5rem, 0.64vw, 0.72rem);
  }

  .weighted-input strong,
  .unit strong,
  .prediction strong {
    color: var(--accent);
    font-family: var(--font-serif);
    font-size: clamp(1.8rem, 3vw, 3.3rem);
    font-style: normal;
    font-weight: 300;
    letter-spacing: -0.07em;
    line-height: 0.9;
  }

  .weighted-input em {
    grid-column: 1 / -1;
  }

  .unit {
    position: relative;
    display: grid;
    place-items: center;
    gap: 0.4rem;
    aspect-ratio: 1;
    border: 1px solid var(--border-prominent, color-mix(in srgb, var(--text-prominent), transparent 82%));
    border-radius: 999px;
    opacity: 0.32;
    transition: 240ms ease;
  }

  .unit[data-active='true'] {
    border-color: var(--accent);
    background: var(--accent-subtle);
    opacity: 1;
  }

  .sum,
  .cut,
  .prediction em {
    color: var(--text-muted);
    font-size: clamp(0.48rem, 0.62vw, 0.7rem);
  }

  .prediction {
    display: grid;
    place-items: center;
    gap: 0.35rem;
    min-height: 8rem;
    border-left: 1px solid var(--border-prominent, color-mix(in srgb, var(--text-prominent), transparent 84%));
    opacity: 0;
    transform: translateX(0.4rem);
    transition: 240ms ease;
  }

  .prediction[data-visible='true'] {
    opacity: 1;
    transform: translateX(0);
  }

  .prediction[data-correct='true'] {
    background: color-mix(in srgb, var(--accent), transparent 90%);
  }

  .learning {
    grid-column: 1 / 3;
    grid-row: 3;
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 1rem;
    padding: 1rem;
    opacity: 0;
    transform: translateY(0.5rem);
    transition: 240ms ease;
  }

  .learning[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  .example,
  .update {
    display: grid;
    align-content: start;
    gap: 0.55rem;
  }

  .update {
    opacity: 0;
    transition: 240ms ease;
  }

  .update[data-visible='true'] {
    opacity: 1;
  }

  .mono {
    color: var(--text-prominent);
    font-size: clamp(0.7rem, 0.95vw, 1.05rem);
  }

  .plane {
    grid-column: 3;
    grid-row: 2 / 4;
    position: relative;
    min-height: 18rem;
    opacity: 0;
    overflow: hidden;
    transform: translateY(0.5rem);
    transition: 240ms ease;
  }

  .plane[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  .plane::before {
    content: '';
    position: absolute;
    inset: 1rem;
    background:
      linear-gradient(var(--border-prominent, #e8e8e6) 1px, transparent 1px),
      linear-gradient(90deg, var(--border-prominent, #e8e8e6) 1px, transparent 1px);
    background-size: 25% 25%;
    opacity: 0.55;
  }

  .axis,
  .caption {
    position: absolute;
    z-index: 2;
    color: var(--text-muted);
    font-size: clamp(0.48rem, 0.62vw, 0.7rem);
  }

  .axis.x {
    right: 1rem;
    bottom: 0.8rem;
  }

  .axis.y {
    top: 1rem;
    left: 1rem;
  }

  .boundary {
    position: absolute;
    z-index: 1;
    left: 8%;
    top: 50%;
    width: 92%;
    height: 2px;
    background: var(--text-muted);
    transform-origin: left center;
    transition:
      opacity 240ms ease,
      transform 420ms ease;
  }

  .boundary.before {
    transform: rotate(-28deg) translateY(1.2rem);
  }

  .boundary.after {
    background: var(--accent);
    opacity: 0;
    transform: rotate(-42deg) translateY(-0.6rem);
  }

  .plane[data-updated='true'] .boundary.before {
    opacity: 0.22;
  }

  .plane[data-updated='true'] .boundary.after {
    opacity: 1;
  }

  .point {
    position: absolute;
    z-index: 3;
    display: grid;
    place-items: center;
    width: 2rem;
    aspect-ratio: 1;
    border-radius: 999px;
    background: var(--background);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-style: normal;
    font-weight: 600;
    transition:
      background 240ms ease,
      color 240ms ease,
      transform 240ms ease;
  }

  .point.known {
    left: 62%;
    top: 22%;
  }

  .point.negative {
    left: 26%;
    top: 63%;
    color: var(--text-muted);
  }

  .point.training {
    left: 58%;
    top: 58%;
    border: 1px solid var(--accent);
  }

  .point.training[data-error='true'] {
    transform: scale(1.18);
    background: var(--accent);
    color: white;
  }

  .point.training[data-corrected='true'] {
    transform: scale(1);
    background: var(--background);
    color: var(--accent);
  }

  .caption {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }

  @media (max-width: 980px) {
    .perceptron {
      grid-template-columns: 1fr;
    }

    .model,
    .learning,
    .plane {
      grid-column: auto;
      grid-row: auto;
    }
  }
</style>
