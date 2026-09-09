<script lang="ts">
  import { onMount } from "svelte";
  import SlideSurface from "./SlideSurface.svelte";
  import type { Slide } from "../deck/types";

  let { slide, step = 0 }: { slide?: Slide; step?: number } = $props();

  let viewport = $state<HTMLDivElement>();
  let logicalWidth = $state(1600);
  let logicalHeight = $state(900);
  let scale = $state(0.25);

  function updateFit() {
    if (!viewport) return;

    const ratio = 16 / 9;

    logicalWidth = Math.max(
      1,
      Math.min(window.innerWidth, window.innerHeight * ratio),
    );
    logicalHeight = Math.max(1, logicalWidth / ratio);

    const bounds = viewport.getBoundingClientRect();
    scale = Math.max(
      0.01,
      Math.min(bounds.width / logicalWidth, bounds.height / logicalHeight),
    );
  }

  onMount(() => {
    const observer = new ResizeObserver(updateFit);
    if (viewport) observer.observe(viewport);
    window.addEventListener("resize", updateFit);
    updateFit();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateFit);
    };
  });

  let canvasStyle = $derived(
    [
      `width: ${logicalWidth}px`,
      `height: ${logicalHeight}px`,
      `transform: translate(-50%, -50%) scale(${scale})`,
    ].join("; "),
  );
</script>

<div class="presenter-preview-viewport" bind:this={viewport}>
  <div class="presenter-preview-canvas" style={canvasStyle}>
    {#if slide}
      <SlideSurface {slide} {step} preview />
    {/if}
  </div>
</div>

<style>
  .presenter-preview-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: var(--background);
  }
  .presenter-preview-canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
  }
</style>
