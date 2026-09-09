<script lang="ts">
  import { notesToHtml } from "../deck/markdown";
  import type { NotesAudience } from "../deck/markdown";
  let {
    notes,
    audience = "presenter",
  }: { notes: string; audience?: NotesAudience } = $props();
</script>

<div class="notes">{@html notesToHtml(notes, { audience })}</div>

<style>
  .notes {
    padding: var(--space-5);
    overflow-wrap: anywhere;
    color: var(--text-prominent);
    font: var(--body-weight) 1.1rem / var(--body-line-height) var(--font-sans);
  }
  .notes :global(:is(h1, h2, h3, h4, h5, h6)) {
    margin: 1.4em 0 0.5em;
    font-family: var(--font-serif);
    font-weight: var(--heading-weight);
    line-height: var(--heading-line-height);
  }
  .notes :global(h1) {
    font-size: 2rem;
  }
  .notes :global(h2) {
    font-size: 1.75rem;
  }
  .notes :global(h3) {
    font-size: 1.5rem;
  }
  .notes :global(:is(p, ul, ol, pre, blockquote)) {
    margin-block: 0.75em;
  }
  .notes :global(:is(ul, ol)) {
    padding-left: 1.5em;
  }
  .notes :global(li + li) {
    margin-top: 0.3em;
  }
  .notes :global(strong) {
    font-weight: 500;
  }
  .notes :global(a) {
    color: var(--accent);
    text-underline-offset: 0.18em;
  }
  .notes :global(blockquote) {
    border-left: 3px solid var(--accent);
    padding: var(--space-3) var(--space-4);
    background: var(--background-subtle);
  }
  .notes :global(blockquote[class]::before) {
    color: var(--accent);
    font: var(--ui-weight) var(--font-size-sm) / var(--ui-line-height)
      var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  .notes :global(.presenter-note-comment::before) {
    content: "Indication";
  }
  .notes :global(.presenter-note-example::before) {
    content: "Exemple";
  }
  .notes :global(.presenter-note-warning::before) {
    content: "Attention";
  }
  .notes :global(code) {
    padding: 0.1em 0.25em;
    background: var(--accent-subtle);
    font-family: var(--font-mono);
    font-size: 0.85em;
  }
  .notes :global(pre) {
    overflow: auto;
    padding: var(--space-4);
    border: 1px solid var(--border-prominent);
  }
  .notes :global(pre code) {
    padding: 0;
    background: none;
  }
  .notes :global(hr) {
    margin-block: var(--space-5);
    border: 0;
    border-top: 1px solid var(--border-prominent);
  }
  .notes > :global(:first-child) {
    margin-top: 0;
  }
  .notes > :global(:last-child) {
    margin-bottom: 0;
  }
</style>
