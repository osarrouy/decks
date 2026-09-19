<script lang="ts">
  import FramedImage from "./FramedImage.svelte";

  let {
    name = "",
    dates = "",
    picture = "",
    glow = false,
  }: {
    name?: string;
    dates?: string;
    picture?: string;
    glow?: boolean;
  } = $props();
</script>

<div class:with-picture={picture} class="persona">
  <div class="persona-details">
    <h2>{name}</h2>
    {#if dates}<p class="kicker">{dates}</p>{/if}
  </div>
  {#if picture}
    <div class="persona-picture">
      <FramedImage
        src={picture}
        alt={name}
        maxHeight="68cqh"
        crosses={false}
        {glow}
      />
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

  .persona-details,
  .persona-picture {
    min-width: 0;
  }

  .persona-picture {
    display: grid;
    place-items: center;
  }

  .persona-picture :global(.framed-image) {
    max-width: 100%;
  }
</style>
