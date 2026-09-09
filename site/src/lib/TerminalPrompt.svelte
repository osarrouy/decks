<script>
  /**
   * @typedef {Object} Props
   * @property {string} [prefix]
   */

  /** @type {Props} */
  let { prefix = ">" } = $props();
</script>

<span class="prompt" aria-hidden="true"
  >{prefix}<span class="cursor">_</span></span
>

<style>
  .prompt {
    color: var(--accent);
    font-family: var(--font-mono);
    text-transform: uppercase;
  }
  .cursor {
    animation: blink 1.1s steps(1, end) infinite;
  }
  @keyframes blink {
    0%,
    49% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .cursor {
      animation: none;
    }
  }
</style>
