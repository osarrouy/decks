<script lang="ts">
  let { name = "", dates = "", picture = "" } = $props();
</script>

<div class:with-picture={picture} class="persona">
  <div class="persona-details">
    <h2>{name}</h2>
    <p class="kicker">{dates}</p>
  </div>
  {#if picture}
    <div class="persona-picture">
      <img src={picture} alt={name} data-glow="strong" />
    </div>
  {/if}
</div>

<style>
  .persona.with-picture {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
    gap: var(--space-6);
    width: 100%;
  }

  .persona-details {
    min-width: 0;
  }

  .persona-picture {
    display: grid;
    min-width: 0;
    place-items: center;
  }

  .persona-picture :global(.image-glow-frame),
  .persona-picture img {
    max-width: 100%;
    max-height: 68vh;
    object-fit: contain;
  }
</style>
