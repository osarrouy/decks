<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();
    const chartStart = 92;
    const originalChartEnd = 950;
    const chartEnd = 1160;
    const setpoint = 230;
    const sampleCount = 260;

    function temperatureAt(progress: number) {
        return (
            setpoint +
            160 * Math.exp(-1.2 * progress) * Math.cos(8.2 * progress)
        );
    }

    function temperatureSlope(progress: number) {
        return (
            160 *
            Math.exp(-1.2 * progress) *
            (-1.2 * Math.cos(8.2 * progress) - 8.2 * Math.sin(8.2 * progress))
        );
    }

    function temperatureAtX(x: number) {
        const progress = (x - chartStart) / (originalChartEnd - chartStart);
        if (x <= originalChartEnd) return temperatureAt(progress);

        const extension =
            (x - originalChartEnd) / (chartEnd - originalChartEnd);
        const endpointDelta = temperatureAt(1) - setpoint;
        const endpointSlope =
            (temperatureSlope(1) / (originalChartEnd - chartStart)) *
            (chartEnd - originalChartEnd);
        const decay = 4;
        const linearTerm = decay * endpointDelta + endpointSlope;

        return (
            setpoint +
            (endpointDelta + linearTerm * extension) *
                Math.exp(-decay * extension)
        );
    }

    function stablePath() {
        const points = Array.from({ length: sampleCount + 1 }, (_, index) => {
            const x =
                chartStart + ((chartEnd - chartStart) * index) / sampleCount;
            return { x, y: temperatureAtX(x) };
        });

        return points.reduce((path, point, index) => {
            if (index === 0) return `M${point.x} ${point.y}`;

            const previous = points[index - 1];
            const before = points[Math.max(0, index - 2)];
            const after = points[Math.min(points.length - 1, index + 1)];
            const controlIn = {
                x: previous.x + (point.x - before.x) / 6,
                y: previous.y + (point.y - before.y) / 6,
            };
            const controlOut = {
                x: point.x - (after.x - previous.x) / 6,
                y: point.y - (after.y - previous.y) / 6,
            };

            return `${path} C${controlIn.x} ${controlIn.y} ${controlOut.x} ${controlOut.y} ${point.x} ${point.y}`;
        }, "");
    }

    const stablePathData = stablePath();

    $: started = $step >= 1;
    $: cooled = $step >= 2;
    $: settled = $step >= 3;
    $: oscillating = $step >= 4;
    $: explained = $step >= 5;
</script>

<div
    class="feedback-curves"
    data-started={started}
    data-cooled={cooled}
    data-settled={settled}
    data-oscillating={oscillating}
    data-explained={explained}
    role="img"
    aria-label="Graphique comparant deux régulations par rétroaction négative. Une courbe bien réglée oscille de moins en moins et se stabilise autour de vingt degrés. Une courbe mal réglée dépasse continuellement la consigne à cause de corrections trop fortes ou trop tardives."
>
    <div class="legend" aria-hidden="true">
        <span class="setpoint-key">consigne · 20 °C</span>
        <span class="stable-key" data-active={settled}>boucle bien réglée</span>
        <span class="unstable-key" data-active={oscillating}
            >boucle mal réglée</span
        >
    </div>

    <svg class="chart" viewBox="0 0 1200 470" aria-hidden="true">
        <defs>
            <marker
                id="correction-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
            >
                <path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)"></path>
            </marker>
        </defs>

        <g class="grid">
            <line x1="92" y1="420" x2="1160" y2="420"></line>
            <line x1="92" y1="310" x2="1160" y2="310"></line>
            <line x1="92" y1="230" x2="1160" y2="230"></line>
            <line x1="92" y1="150" x2="1160" y2="150"></line>
        </g>
        <g class="axes">
            <text x="44" y="76">24 °C</text>
            <text x="44" y="236">20 °C</text>
            <text x="44" y="396">16 °C</text>
            <text x="92" y="452">début</text>
            <text x="1110" y="452">temps</text>
            <text
                class="axis-title"
                x="24"
                y="262"
                transform="rotate(-90 24 262)">température de la pièce</text
            >
        </g>
        <rect
            class="comfort-band"
            x="92"
            y="210"
            width="1068"
            height="40"
            rx="4"
        ></rect>
        <line class="setpoint-line" x1="92" y1="230" x2="1160" y2="230"></line>
        <text class="setpoint-label" x="1148" y="218" text-anchor="end"
            >consigne</text
        >

        <circle class="start-point" cx="92" cy="390" r="6"></circle>

        <path class="curve stable-curve" pathLength="1" d={stablePathData}
        ></path>

        <path
            class="curve unstable-curve"
            pathLength="1"
            d="M92 390 C145 378 176 230 230 105 C283 42 329 300 390 365 C452 425 493 122 555 80 C618 35 662 350 726 385 C790 418 834 98 895 78 C948 70 1040 150 1160 196"
        ></path>

        <g class="heating-correction">
            <line x1="176" y1="330" x2="176" y2="252"></line>
            <text x="188" y="295">chauffer</text>
        </g>

        <g class="cooling-correction">
            <line x1="405" y1="128" x2="405" y2="183"></line>
            <text x="417" y="166">couper le chauffage</text>
        </g>

        <g class="stable-label">
            <line x1="900" y1="226" x2="970" y2="270"></line>
            <text x="978" y="274">écart amorti</text>
        </g>

        <g class="tuning-labels">
            <line x1="230" y1="105" x2="294" y2="82"></line>
            <text x="304" y="86">correction trop forte</text>
            <line x1="726" y1="385" x2="786" y2="354"></line>
            <text x="796" y="358">correction trop tardive</text>
        </g>
    </svg>
</div>

<style>
    .feedback-curves {
        --unstable: #d56f3e;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        gap: clamp(0.35rem, 0.7vw, 0.65rem);
        width: 100%;
        min-height: min(57vh, 35rem);
    }

    .legend {
        display: flex;
        gap: clamp(0.8rem, 2vw, 2rem);
        justify-content: flex-end;
        align-items: center;
        min-height: 1.5rem;
        font-family: var(--font-mono);
        font-size: clamp(0.58rem, 0.72vw, 0.75rem);
        letter-spacing: 0.07em;
        text-transform: uppercase;
    }
    .legend span {
        position: relative;
        padding-left: 1.8rem;
        color: var(--muted);
        opacity: 0.28;
        transition: opacity 260ms ease;
    }

    .legend span::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 1.3rem;
        border-top: 2px solid currentColor;
        content: "";
        transform: translateY(-50%);
    }

    .legend .setpoint-key {
        opacity: 1;
    }

    .legend .setpoint-key::before {
        border-top-style: dashed;
    }

    .legend .stable-key {
        color: var(--accent);
    }

    .legend .unstable-key {
        color: var(--unstable);
    }

    .legend span[data-active="true"] {
        opacity: 1;
    }

    .chart {
        display: block;
        width: 100%;
        height: min(38vh, 23rem);
        overflow: visible;
    }

    .grid line {
        stroke: color-mix(in srgb, var(--fg), transparent 91%);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
    }

    .grid line:first-child,
    .grid line:nth-child(2) {
        stroke: color-mix(in srgb, var(--fg), transparent 68%);
    }

    .axes text,
    .setpoint-label,
    .heating-correction text,
    .cooling-correction text,
    .stable-label text,
    .tuning-labels text {
        fill: var(--muted);
        font-family: var(--font-mono);
        font-size: 14px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .axes .axis-title {
        font-size: 12px;
    }

    .comfort-band {
        fill: color-mix(in srgb, var(--accent), transparent 91%);
        opacity: 0;
        transition: opacity 300ms ease;
    }

    .feedback-curves[data-settled="true"] .comfort-band {
        opacity: 1;
    }

    .setpoint-line {
        stroke: color-mix(in srgb, var(--fg), transparent 45%);
        stroke-dasharray: 7 8;
        stroke-width: 1.5;
        vector-effect: non-scaling-stroke;
    }

    .setpoint-label {
        fill: var(--fg);
    }

    .start-point {
        fill: var(--accent);
        opacity: 0.4;
    }

    .curve {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 4;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        transition:
            stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 300ms ease;
        vector-effect: non-scaling-stroke;
    }

    .stable-curve {
        stroke: var(--accent);
    }

    .feedback-curves[data-started="true"] .stable-curve {
        stroke-dashoffset: 0.8;
    }

    .feedback-curves[data-cooled="true"] .stable-curve {
        stroke-dashoffset: 0;
    }

    .feedback-curves[data-settled="true"] .stable-curve {
        stroke-dashoffset: 0;
    }

    .unstable-curve {
        stroke: var(--unstable);
        stroke-dasharray: 0.025 0.014;
        opacity: 0;
    }

    .feedback-curves[data-oscillating="true"] .unstable-curve {
        stroke-dashoffset: 0;
        opacity: 1;
    }

    .heating-correction,
    .cooling-correction,
    .stable-label,
    .tuning-labels {
        opacity: 0;
        transition: opacity 260ms ease;
    }

    .heating-correction line,
    .cooling-correction line {
        marker-end: url(#correction-arrow);
        stroke: var(--accent);
        stroke-width: 1.7;
        vector-effect: non-scaling-stroke;
    }

    .heating-correction text,
    .cooling-correction text,
    .stable-label text {
        fill: var(--accent);
    }

    .feedback-curves[data-started="true"] .heating-correction,
    .feedback-curves[data-cooled="true"] .cooling-correction,
    .feedback-curves[data-settled="true"] .stable-label,
    .feedback-curves[data-explained="true"] .tuning-labels {
        opacity: 1;
    }

    .stable-label line {
        stroke: var(--accent);
        stroke-width: 1.5;
        vector-effect: non-scaling-stroke;
    }

    .tuning-labels line {
        stroke: var(--unstable);
        stroke-width: 1.5;
        vector-effect: non-scaling-stroke;
    }

    .tuning-labels text {
        fill: var(--unstable);
    }

    @media (prefers-reduced-motion: reduce) {
        .feedback-curves *,
        .feedback-curves *::before,
        .feedback-curves *::after {
            transition: none !important;
        }
    }
</style>
