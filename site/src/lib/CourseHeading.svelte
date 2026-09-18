<script>
  let { id, label = "", title, subtitle = "", part = "" } = $props();
</script>

<div class="heading">
  {#if label}<span class="label">{label}</span>{/if}
  <h2 {id}>
    <span class="title">{title}</span>
    {#if part}<span class="part">{part}</span>{/if}
  </h2>
  {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
</div>

<style>
  .heading {
    margin-bottom: 22px;
  }

  h2 {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-family: var(--font-serif);
    font-size: 30px;
    font-weight: 400;
    text-transform: none;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: var(--text-prominent);
    margin-top: 0;
  }

  .label + h2 {
    margin-top: 10px;
  }

  .label {
    text-transform: uppercase;
    font-size: var(--font-size-sm);
    letter-spacing: 0.13em;
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-weight: var(--ui-weight);
  }

  .part {
    flex: none;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    font-weight: var(--ui-weight);
    letter-spacing: 0.04em;
    line-height: 1;
    white-space: nowrap;
  }

  .subtitle {
    margin-top: 10px;
    max-width: 760px;
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    font-weight: var(--body-weight);
    letter-spacing: 0.01em;
    line-height: 1.5;
    text-transform: none;
  }
</style>
