<script lang="ts">
  import { youtubeEmbedUrl } from "../deck/youtube.mjs";

  let { url, title = "YouTube video" }: { url: string; title?: string } =
    $props();

  let src = $derived(youtubeEmbedUrl(url));
</script>

<div class="youtube">
  {#if src}
    {#key src}
      <iframe
        {src}
        {title}
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    {/key}
  {:else}
    <p>Invalid YouTube URL.</p>
  {/if}
</div>

<style>
  .youtube {
    /* Follow the frame rather than the smaller text area of the slide. */
    position: absolute;
    inset: calc(var(--_corner-mark-offset-vertical) + var(--border-width))
      calc(var(--_corner-mark-offset-horizontal) + var(--border-width));
    display: grid;
    place-items: center;
    container-type: size;
  }

  iframe {
    display: block;
    width: min(100cqw, calc(100cqh * 16 / 9));
    height: min(100cqh, calc(100cqw * 9 / 16));
    border: 0;
    border-radius: 0;
    background: #000;
  }

  p {
    margin: 0;
    color: var(--text-muted);
    text-align: center;
  }
</style>
