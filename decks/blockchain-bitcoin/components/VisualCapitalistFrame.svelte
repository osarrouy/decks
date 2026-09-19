<script lang="ts">
  let { src }: { src: string } = $props();
</script>

<figure class="visual framed crossed">
  <iframe
    {src}
    title="All of the World’s Money and Markets in One Visualization, édition 2020"
    loading="eager"
  ></iframe>

  <figcaption>
    <span>Visual Capitalist</span>
    <a
      href="https://www.visualcapitalist.com/all-of-the-worlds-money-and-markets-in-one-visualization-2020/"
      target="_blank"
      rel="noreferrer">Édition 2020 ↗</a
    >
  </figcaption>
</figure>

<style>
  figure {
    position: absolute;
    inset-block: var(--_corner-mark-offset-vertical);
    left: 50%;
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    width: min(calc(100% - 2 * var(--_padding-horizontal)), 1100px);
    height: auto;
    margin: 0;
    overflow: hidden;
    border: var(--border-width) solid var(--border-prominent);
    background: var(--background);
    transform: translateX(-50%);
  }

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 0;
    border: 0;
    background: white;
  }

  iframe:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -3px;
  }

  figcaption {
    display: flex;
    justify-content: space-between;
    gap: var(--space-2);
    padding: var(--space-1) var(--space-2);
    border-top: var(--border-width) solid var(--border-prominent);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: clamp(9px, 0.8cqw, 12px);
    font-weight: var(--ui-weight);
    letter-spacing: var(--ui-letter-spacing);
    line-height: var(--ui-line-height);
    text-transform: uppercase;
  }

  a {
    color: var(--accent);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    text-underline-offset: 0.22em;
  }
</style>
