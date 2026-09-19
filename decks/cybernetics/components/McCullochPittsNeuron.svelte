<script lang="ts">
  import { getStepContext } from '@svx-slides/core/deck/stepContext'

  const step = getStepContext()

  const excitatoryInputs = [
    { id: 'x1', value: 1, weight: 1, label: 'x₁' },
    { id: 'x2', value: 1, weight: 1, label: 'x₂' }
  ]

  $: inhibitoryActive = $step >= 5
  $: visibleSum = $step >= 2
  $: compareThreshold = $step >= 3
  $: showOutput = $step >= 4
  $: excitatorySum = excitatoryInputs.reduce((total, input) => total + input.value * input.weight, 0)
  $: threshold = 2
  $: fires = excitatorySum >= threshold && !inhibitoryActive
</script>

<div class="mcp-neuron" aria-label="Neurone logique de McCulloch et Pitts">
  <div class="inputs">
    {#each excitatoryInputs as input, index}
      <div class="input-row" data-active={$step >= 1} style={`--delay: ${index * 80}ms`}>
        <div class="input-chip">
          <span class="input-label">{input.label}</span>
          <strong>{input.value}</strong>
        </div>
        <div class="weight">× w = {input.weight}</div>
        <div class="wire"></div>
      </div>
    {/each}

    <div class="input-row inhibitory" data-active={inhibitoryActive}>
      <div class="input-chip">
        <span class="input-label">i</span>
        <strong>{inhibitoryActive ? 1 : 0}</strong>
      </div>
      <div class="weight">inhibition</div>
      <div class="wire"></div>
    </div>
  </div>

  <div class="neuron" data-fires={fires} data-compare={compareThreshold}>
    <div class="sum" data-visible={visibleSum}>Σ = {excitatorySum}</div>
    <div class="threshold" data-visible={compareThreshold}>θ = {threshold}</div>
    <div class="rule">
      {#if inhibitoryActive}
        veto inhibiteur
      {:else if compareThreshold}
        Σ ≥ θ
      {:else}
        seuil logique
      {/if}
    </div>
  </div>

  <div class="output" data-visible={showOutput} data-fires={fires}>
    <div class="wire"></div>
    <div class="output-chip">
      <span>y</span>
      <strong>{showOutput ? (fires ? 1 : 0) : '—'}</strong>
    </div>
  </div>

  <div class="formula" data-visible={$step >= 1}>
    <span class="mono">y = 1</span>
    <span>si</span>
    <span class="mono">Σ xᵢwᵢ ≥ θ</span>
    <span>et</span>
    <span class="mono">aucune inhibition</span>
  </div>
</div>

<style>
  .mcp-neuron {
    display: grid;
    grid-template-columns: minmax(16rem, 0.82fr) minmax(15rem, 0.74fr) minmax(10rem, 0.44fr);
    grid-template-rows: 1fr auto;
    gap: clamp(1rem, 2vw, 2rem);
    align-items: center;
    width: 100%;
    min-height: min(58vh, 34rem);
  }

  .inputs {
    display: grid;
    gap: clamp(0.85rem, 1.35vw, 1.3rem);
  }

  .input-row {
    --signal: color-mix(in srgb, var(--text-prominent), transparent 82%);
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 0.75rem;
    align-items: center;
    opacity: 0.36;
    transform: translateX(-0.45rem);
    transition:
      opacity 260ms ease var(--delay, 0ms),
      transform 260ms ease var(--delay, 0ms);
  }

  .input-row[data-active='true'] {
    --signal: var(--accent);
    opacity: 1;
    transform: translateX(0);
  }

  .input-row.inhibitory[data-active='true'] {
    --signal: #111;
  }

  .input-chip,
  .output-chip {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.7rem;
    align-items: baseline;
    min-width: 5.4rem;
    padding: 0.75rem 0.9rem;
    border: 1px solid var(--border-prominent, color-mix(in srgb, var(--text-prominent), transparent 84%));
    background: var(--background);
  }

  .input-label,
  .output-chip span,
  .weight,
  .rule,
  .formula {
    font-family: var(--font-mono);
    font-style: normal;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .input-label,
  .output-chip span {
    color: var(--text-muted);
    font-size: clamp(0.56rem, 0.72vw, 0.8rem);
  }

  strong {
    color: var(--signal, var(--accent));
    font-family: var(--font-serif);
    font-size: clamp(1.8rem, 3.2vw, 3.4rem);
    font-style: normal;
    font-weight: 300;
    line-height: 0.9;
  }

  .weight {
    color: var(--text-muted);
    font-size: clamp(0.5rem, 0.66vw, 0.72rem);
    white-space: nowrap;
  }

  .wire {
    height: 1px;
    background: linear-gradient(90deg, var(--signal), transparent);
    transform-origin: left;
    transform: scaleX(0.2);
    transition: transform 260ms ease;
  }

  [data-active='true'] > .wire,
  .output[data-visible='true'] .wire {
    transform: scaleX(1);
  }

  .neuron {
    position: relative;
    display: grid;
    place-items: center;
    aspect-ratio: 1;
    border: 1px solid var(--border-prominent, color-mix(in srgb, var(--text-prominent), transparent 82%));
    border-radius: 999px;
    background: color-mix(in srgb, var(--background), var(--text-prominent) 3%);
    transition:
      border-color 260ms ease,
      background 260ms ease,
      transform 260ms ease;
  }

  .neuron[data-compare='true'] {
    border-color: var(--accent);
  }

  .neuron[data-fires='true'] {
    background: var(--accent-subtle);
    transform: scale(1.02);
  }

  .sum,
  .threshold {
    position: absolute;
    color: var(--text-prominent);
    font-family: var(--font-serif);
    font-size: clamp(1.6rem, 2.9vw, 3rem);
    font-style: italic;
    font-weight: 300;
    letter-spacing: -0.06em;
    opacity: 0;
    transform: translateY(0.5rem);
    transition: 220ms ease;
  }

  .sum {
    top: 31%;
  }

  .threshold {
    bottom: 30%;
    color: var(--text-muted);
  }

  .sum[data-visible='true'],
  .threshold[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  .rule {
    position: absolute;
    bottom: 12%;
    color: var(--accent);
    font-size: clamp(0.5rem, 0.65vw, 0.72rem);
  }

  .output {
    --signal: var(--accent);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    align-items: center;
    opacity: 0.28;
    transition: opacity 260ms ease;
  }

  .output[data-visible='true'] {
    opacity: 1;
  }

  .output[data-fires='false'] {
    --signal: var(--text-muted);
  }

  .formula {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    align-items: center;
    color: var(--text-muted);
    font-size: clamp(0.55rem, 0.75vw, 0.82rem);
    opacity: 0;
    transform: translateY(0.4rem);
    transition: 240ms ease;
  }

  .formula[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
  }

  .mono {
    color: var(--text-prominent);
  }

  @media (max-width: 900px) {
    .mcp-neuron {
      grid-template-columns: 1fr;
    }
  }
</style>
