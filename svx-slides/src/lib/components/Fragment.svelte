<script lang="ts">
  import { getStepContext } from '../deck/stepContext'

  export let at = 1
  export let until = Number.POSITIVE_INFINITY

  const step = getStepContext()
  $: visible = $step >= at && $step <= until
</script>

<div class="fragment" data-visible={visible} aria-hidden={!visible}>
  <slot />
</div>
