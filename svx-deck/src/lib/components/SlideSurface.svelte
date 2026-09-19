<script lang="ts">
  import "../../../theme/default.css";
  import { writable } from "svelte/store";
  import { enhanceImageGlow } from "../deck/imageGlow";
  import { setStepContext } from "../deck/stepContext";
  import type { Slide } from "../deck/types";

  let {
    slide,
    step = 0,
    preview = false,
  }: { slide: Slide; step?: number; preview?: boolean } = $props();

  const stepStore = writable(0);
  setStepContext(stepStore);

  function token(value: unknown) {
    return typeof value === "string"
      ? value.replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase()
      : undefined;
  }

  $effect(() => {
    stepStore.set(step);
  });
  let layout = $derived(token(slide.metadata.layout));
  let align = $derived(token(slide.metadata.align));
  let tone = $derived(token(slide.metadata.tone));
  let surfaceClass = $derived(
    [
      "slide",
      layout && `slide-layout-${layout}`,
      align && `slide-align-${align}`,
      tone && `slide-tone-${tone}`,
    ]
      .filter(Boolean)
      .join(" "),
  );
  let Content = $derived(slide.component);
</script>

<section
  use:enhanceImageGlow
  class={surfaceClass}
  class:preview
  data-slide-surface
  data-layout={layout}
  data-align={align}
  data-tone={tone}
  aria-label={slide.title}
>
  <Content />
  <div class="corners framed crossed" aria-hidden="true">
    {#each ["top-left", "top-right", "right-top", "right-bottom", "bottom-right", "bottom-left", "left-bottom", "left-top"] as edge}
      <span class="extension {edge}"></span>
    {/each}
  </div>
</section>
