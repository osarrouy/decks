<script lang="ts">
  import { getStepContext } from "../deck/stepContext";

  import type { Snippet } from "svelte";
  let {
    at = 1,
    until = Number.POSITIVE_INFINITY,
    children,
  }: { at?: number; until?: number; children?: Snippet } = $props();

  const step = getStepContext();
  let visible = $derived($step >= at && $step <= until);
</script>

<div class="fragment" data-visible={visible} aria-hidden={!visible}>
  {@render children?.()}
</div>

<style>
  .fragment {
    transition:
      opacity 260ms ease,
      transform 260ms ease,
      filter 260ms ease;
  }
  .fragment[data-visible="false"] {
    opacity: 0;
    transform: translateY(0.4em);
    filter: blur(2px);
  }
  @media (prefers-reduced-motion: reduce) {
    .fragment {
      transition: none;
    }
  }
</style>
