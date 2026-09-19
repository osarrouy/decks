<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();

    type Concentration = "low" | "high";

    export let revealAt = 1;
    export let concentration: Concentration = "high";
    export let concentrateAtStep: number | null = null;
    export let animateConcentration = false;

    const chart = {
        left: 88,
        top: 48,
        right: 972,
        bottom: 500,
    };

    const pointCount = 96;
    const epsilon = 0.01;
    const exponents: Record<Concentration, number> = {
        low: 0.65,
        high: 1.3,
    };

    function exponentFor(value: Concentration) {
        return exponents[value];
    }

    function createPoints(exponent: number) {
        const maxValue = Math.pow(epsilon, -exponent);

        return Array.from({ length: pointCount }, (_, index) => {
            const position = index / (pointCount - 1);
            const value = Math.pow(position + epsilon, -exponent) / maxValue;
            const x = chart.left + position * (chart.right - chart.left);
            const y = chart.top + (1 - value) * (chart.bottom - chart.top);

            return { x, y };
        });
    }

    function makePath(points: { x: number; y: number }[]) {
        return points
            .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
            .join(" ");
    }

    let currentExponent = exponentFor(concentration);
    let lastDesiredExponent = currentExponent;
    let animationComplete = concentration === "high";
    let animationToken = 0;

    function animateExponent(nextExponent: number) {
        const token = ++animationToken;
        const startExponent = currentExponent;
        const duration = 900;

        animationComplete = false;

        if (typeof window === "undefined") {
            currentExponent = nextExponent;
            animationComplete = true;
            return;
        }

        const startedAt = performance.now();
        const tick = (now: number) => {
            if (token !== animationToken) return;

            const progress = Math.min(1, (now - startedAt) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            currentExponent = startExponent + (nextExponent - startExponent) * eased;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                animationComplete = true;
            }
        };

        requestAnimationFrame(tick);
    }

    $: targetConcentration =
        concentrateAtStep !== null && $step >= concentrateAtStep
            ? "high"
            : concentration;
    $: desiredExponent = exponentFor(targetConcentration);

    $: if (desiredExponent !== lastDesiredExponent) {
        lastDesiredExponent = desiredExponent;

        if (animateConcentration) {
            animateExponent(desiredExponent);
        } else {
            currentExponent = desiredExponent;
            animationComplete = true;
        }
    }

    $: points = createPoints(currentExponent);
    $: pointPath = makePath(points);
    $: areaPath = `${pointPath} L ${chart.right} ${chart.bottom} L ${chart.left} ${chart.bottom} Z`;

    const highPoints = createPoints(exponentFor("high"));
    const paretoEndIndex = Math.round((pointCount - 1) * 0.2);
    const paretoPoints = highPoints.slice(0, paretoEndIndex + 1);
    const paretoPath = `${makePath(paretoPoints)} L ${paretoPoints[paretoPoints.length - 1].x.toFixed(1)} ${chart.bottom} L ${chart.left} ${chart.bottom} Z`;
    const paretoX = chart.left + 0.2 * (chart.right - chart.left);

    $: showPareto =
        $step >= revealAt &&
        targetConcentration === "high" &&
        (!animateConcentration || animationComplete);
    $: concentrationLabel =
        currentExponent > (exponents.low + exponents.high) / 2
            ? "forte concentration"
            : "distribution plus diffuse";
</script>

<figure class="power-law" aria-label="Courbe rang-visibilité en loi de puissance, avec objets ou comptes classés par visibilité décroissante, et illustration du principe 80-20">
    <svg viewBox="0 0 1060 610" role="img">
        <title>Une minorité concentre une grande partie de la visibilité</title>
        <desc>
            Une courbe rang-visibilité décroissante montre une forte concentration de la visibilité sur les objets ou comptes les mieux classés,
            puis une longue traîne de comptes classés plus bas et faiblement visibles.
        </desc>

        <g class="chart-axis" aria-hidden="true">
            <line x1={chart.left} y1={chart.top} x2={chart.left} y2={chart.bottom} />
            <line x1={chart.left} y1={chart.bottom} x2={chart.right} y2={chart.bottom} />
        </g>

        <path class="distribution-area" d={areaPath} aria-hidden="true" />
        <path class="distribution-line" d={pointPath} aria-hidden="true" />

        <g class="pareto-layer" data-visible={showPareto} aria-hidden={!showPareto}>
            <path class="pareto-area" d={paretoPath} />
            <line class="pareto-guide" x1={paretoX} y1={chart.top} x2={paretoX} y2={chart.bottom} />
            <text class="pareto-label pareto-label-top" x={chart.left + 22} y={chart.top + 38}>20 % des objets</text>
            <text class="pareto-label pareto-label-bottom" x={paretoX + 18} y={chart.bottom - 18}>≈ 80 % de la visibilité</text>
            <text class="tail-label" x={chart.right - 8} y={chart.bottom - 20} text-anchor="end">longue traîne</text>
        </g>

        <text class="axis-label axis-label-y" x={chart.left - 28} y={chart.top - 10} text-anchor="end">VISIBILITÉ</text>
        <text class="axis-label axis-label-x" x={chart.right} y={chart.bottom + 42} text-anchor="end">OBJETS / COMPTES · RANG DE VISIBILITÉ DÉCROISSANT</text>
        <text class="curve-note" x={chart.left + 28} y={chart.top + 112}>{concentrationLabel}</text>
    </svg>
</figure>

<style>
    .power-law {
        width: min(100%, 78rem);
        margin: 1rem auto 0;
        color: var(--text-prominent);
    }

    .power-law svg {
        display: block;
        width: 100%;
        height: auto;
        overflow: visible;
    }

    .chart-axis {
        stroke: var(--accent);
        stroke-width: 1;
    }

    .distribution-area {
        fill: none;
    }

    .distribution-line {
        fill: none;
        stroke: var(--accent);
        stroke-width: 1.5;
        vector-effect: non-scaling-stroke;
    }

    .pareto-layer {
        opacity: 0;
        transition: opacity 420ms ease;
    }

    .pareto-layer[data-visible='true'] {
        opacity: 1;
    }

    .pareto-area {
        fill: color-mix(in srgb, var(--accent) 72%, transparent);
    }

    .pareto-guide {
        stroke: var(--accent);
        stroke-dasharray: 7 8;
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
    }

    .pareto-label,
    .tail-label,
    .axis-label,
    .curve-note {
        fill: var(--text-prominent);
        font-family: var(--font-mono);
        font-size: 18px;
        font-weight: 300;
        letter-spacing: 0.04em;
    }

    .pareto-label-top,
    .pareto-label-bottom {
        fill: var(--accent);
        font-weight: 500;
    }

    .tail-label {
        fill: var(--text-muted);
    }

    .axis-label {
        fill: var(--text-muted);
        font-size: 15px;
        letter-spacing: 0.14em;
    }

    .curve-note {
        fill: var(--text-muted);
        font-size: 16px;
        font-style: italic;
    }

    @media (max-width: 700px) {
        .power-law {
            margin-top: 0;
        }

        .pareto-label,
        .tail-label,
        .axis-label,
        .curve-note {
            font-size: 15px;
        }
    }
</style>
