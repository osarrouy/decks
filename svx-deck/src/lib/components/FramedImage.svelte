<script lang="ts">
  let {
    src,
    alt,
    maxHeight = "82cqh",
    crosses = true,
    glow = false,
  }: {
    src: string;
    alt: string;
    maxHeight?: string;
    crosses?: boolean;
    glow?: boolean;
  } = $props();

  const extensions = [
    "top-left",
    "top-right",
    "right-top",
    "right-bottom",
    "bottom-right",
    "bottom-left",
    "left-bottom",
    "left-top",
  ];
</script>

{#key glow}
  <figure class="framed-image framed" class:crossed={crosses}>
    {#each extensions as extension}
      <span class="extension {extension}" aria-hidden="true"></span>
    {/each}
    <img
      {src}
      {alt}
      data-glow={glow ? "soft" : undefined}
      style:border-radius="0"
      style:max-height={maxHeight}
    />
  </figure>
{/key}

<style>
  figure {
    --_deck-width: calc(100cqw + 2 * var(--_padding-horizontal));
    --_deck-height: calc(100cqh + 2 * var(--_padding-vertical));
    display: grid;
    width: fit-content;
    max-width: calc(100cqw + 2 * var(--_corner-mark-outset));
    margin: 0;
    place-self: center;
    isolation: isolate;
    background: var(--background);
  }

  img {
    position: relative;
    z-index: 1;
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  /* Keep the glow wrapper aligned with the image's frame and column. */
  figure.framed-image :global(.image-glow-frame) {
    max-width: 100%;
    max-height: none;
    border-radius: 0;
  }

  figure.framed-image :global(.image-glow-frame > img) {
    max-width: 100%;
  }

  .extension {
    position: absolute;
    z-index: 0;
    display: block;
    background: var(--border);
    pointer-events: none;
  }

  :is(.top-left, .top-right, .bottom-right, .bottom-left) {
    width: var(--_deck-width);
    height: var(--border-width);
  }

  :is(.right-top, .right-bottom, .left-bottom, .left-top) {
    width: var(--border-width);
    height: var(--_deck-height);
  }

  .top-left {
    top: 0;
    right: 100%;
  }

  .top-right {
    top: 0;
    left: 100%;
  }

  .right-top {
    right: 0;
    bottom: 100%;
  }

  .right-bottom {
    top: 100%;
    right: 0;
  }

  .bottom-right {
    bottom: 0;
    left: 100%;
  }

  .bottom-left {
    right: 100%;
    bottom: 0;
  }

  .left-bottom {
    top: 100%;
    left: 0;
  }

  .left-top {
    bottom: 100%;
    left: 0;
  }
</style>
