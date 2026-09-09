<script lang="ts">
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
  data-layout={layout}
  data-align={align}
  data-tone={tone}
  aria-label={slide.title}
>
  <Content />
</section>

<style>
  .slide {
    --_unit: clamp(4px, 0.64vw, 11px);
    --_text-size: clamp(10px, 1.75cqw, 34px);
    --_small-size: clamp(7px, 0.82cqw, 15px);
    --_heading-size: clamp(26px, 9.1cqw, 166px);
    --_heading-2-size: clamp(20px, 5cqw, 83px);
    --_line-body: var(--body-line-height);
    --_line-heading: 0.95;
    --_padding-horizontal: calc(var(--_unit) * 7);
    --_padding-vertical: calc(var(--_unit) * 7);
    --_gap: calc(var(--_unit) * 4);
    --_corner-mark-outset: calc(var(--_unit) * 3);
    --_corner-mark-color: color-mix(in srgb, var(--accent), transparent 72%);
    --_corner-mark-offset-horizontal: calc(
      var(--_padding-horizontal) - var(--_unit) * 3
    );
    --_corner-mark-offset-vertical: calc(
      var(--_padding-vertical) - var(--_unit) * 3
    );
    --_corner-mark-size: calc(var(--_unit) * 1.25);
    --_corner-mark-half: calc(var(--_corner-mark-size) / 2);
    --_corner-mark-stroke-half: 0.5px;
    --image-radius: 1.05rem;
    --image-glow-color: var(--accent);
    --_space-1: calc(var(--_unit) * 1);
    --_space-2: calc(var(--_unit) * 2);
    --_space-3: calc(var(--_unit) * 3);
    --_space-4: calc(var(--_unit) * 4);
    --_space-6: calc(var(--_unit) * 6);
    --_space-8: calc(var(--_unit) * 8);
    --_space-12: calc(var(--_unit) * 12);

    /* Existing course components are frozen; these values follow @dg/ui. */
    --bg: var(--background);
    --fg: var(--text-prominent);
    --muted: var(--text-muted);
    --rule: var(--border-prominent);
    --font-body: var(--font-sans);
    --font-heading: var(--font-serif);
    --accent-soft: var(--accent-subtle);
    --grid-unit: var(--_unit);
    --gap: var(--_gap);
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    padding: var(--_padding-vertical) var(--_padding-horizontal);
    background: var(--background);
    color: var(--text-prominent);
    font-family: var(--font-sans);
    overflow: hidden;
    container-type: size;
    font-weight: var(--body-weight);
  }
  .slide:not([data-layout]) {
    display: grid;
    align-content: center;
  }
  .slide :global(h1) {
    margin-top: 0;
    max-width: 20ch;
    margin-bottom: var(--_space-2);
    font-family: var(--font-serif);
    font-size: var(--_heading-size);
    font-weight: var(--heading-weight);
    letter-spacing: -0.035em;
    line-height: var(--_line-heading);
    font-style: normal;
    overflow-wrap: anywhere;
  }
  .slide :global(h2),
  .slide :global(h3) {
    margin-top: 0;
    max-width: 18ch;
    margin-bottom: var(--_space-2);
    font-family: var(--font-serif);
    font-size: var(--_heading-2-size);
    line-height: 1;
    font-style: normal;
    font-weight: var(--heading-weight);
    overflow-wrap: anywhere;
  }
  .slide :global(p) {
    margin-top: 0;
    font-size: var(--_text-size);
    line-height: var(--_line-body);
  }
  .slide :global(ul),
  .slide :global(ol) {
    margin-top: 0;
    display: grid;
    gap: var(--_space-1);
    padding-left: var(--_space-3);
  }
  .slide :global(blockquote) {
    margin-top: 0;
  }
  .slide :global(li) {
    font-size: var(--_text-size);
    line-height: var(--_line-body);
  }
  .slide :global(p + p) {
    margin-top: var(--_space-1);
  }
  .slide :global(strong) {
    color: var(--accent);
    font-weight: 400;
  }
  .slide :global(code) {
    padding: 0.12em 0.28em;
    border-radius: 0.3em;
    background: color-mix(in srgb, var(--text-prominent), transparent 91%);
    font-family: var(--font-mono);
    font-size: 0.8em;
  }
  .slide :global(img) {
    display: block;
    max-width: 100%;
    height: auto;
  }
  .slide :global(:where(img[data-glow], img[glow], img.glow, img.glowy)) {
    --image-glow-blur: min(3.4rem, 7cqmin);
    border-radius: var(--image-radius);
    box-shadow: 0 0 var(--image-glow-blur) -0.85rem
      color-mix(in srgb, var(--image-glow-color), transparent 56%);
    transform: translateZ(0);
  }
  .slide :global(:where(img[data-glow="soft"], img[glow="soft"])) {
    --image-glow-blur: min(2.4rem, 5cqmin);
  }
  .slide :global(:where(img[data-glow="strong"], img[glow="strong"])) {
    --image-glow-blur: min(4.4rem, 9cqmin);
  }
  .slide :global(.image-glow-frame) {
    --image-glow-map: radial-gradient(
      circle,
      color-mix(in srgb, var(--image-glow-color), transparent 32%),
      transparent 68%
    );
    --image-glow-opacity: 0.66;
    --image-glow-scale: 1.16;
    --image-glow-blur: min(3.4rem, 7cqmin);
    position: relative;
    display: inline-grid;
    width: fit-content;
    max-width: calc(
      (
          100cqw - 2 * var(--_corner-mark-offset-horizontal) - 2 *
            var(--image-glow-blur, min(4.4rem, 9cqmin))
        ) /
        1.2
    );
    isolation: isolate;
    border-radius: var(--image-radius);
    box-sizing: border-box;
    max-height: calc(
      (
          100cqh - 2 * var(--_corner-mark-offset-vertical) - 2 *
            var(--image-glow-blur, min(4.4rem, 9cqmin))
        ) /
        1.2
    );
  }
  .slide :global(.image-glow-frame > img) {
    position: relative;
    z-index: 1;
    grid-area: 1 / 1;
    box-shadow: none;
    width: auto;
    height: auto;
    max-width: calc(
      (
          100cqw - 2 * var(--_corner-mark-offset-horizontal) - 2 *
            var(--image-glow-blur, min(4.4rem, 9cqmin))
        ) /
        1.2
    );
    max-height: calc(
      (
          100cqh - 2 * var(--_corner-mark-offset-vertical) - 2 *
            var(--image-glow-blur, min(4.4rem, 9cqmin))
        ) /
        1.2
    );
    object-fit: contain;
  }
  .slide :global(.image-glow-aura) {
    position: absolute;
    z-index: -1;
    inset: 0;
    grid-area: 1 / 1;
    border-radius: inherit;
    background: var(--image-glow-map);
    filter: blur(var(--image-glow-blur)) saturate(1.18);
    opacity: var(--image-glow-opacity);
    transform: scale(var(--image-glow-scale));
    transform-origin: center;
    pointer-events: none;
  }
  .slide :global(.wiener-portrait) {
    display: grid;
    place-items: center;
    min-width: 0;
    height: 100%;
    min-height: 0;
    margin: 0;
  }
  .slide :global(.wiener-portrait > img),
  .slide :global(.wiener-portrait > .image-glow-frame),
  .slide :global(.wiener-portrait > .image-glow-frame > img) {
    width: auto;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  .slide :global(.kicker) {
    margin-bottom: var(--_space-2);
    color: var(--accent);
    width: 100%;
    font-family: var(--font-mono);
    font-size: var(--_small-size);
    letter-spacing: 0.24em;
    text-transform: uppercase;
    font-weight: var(--ui-weight);
  }
  .slide :global(.lead) {
    max-width: 29ch;
    font-size: clamp(8px, 1.15cqw, 19px);
    line-height: 1.6;
    letter-spacing: 0.25em;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-style: normal;
    font-weight: var(--ui-weight);
    text-transform: uppercase;
  }
  .slide :global(.muted) {
    color: var(--text-muted);
  }
  .slide :global(.formula) {
    color: var(--text-prominent);
    font-family: var(--font-mono);
    font-weight: var(--ui-weight);
  }
  .slide :global(.math-display) {
    margin: var(--_space-4) auto;
    overflow-x: auto;
    overflow-y: hidden;
    font-size: clamp(1.5rem, 3vw, 3.8rem);
    text-align: center;
  }
  .slide :global(.math-inline) {
    white-space: nowrap;
  }
  .slide :global(.citation) {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--_small-size);
    font-weight: var(--ui-weight);
    line-height: 1.1;
    margin-bottom: 0;
  }
  .slide :global(.citation + .citation) {
    margin-top: calc(var(--_space-1) * 0.5);
  }
  .slide :global(.footnote-ref) {
    margin-left: 0.12em;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.52em;
    font-weight: var(--ui-weight);
    line-height: 0;
    vertical-align: super;
  }
  .slide:has(:global(.slide-footnotes)) {
    padding-bottom: calc(var(--_padding-vertical) + var(--_space-4));
  }
  .slide[data-layout="center"]:has(:global(.slide-footnotes)) {
    padding-bottom: var(--_padding-vertical);
  }
  .slide[data-layout="center"] :global(.formula) {
    margin: 0;
  }
  .slide :global(.slide-footnotes) {
    position: absolute;
    z-index: 2;
    right: var(--_padding-horizontal);
    bottom: var(--_space-2);
    left: var(--_padding-horizontal);
    padding-top: var(--_space-1);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--_small-size);
    font-weight: var(--ui-weight);
    line-height: 1.25;
    text-align: left;
  }
  .slide :global(.slide-footnotes::before) {
    position: absolute;
    right: 0;
    bottom: var(--_space-2);
    left: 0;
    height: 1px;
    background: var(
      --_corner-mark-color,
      color-mix(in srgb, var(--accent), transparent 72%)
    );
    content: "";
  }
  .slide :global(.slide-footnotes ol) {
    margin: 0;
    padding-left: 1.5em;
  }
  .slide :global(.slide-footnotes li) {
    font-size: inherit;
    line-height: inherit;
  }
  .slide[data-layout="two-columns"],
  .slide[data-layout="columns"] {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--_gap);
    align-items: center;
  }
  .slide[data-layout="center"],
  .slide[data-layout="cover"] {
    display: grid;
    place-items: center;
    text-align: center;
  }
  .slide[data-layout="cover"] :global(h1) {
    max-width: 11ch;
    margin-inline: auto;
  }
  .slide[data-layout="stack"] {
    display: grid;
    align-content: center;
    gap: var(--_gap);
  }
  .slide[data-align="start"] {
    align-items: start;
    text-align: start;
  }
  .slide[data-align="center"] {
    align-items: center;
    text-align: center;
  }
  .slide[data-align="end"] {
    align-items: end;
    text-align: end;
  }
  .slide :global(.layout.two-columns),
  .slide :global(.layout.columns) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--_gap);
    align-items: center;
    height: 100%;
  }
  .slide :global(.layout.center),
  .slide :global(.layout.cover) {
    display: grid;
    place-items: center;
    height: 100%;
    text-align: center;
  }
  .slide :global(.layout.stack) {
    display: grid;
    align-content: center;
    gap: var(--_gap);
    height: 100%;
  }
  .slide :global(:where(.layout.center, .layout.cover) > *) {
    margin-inline: auto;
  }
  .slide :global(.column) {
    min-width: 0;
  }
  .slide :global(.timeline) {
    display: flex;
    align-items: center;
    gap: var(--_space-2);
    margin-top: var(--_space-4);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--_small-size);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .slide :global(.timeline span) {
    display: inline-flex;
    align-items: center;
    gap: var(--_space-2);
  }
  .slide :global(.timeline span:not(:last-child)::after) {
    width: clamp(2rem, 6vw, 6rem);
    height: 1px;
    background: color-mix(in srgb, var(--text-prominent), transparent 76%);
    content: "";
  }
  .slide :global(.sequence) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--_space-1);
    max-width: 54rem;
    margin: var(--_space-3) 0 0;
    font-family: var(--font-mono);
    font-size: clamp(1.25rem, 2.1vw, 2.25rem);
    line-height: 1.25;
  }
  .slide :global(.sequence .arrow) {
    color: var(--accent);
  }
  .slide :global(.card-grid) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--_space-2);
    margin-top: var(--_space-3);
  }
  .slide :global(.concept-card) {
    min-height: 9rem;
    padding: var(--_space-2);
    border-top: 1px solid
      color-mix(in srgb, var(--text-prominent), transparent 70%);
  }
  .slide :global(.concept-card h3) {
    margin-bottom: var(--_space-1);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--_small-size);
    font-weight: 650;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .slide :global(.concept-card p) {
    font-size: clamp(1.25rem, 1.8vw, 2rem);
    line-height: 1.2;
  }
  .slide :global(.statement) {
    max-width: 34ch;
    margin-top: var(--_space-3);
    color: var(--text-muted);
    font-size: clamp(1.45rem, 2.3vw, 2.65rem);
    line-height: 1.15;
    letter-spacing: -0.03em;
  }
  .slide :global(.statement strong),
  .slide :global(.statement.formula) {
    color: var(--text-prominent);
  }
  .slide :global(.comparison) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--_space-8);
    margin-top: var(--_space-3);
  }
  .slide :global(.comparison > div) {
    padding-top: var(--_space-2);
    border-top: 1px solid
      color-mix(in srgb, var(--text-prominent), transparent 70%);
  }
  .slide :global(.comparison h2) {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--_small-size);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .slide :global(.comparison p),
  .slide :global(.comparison li) {
    font-size: clamp(1.15rem, 1.65vw, 1.75rem);
  }
  .slide :global(.question) {
    max-width: 42ch;
    margin-top: var(--_space-4);
    padding-left: var(--_space-2);
    border-left: 3px solid var(--accent);
    color: var(--text-muted);
    font-size: clamp(1.35rem, 2vw, 2.2rem);
    font-style: italic;
    line-height: 1.25;
  }
  .slide :global(.term-list) {
    display: flex;
    flex-wrap: wrap;
    gap: var(--_space-1);
    max-width: 54rem;
    margin-top: var(--_space-3);
  }
  .slide :global(.term-list span) {
    padding: 0.42em 0.7em;
    border: 1px solid color-mix(in srgb, var(--accent), transparent 55%);
    border-radius: 999px;
    color: var(--text-prominent);
    font-family: var(--font-mono);
    font-size: clamp(1rem, 1.4vw, 1.45rem);
  }
  .slide::before {
    position: absolute;
    z-index: 2;
    inset: 0;
    background:
      linear-gradient(var(--_corner-mark-color) 0 0) left
        calc(var(--_corner-mark-offset-horizontal) - var(--_corner-mark-half))
        top
        calc(
          var(--_corner-mark-offset-vertical) - var(--_corner-mark-stroke-half)
        ) /
        var(--_corner-mark-size) 1px no-repeat,
      linear-gradient(var(--_corner-mark-color) 0 0) left
        calc(
          var(--_corner-mark-offset-horizontal) -
            var(--_corner-mark-stroke-half)
        )
        top
        calc(var(--_corner-mark-offset-vertical) - var(--_corner-mark-half)) /
        1px var(--_corner-mark-size) no-repeat,
      linear-gradient(var(--_corner-mark-color) 0 0) right
        calc(var(--_corner-mark-offset-horizontal) - var(--_corner-mark-half))
        top
        calc(
          var(--_corner-mark-offset-vertical) - var(--_corner-mark-stroke-half)
        ) /
        var(--_corner-mark-size) 1px no-repeat,
      linear-gradient(var(--_corner-mark-color) 0 0) right
        calc(
          var(--_corner-mark-offset-horizontal) -
            var(--_corner-mark-stroke-half)
        )
        top
        calc(var(--_corner-mark-offset-vertical) - var(--_corner-mark-half)) /
        1px var(--_corner-mark-size) no-repeat,
      linear-gradient(var(--_corner-mark-color) 0 0) left
        calc(var(--_corner-mark-offset-horizontal) - var(--_corner-mark-half))
        bottom
        calc(
          var(--_corner-mark-offset-vertical) - var(--_corner-mark-stroke-half)
        ) /
        var(--_corner-mark-size) 1px no-repeat,
      linear-gradient(var(--_corner-mark-color) 0 0) left
        calc(
          var(--_corner-mark-offset-horizontal) -
            var(--_corner-mark-stroke-half)
        )
        bottom
        calc(var(--_corner-mark-offset-vertical) - var(--_corner-mark-half)) /
        1px var(--_corner-mark-size) no-repeat,
      linear-gradient(var(--_corner-mark-color) 0 0) right
        calc(var(--_corner-mark-offset-horizontal) - var(--_corner-mark-half))
        bottom
        calc(
          var(--_corner-mark-offset-vertical) - var(--_corner-mark-stroke-half)
        ) /
        var(--_corner-mark-size) 1px no-repeat,
      linear-gradient(var(--_corner-mark-color) 0 0) right
        calc(
          var(--_corner-mark-offset-horizontal) -
            var(--_corner-mark-stroke-half)
        )
        bottom
        calc(var(--_corner-mark-offset-vertical) - var(--_corner-mark-half)) /
        1px var(--_corner-mark-size) no-repeat;
    content: "";
    pointer-events: none;
  }
  .slide :global(> :where(img[data-slide-image="fill"], img.slide-image-fill)),
  .slide :global(> .image-glow-frame:has(> img[data-slide-image="fill"])),
  .slide :global(> .image-glow-frame:has(> img.slide-image-fill)) {
    width: fit-content;
    max-width: calc(100cqw + 2 * var(--_corner-mark-outset));
    height: fit-content;
    max-height: calc(100cqh + 2 * var(--_corner-mark-outset));
    place-self: center;
    object-fit: contain;
  }
  .slide :global(> .image-glow-frame:has(> img[data-slide-image="fill"]) > img),
  .slide :global(> .image-glow-frame:has(> img.slide-image-fill) > img),
  .slide :global(> img[data-slide-image="fill"]),
  .slide :global(> img.slide-image-fill) {
    width: auto;
    max-width: calc(100cqw + 2 * var(--_corner-mark-outset));
    height: auto;
    max-height: calc(100cqh + 2 * var(--_corner-mark-outset));
    object-fit: contain;
  }
  .slide :global(h1 strong),
  .slide :global(h2 strong) {
    color: inherit;
    font-weight: 420;
  }
  .slide :global(.kicker::before) {
    color: var(--accent);
    content: ">_";
    margin-right: var(--_space-1);
  }
</style>
