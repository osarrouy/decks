<script lang="ts">
  import { getStepContext } from '@svx-slides/core/deck/stepContext'
  const step = getStepContext()
</script>

<div class="state-card">
  <span class="label">État de présentation</span>
  <code>{`{ slide: ${$step > 0 ? 4 : 1}, step: ${$step} }`}</code>
  <p>La navigation n’est pas un effet secondaire : elle devient une donnée partageable, inscrite dans l’URL.</p>
</div>

<style>
  .state-card {
    display: grid;
    gap: 1rem;
    padding: 1.25rem;
    border-radius: 1rem;
    background: color-mix(in srgb, var(--fg), transparent 92%);
  }

  .label {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: var(--small-size);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  code {
    display: block;
    width: fit-content;
    font-size: clamp(1.25rem, 2vw, 2rem);
  }

  p {
    margin: 0;
    font-size: clamp(1.1rem, 1.5vw, 1.45rem) !important;
  }
</style>
