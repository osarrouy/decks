<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();

    type Concentration = "low" | "high";

    let {
        revealAt = 1,
        concentration = "high",
        concentrateAtStep = null,
        animateConcentration = false,
    }: {
        revealAt?: number | null;
        concentration?: Concentration;
        concentrateAtStep?: number | null;
        animateConcentration?: boolean;
    } = $props();

    const chart = {
        left: 88,
        top: 48,
        right: 972,
        bottom: 500,
    };

    const pointCount = 192;
    const samplingExponent = 2;
    const epsilon = 0.01;
    const exponents: Record<Concentration, number> = {
        // With this offset, 1.30277 puts 80% of the area in the first 20%.
        low: 1.30277,
        high: 1.7,
    };

    function exponentFor(value: Concentration) {
        return exponents[value];
    }

    function createPoints(exponent: number, endPosition = 1) {
        const maxValue = Math.pow(epsilon, -exponent);

        return Array.from({ length: pointCount }, (_, index) => {
            const progress = index / (pointCount - 1);
            const position = Math.pow(progress, samplingExponent) * endPosition;
            const value = Math.pow(position + epsilon, -exponent) / maxValue;
            const x = chart.left + position * (chart.right - chart.left);
            const y = chart.top + (1 - value) * (chart.bottom - chart.top);

            return { x, y };
        });
    }

    function makePath(points: { x: number; y: number }[]) {
        return points
            .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
            .join(" ");
    }

    function visibilityShare(exponent: number, fraction: number) {
        const power = 1 - exponent;
        if (Math.abs(power) < 1e-8) {
            return Math.log((fraction + epsilon) / epsilon) / Math.log((1 + epsilon) / epsilon);
        }
        return (Math.pow(fraction + epsilon, power) - Math.pow(epsilon, power)) /
            (Math.pow(1 + epsilon, power) - Math.pow(epsilon, power));
    }

    let targetConcentration = $derived(
        concentrateAtStep !== null && $step >= concentrateAtStep
            ? "high"
            : concentration
    );
    let desiredExponent = $derived(exponentFor(targetConcentration));
    // Start at the requested step when a slide opens directly on that step.
    // svelte-ignore state_referenced_locally
    let renderedExponent = exponentFor(targetConcentration);
    let currentExponent = $state(renderedExponent);
    let prefersReducedMotion = $state(false);

    $effect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => { prefersReducedMotion = media.matches; };
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    });

    $effect(() => {
        const nextExponent = desiredExponent;
        if (nextExponent === renderedExponent) return;

        if (!animateConcentration || prefersReducedMotion) {
            renderedExponent = nextExponent;
            currentExponent = nextExponent;
            return;
        }

        const startExponent = renderedExponent;
        const startedAt = performance.now();
        let frame: number;
        const tick = (now: number) => {
            const progress = Math.min(1, (now - startedAt) / 900);
            const eased = 1 - Math.pow(1 - progress, 3);
            renderedExponent = startExponent + (nextExponent - startExponent) * eased;
            currentExponent = renderedExponent;
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    });

    let pointPath = $derived(makePath(createPoints(currentExponent)));
    let areaPath = $derived(`${pointPath} L ${chart.right} ${chart.bottom} L ${chart.left} ${chart.bottom} Z`);

    const paretoFraction = 0.2;
    const paretoX = chart.left + paretoFraction * (chart.right - chart.left);
    let paretoPoints = $derived(createPoints(currentExponent, paretoFraction));
    let paretoPath = $derived(`${makePath(paretoPoints)} L ${paretoX.toFixed(2)} ${chart.bottom} L ${chart.left} ${chart.bottom} Z`);
    let paretoPercentage = $derived(Math.round(100 * visibilityShare(currentExponent, paretoFraction)));

    let showPareto = $derived(revealAt !== null && $step >= revealAt);
</script>

<figure class="power-law" aria-label="Courbe rang-visibilité en loi de puissance, avec objets ou comptes classés par visibilité décroissante">
    <svg viewBox="0 0 1060 610" role="img">
        <title>Une minorité concentre une grande partie de la visibilité</title>
        <desc>
            Une courbe rang-visibilité décroissante part des objets ou comptes les mieux classés,
            puis se prolonge en une longue traîne de comptes classés plus bas et faiblement visibles.
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
            <text class="pareto-label pareto-label-bottom" x={paretoX + 18} y={chart.bottom - 18}>≈ {paretoPercentage} % de la visibilité</text>
            <text class="tail-label" x={chart.right - 8} y={chart.bottom - 20} text-anchor="end">longue traîne</text>
        </g>

        <text class="axis-label axis-label-y" x={chart.left} y={chart.top - 10}>VISIBILITÉ</text>
        <text class="axis-label axis-label-x" x={chart.right} y={chart.bottom + 42} text-anchor="end">OBJETS / COMPTES · RANG DE VISIBILITÉ DÉCROISSANT</text>
    </svg>
</figure>

<style>
    .power-law {
        width: min(100%, 78rem, calc(100cqh * 1060 / 610));
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
        stroke-linecap: round;
        stroke-linejoin: round;
        shape-rendering: geometricPrecision;
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
    .axis-label {
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

    @media (prefers-reduced-motion: reduce) {
        .pareto-layer {
            transition: none;
        }
    }

    @media (max-width: 700px) {
        .power-law {
            margin-top: 0;
        }

        .pareto-label,
        .tail-label,
        .axis-label {
            font-size: 15px;
        }
    }
</style>
