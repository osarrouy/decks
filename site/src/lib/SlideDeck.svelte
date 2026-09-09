<script>
  import { onMount } from "svelte";
  import { FullscreenButton } from "@dg/ui";

  let { title, url } = $props();
  let container = $state();
  let fullscreen = $state(false);
  let canFullscreen = $state(false);
  let error = $state("");

  onMount(() => {
    canFullscreen = document.fullscreenEnabled;
    const update = () =>
      (fullscreen = document.fullscreenElement === container);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  });

  async function toggleFullscreen() {
    error = "";
    try {
      if (fullscreen) await document.exitFullscreen();
      else await container.requestFullscreen();
    } catch {
      error =
        "Le plein écran n’est pas disponible. Ouvrez le support dans un nouvel onglet.";
    }
  }
</script>

<div class="reader" bind:this={container}>
  <div class="toolbar">
    <span>{title}</span>
    <a href={url} target="_blank" rel="noreferrer" data-sveltekit-reload
      >Ouvrir ↗</a
    >
    {#if canFullscreen}
      <FullscreenButton
        {fullscreen}
        label={fullscreen
          ? "Quitter le plein écran"
          : "Afficher les slides en plein écran"}
        onclick={toggleFullscreen}
      />
    {/if}
  </div>
  <div class="frame">
    <iframe src={url} title="Slides : {title}" allow="fullscreen" loading="lazy"
    ></iframe>
  </div>
  {#if error}<p role="status">{error}</p>{/if}
</div>

<style>
  .reader {
    border: 1px solid var(--border-prominent);
    background: var(--background);
    margin-top: var(--space-5);
  }
  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    font-family: var(--font-mono);
    text-transform: uppercase;
    font-size: var(--font-size-sm);
  }
  .toolbar span {
    flex: 1;
    min-width: 0;
  }
  a {
    flex-shrink: 0;
  }
  .frame {
    position: relative;
    padding-top: calc(56.25% + 52px);
  }
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
  .reader:fullscreen {
    border: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .reader:fullscreen .frame {
    flex: 1;
    padding: 0;
    min-height: 0;
  }
  p {
    margin: var(--space-3);
  }
</style>
