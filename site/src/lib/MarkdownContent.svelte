<script>
  import { renderMarkdown } from "./course-content.js";
  /**
   * @typedef {Object} Props
   * @property {string} [text]
   * @property {boolean} [lead]
   */

  /** @type {Props} */
  let { text = "", lead = false } = $props();
</script>

<!-- MarkdownIt escapes raw HTML and rejects executable link protocols. -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<div class="markdown" class:lead>{@html renderMarkdown(text)}</div>

<style>
  .markdown {
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    font-weight: var(--body-weight);
    text-transform: none;
    letter-spacing: 0.01em;
    line-height: 1.75;
    overflow-wrap: anywhere;
  }
  .markdown :global(p + p) {
    margin-top: 1em;
  }
  .markdown :global(h2),
  .markdown :global(h3),
  .markdown :global(h4),
  .markdown :global(h5),
  .markdown :global(h6) {
    font-family: var(--font-serif);
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: 0;
    text-transform: none;
    color: var(--text-prominent);
    margin: 1.6em 0 0.65em;
  }
  .markdown :global(h2),
  .markdown :global(h3) {
    font-size: 28px;
  }
  .markdown :global(h4),
  .markdown :global(h5),
  .markdown :global(h6) {
    font-size: 22px;
  }
  .markdown :global(ul),
  .markdown :global(ol) {
    margin: 0.8em 0 1.2em;
    padding-left: 1.5em;
  }
  .markdown :global(ul) {
    list-style-type: "+  ";
  }
  .markdown :global(li + li) {
    margin-top: 0.35em;
  }
  .markdown :global(ul > li::marker) {
    font-family: var(--font-mono);
    font-weight: 100;
  }
  .markdown :global(a) {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: var(--text-prominent);
  }
  .markdown :global(pre) {
    overflow-x: auto;
  }
  .lead {
    max-width: 780px;
    color: var(--text-prominent);
  }
</style>
