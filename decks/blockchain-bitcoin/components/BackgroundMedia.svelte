<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    src,
    alt = "",
    video = false,
    darken = false,
    children,
  }: {
    src: string;
    alt?: string;
    video?: boolean;
    darken?: boolean;
    children: Snippet;
  } = $props();
</script>

<div class:darken class="background">
  {#if video}
    <video {src} autoplay muted loop playsinline aria-hidden="true"></video>
  {:else}
    <img {src} {alt} />
  {/if}
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .background {
    position: absolute;
    inset: 0;
    display: grid;
    overflow: hidden;
    color: white;
    background: #111;
  }

  .background::after {
    position: absolute;
    z-index: 1;
    inset: 0;
    background: linear-gradient(90deg, rgb(0 0 0 / 52%), rgb(0 0 0 / 8%));
    content: "";
  }

  .background.darken::after {
    background: rgb(0 0 0 / 58%);
  }

  video,
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    position: relative;
    z-index: 2;
    display: grid;
    align-content: center;
    padding: var(--_padding-vertical) var(--_padding-horizontal);
    text-shadow: 0 0.08em 0.35em rgb(0 0 0 / 72%);
  }

  .content :global(:where(h1, h2, h3, p)) {
    color: inherit;
  }
</style>
