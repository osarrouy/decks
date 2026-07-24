<script lang="ts">
  import { onMount } from 'svelte'
  import SlideSurface from './SlideSurface.svelte'
  import type { Slide } from '../deck/types'

  export let slide: Slide | undefined
  export let step = 0

  let viewport: HTMLDivElement
  let logicalWidth = 1600
  let logicalHeight = 900
  let scale = 0.25

  function numericToken(styles: CSSStyleDeclaration, name: string, fallback: number) {
    const value = Number.parseFloat(styles.getPropertyValue(name))
    return Number.isFinite(value) && value > 0 ? value : fallback
  }

  function updateFit() {
    if (!viewport) return

    const styles = window.getComputedStyle(viewport)
    const slideWidth = numericToken(styles, '--aspect-width', 16)
    const slideHeight = numericToken(styles, '--aspect-height', 9)
    const ratio = slideWidth / slideHeight

    logicalWidth = Math.max(1, Math.min(window.innerWidth, window.innerHeight * ratio))
    logicalHeight = Math.max(1, logicalWidth / ratio)

    const bounds = viewport.getBoundingClientRect()
    scale = Math.max(0.01, Math.min(bounds.width / logicalWidth, bounds.height / logicalHeight))
  }

  onMount(() => {
    const observer = new ResizeObserver(updateFit)
    observer.observe(viewport)
    window.addEventListener('resize', updateFit)
    updateFit()

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateFit)
    }
  })

  $: canvasStyle = [
    `width: ${logicalWidth}px`,
    `height: ${logicalHeight}px`,
    `transform: translate(-50%, -50%) scale(${scale})`
  ].join('; ')
</script>

<div class="presenter-preview-viewport" bind:this={viewport}>
  <div class="presenter-preview-canvas" style={canvasStyle}>
    {#if slide}
      <SlideSurface {slide} {step} preview />
    {/if}
  </div>
</div>
