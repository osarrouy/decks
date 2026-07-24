<script lang="ts">
  import { writable } from 'svelte/store'
  import { enhanceImageGlow } from '../deck/imageGlow'
  import { setStepContext } from '../deck/stepContext'
  import type { Slide } from '../deck/types'

  export let slide: Slide
  export let step = 0
  export let preview = false

  const stepStore = writable(step)
  setStepContext(stepStore)

  function token(value: unknown) {
    return typeof value === 'string' ? value.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase() : undefined
  }

  $: stepStore.set(step)
  $: layout = token(slide.metadata.layout)
  $: align = token(slide.metadata.align)
  $: tone = token(slide.metadata.tone)
  $: surfaceClass = [
    'slide-surface',
    layout && `slide-layout-${layout}`,
    align && `slide-align-${align}`,
    tone && `slide-tone-${tone}`
  ]
    .filter(Boolean)
    .join(' ')
</script>

<section
  use:enhanceImageGlow
  class={surfaceClass}
  class:preview
  data-layout={layout}
  data-align={align}
  data-tone={tone}
  aria-label={slide.title}
>
  <svelte:component this={slide.component} />
</section>
