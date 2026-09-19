<script lang="ts">
  import { getStepContext } from "@svx-deck/core/deck/stepContext";

  const original =
    "Le fait dont tout discours sur l’éthique doit partir, c’est qu’il n’existe aucune essence, aucune vocation historique ou spirituelle, aucun destin biologique que l’homme devrait conquérir ou réaliser. C’est la seule raison pour laquelle quelque chose comme une éthique peut exister : car il est clair que si l’homme devait être telle ou telle substance, tel ou tel destin, il n’y aurait aucune expérience éthique possible - il n’y aurait que des devoirs à accomplir.";
  const originalHash =
    "a69141bdc0274f893a68c9e97c03a5cbf88f15eb9b0ffddb71f6b9a9cda12b91";
  const changedHash =
    "ce8fb460e2dedbb13d1189582cb16f273b942f9b9d39c053e3486375cca05d32";
  const particles = original
    .replaceAll(" ", "")
    .split("")
    .filter((_, index) => index % 8 === 0);

  const step = getStepContext();
  let phase = $derived(Math.max(0, Math.min($step, 3)));
</script>

<figure
  data-phase={phase}
  class:compare={phase >= 2}
  aria-label="Effet d’une modification d’un seul caractère sur un hash SHA-256"
>
  <article class="sample original">
    <blockquote>{original}</blockquote>

    <div
      class="conversion"
      class:visible={phase >= 1}
      class:active={phase === 1}
      aria-hidden="true"
    >
      <span class="algorithm">SHA-256</span>
      <div class="particles">
        {#each particles as character, index}
          <span
            style={`--x: ${((index * 37) % 91) - 45}cqw; --y: ${((index * 23) % 36) - 18}px; --r: ${((index * 47) % 240) - 120}deg; --d: ${(index % 9) * 22}ms;`}
            >{character}</span
          >
        {/each}
      </div>
    </div>

    <div class="digest" class:visible={phase >= 1}>
      <span>SHA-256</span>
      <code>{originalHash}</code>
    </div>
  </article>

  <article class="sample changed" class:visible={phase >= 2}>
    <blockquote>
      Le fait dont tout discours sur l’éthique doit partir, c’est qu’il n’existe
      aucune essence, aucune vocation historique ou spirituelle, aucun des<mark
        >s</mark
      >in biologique que l’homme devrait conquérir ou réaliser. C’est la seule
      raison pour laquelle quelque chose comme une éthique peut exister : car il
      est clair que si l’homme devait être telle ou telle substance, tel ou tel
      destin, il n’y aurait aucune expérience éthique possible - il n’y aurait
      que des devoirs à accomplir.
    </blockquote>

    <div
      class="conversion"
      class:visible={phase >= 3}
      class:active={phase === 3}
      aria-hidden="true"
    >
      <span class="algorithm">SHA-256</span>
      <div class="particles">
        {#each particles as character, index}
          <span
            style={`--x: ${((index * 41) % 91) - 45}cqw; --y: ${((index * 29) % 36) - 18}px; --r: ${((index * 53) % 240) - 120}deg; --d: ${(index % 9) * 22}ms;`}
            >{character}</span
          >
        {/each}
      </div>
    </div>

    <div class="digest" class:visible={phase >= 3}>
      <span>SHA-256</span>
      <code>{changedHash}</code>
    </div>
  </article>
</figure>

<style>
  figure {
    display: grid;
    grid-template-columns: 100% 0%;
    width: min(100%, 1040px);
    margin: 0;
    column-gap: 0%;
    justify-content: center;
    text-align: left;
    transition:
      grid-template-columns 620ms cubic-bezier(0.22, 1, 0.36, 1),
      column-gap 620ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  figure.compare {
    grid-template-columns: 49% 49%;
    column-gap: 2%;
  }

  .sample {
    position: relative;
    display: grid;
    grid-template-rows: minmax(0, 1fr) 3.8em auto;
    min-width: 0;
    transition:
      opacity 360ms ease,
      transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .changed {
    width: min(49cqw, 510px);
    opacity: 0;
    transform: translateX(1.5rem);
  }

  .changed.visible {
    opacity: 1;
    transform: translateX(0);
  }

  blockquote {
    max-width: none;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: clamp(11px, 1.08cqw, 17px);
    font-style: normal;
    line-height: 1.42;
    text-wrap: pretty;
  }

  mark {
    padding: 0 0.06em;
    border-radius: 0.12em;
    background: var(--accent);
    color: var(--background);
    font-weight: 700;
  }

  .conversion {
    position: relative;
    display: grid;
    place-items: center;
    min-height: 3.8em;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: clamp(9px, 0.78cqw, 13px);
    letter-spacing: var(--ui-letter-spacing);
    opacity: 0;
  }

  .conversion::before,
  .conversion::after {
    position: absolute;
    top: 50%;
    width: 28%;
    height: var(--border-width);
    background: var(--border-prominent);
    content: "";
    transform: scaleX(0);
  }

  .conversion::before {
    right: 58%;
    transform-origin: right;
  }

  .conversion::after {
    left: 58%;
    transform-origin: left;
  }

  .conversion.visible {
    opacity: 1;
  }

  .conversion.visible::before,
  .conversion.visible::after {
    transform: scaleX(0.12);
  }

  .conversion.active::before,
  .conversion.active::after {
    animation: contract 760ms 180ms ease-in both;
  }

  .algorithm {
    position: relative;
    z-index: 2;
    padding: 0.35em 0.7em;
    background: var(--background);
    color: var(--accent);
  }

  .particles {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .particles span {
    position: absolute;
    top: 50%;
    left: 50%;
    color: var(--accent);
    font-size: 1.25em;
    font-weight: var(--ui-weight);
    opacity: 0;
  }

  .conversion.active .particles span {
    animation: condense 900ms var(--d) cubic-bezier(0.65, 0, 0.35, 1) both;
  }

  .original .conversion.active::before,
  .original .conversion.active::after,
  .original .conversion.active .particles span {
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
  }

  .digest {
    display: grid;
    align-content: end;
    min-width: 0;
    opacity: 0;
    transform: translateY(0.5em);
  }

  .digest.visible {
    animation: digest-in 420ms 720ms ease-out both;
  }

  .digest > span {
    margin-bottom: 0.35em;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: clamp(8px, 0.7cqw, 11px);
    letter-spacing: var(--ui-letter-spacing);
    text-transform: uppercase;
  }

  figure .digest code {
    display: block;
    padding: 0;
    border-radius: 0;
    background: transparent;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: clamp(16px, 1.7cqw, 26px);
    font-weight: var(--ui-weight);
    line-height: 1.35;
    letter-spacing: 0.015em;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  @keyframes condense {
    0% {
      opacity: 0;
      transform: translate(calc(-50% + var(--x)), var(--y)) rotate(0deg)
        scale(1);
    }
    18% {
      opacity: 0.9;
    }
    70% {
      opacity: 0.75;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(var(--r)) scale(0.12);
    }
  }

  @keyframes contract {
    0% {
      transform: scaleX(0);
    }
    35% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0.12);
    }
  }

  @keyframes digest-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    figure,
    .sample,
    .conversion,
    .digest {
      transition: none;
    }

    .conversion.active::before,
    .conversion.active::after,
    .conversion.active .particles span {
      animation: none;
    }

    .conversion.active .algorithm,
    .digest.visible {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }
</style>
