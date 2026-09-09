<script>
  let { id, label, title } = $props();
</script>

<div class="heading">
  <span class="label">{label}</span>
  <h2 {id}>{title}</h2>
</div>

<style>
  .heading {
    margin-bottom: 22px;
  }

  h2 {
    font-family: var(--font-serif);
    font-size: 30px;
    font-weight: 400;
    text-transform: none;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: var(--text-prominent);
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
</style>
