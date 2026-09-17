<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();

    $: circular = $step >= 1;
</script>

<div
    class="causality"
    data-linear="true"
    data-circular={circular}
    role="img"
    aria-label="Première étape : A produit B selon une causalité linéaire. Seconde étape : une flèche revient de B vers A et forme une boucle de rétroaction."
>
    <svg viewBox="0 0 1000 440" aria-hidden="true">
        <defs>
            <marker
                id="causal-arrow"
                markerWidth="9"
                markerHeight="9"
                refX="8"
                refY="4.5"
                orient="auto"
            >
                <path d="M0 0 L9 4.5 L0 9 Z" fill="var(--accent)"></path>
            </marker>
        </defs>

        <text class="letter letter-a" x="250" y="190" text-anchor="middle"
            >A</text
        >
        <text class="letter letter-b" x="750" y="190" text-anchor="middle"
            >B</text
        >

        <path class="forward-arrow" d="M330 160 H670"></path>
        <path class="feedback-arrow" d="M750 215 V350 H250 V215"></path>
    </svg>
</div>

<style>
    .causality {
        display: grid;
        width: 100%;
        min-height: min(48vh, 29rem);
        place-items: center;
    }

    svg {
        display: block;
        width: min(100%, 62rem);
        height: min(46vh, 27rem);
        overflow: visible;
    }

    .letter {
        fill: var(--accent);
        font-family: var(--font-mono);
        font-size: 104px;
        font-weight: 200;
        opacity: 0.28;
        transition: opacity 260ms ease;
    }

    .forward-arrow,
    .feedback-arrow {
        fill: none;
        marker-end: url(#causal-arrow);
        stroke: var(--accent);
        stroke-linecap: square;
        stroke-linejoin: miter;
        stroke-width: 2;
        opacity: 0;
        transition: opacity 320ms ease;
        vector-effect: non-scaling-stroke;
    }

    .causality[data-linear="true"] .letter,
    .causality[data-linear="true"] .forward-arrow,
    .causality[data-circular="true"] .feedback-arrow {
        opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
        .causality * {
            transition: none !important;
        }
    }
</style>
