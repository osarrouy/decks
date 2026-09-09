<script>
  import { renderReference } from "./course-content.js";
  let { references = [] } = $props();
</script>

<ol class="reading-list">
  {#each references as entry (entry)}
    <li>
      <div>
        <!-- MarkdownIt escapes raw HTML and rejects executable link protocols. -->
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        <p class="reference">{@html renderReference(entry.reference)}</p>
        {#if entry.note}<p class="note">{entry.note}</p>{/if}
        {#if (entry.url && !entry.reference.includes(entry.url)) || entry.fichier}
          <div class="links">
            {#if entry.url && !entry.reference.includes(entry.url)}<a
                href={entry.url}
                target="_blank"
                rel="noreferrer">Consulter ↗</a
              >{/if}
            {#if entry.fichier}<a href={entry.fichier} download>Télécharger ↓</a
              >{/if}
          </div>
        {/if}
      </div>
    </li>
  {/each}
</ol>

<style>
  .reading-list {
    list-style: none;
  }
  li {
    padding: var(--space-5) 0;
    border-top: 1px solid var(--border-prominent);
  }
  p {
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: var(--body-weight);
    text-transform: none;
    letter-spacing: 0.02em;
    line-height: 1.7;
    color: var(--text-prominent);
    overflow-wrap: anywhere;
  }
  .reference {
    padding-left: 1.27cm;
    text-indent: -1.27cm;
    line-height: 2;
  }
  .reference :global(em) {
    font-style: italic;
  }
  .reference :global(a) {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .note {
    margin-top: 10px;
    font-size: var(--font-size-lg);
    color: var(--text-muted);
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
    margin-top: 12px;
    font-family: var(--font-mono);
    letter-spacing: 0.48px;
    font-weight: var(--ui-weight);
    text-transform: uppercase;
  }
  a {
    font-size: var(--font-size-sm);
    color: var(--text-prominent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
