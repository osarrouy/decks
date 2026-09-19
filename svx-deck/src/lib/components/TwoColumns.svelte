<div class="two-columns-component">
  <div class="column">
    <slot name="left" />
  </div>
  <div class="column">
    <slot name="right" />
  </div>
</div>

<style>
  .two-columns-component {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--_gap);
    align-items: center;
    height: 100%;
  }

  .column {
    min-width: 0;
  }
</style>
