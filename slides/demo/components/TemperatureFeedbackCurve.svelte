<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();

    $: started = $step >= 1;
    $: settled = $step >= 2;
    $: oscillating = $step >= 3;
    $: explained = $step >= 4;
    $: status = explained
        ? "La rétroaction négative ne suffit pas : son gain et son délai déterminent si elle amortit ou entretient les oscillations."
        : oscillating
          ? "Mal réglées, des corrections trop fortes ou trop tardives entretiennent l’oscillation."
          : settled
            ? "Bien réglées, les corrections diminuent à mesure que la température approche de la consigne."
            : started
              ? "Chaque écart déclenche une correction de sens opposé."
              : "La consigne fixe une température cible de 20 °C.";
</script>

<div
    class="feedback-curves"
    data-started={started}
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

    <svg class="chart" viewBox="0 0 1000 470" aria-hidden="true">
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
            <line x1="92" y1="70" x2="92" y2="420"></line>
            <line x1="92" y1="420" x2="950" y2="420"></line>
            <line x1="92" y1="310" x2="950" y2="310"></line>
            <line x1="92" y1="230" x2="950" y2="230"></line>
            <line x1="92" y1="150" x2="950" y2="150"></line>
        </g>

        <g class="axes">
            <text x="44" y="76">24 °C</text>
            <text x="44" y="236">20 °C</text>
            <text x="44" y="396">16 °C</text>
            <text x="92" y="452">début</text>
            <text x="900" y="452">temps</text>
            <text
                class="axis-title"
                x="24"
                y="262"
                transform="rotate(-90 24 262)">température de la pièce</text
            >
        </g>

        <rect class="comfort-band" x="92" y="210" width="858" height="40" rx="4"
        ></rect>
        <line class="setpoint-line" x1="92" y1="230" x2="950" y2="230"></line>
        <text class="setpoint-label" x="934" y="218" text-anchor="end"
            >consigne</text
        >

        <circle class="start-point" cx="92" cy="390" r="6"></circle>

        <path
            class="curve stable-curve"
            pathLength="1"
            d="M92 390 C145 380 177 285 230 188 C278 118 330 202 383 247 C437 288 492 234 548 218 C612 200 668 229 727 233 C790 237 848 228 950 230"
        ></path>

        <path
            class="curve unstable-curve"
            pathLength="1"
            d="M92 390 C145 378 176 230 230 105 C283 42 329 300 390 365 C452 425 493 122 555 80 C618 35 662 350 726 385 C790 418 834 98 895 78 C920 70 936 150 950 196"
        ></path>

        <g class="corrections">
            <line x1="176" y1="330" x2="176" y2="252"></line>
            <text x="188" y="295">chauffer</text>
            <line x1="313" y1="164" x2="313" y2="207"></line>
            <text x="325" y="182">ralentir</text>
        </g>

        <g class="stable-label">
            <line x1="720" y1="234" x2="782" y2="278"></line>
            <text x="790" y="282">écart amorti</text>
        </g>

        <g class="tuning-labels">
            <line x1="230" y1="105" x2="294" y2="82"></line>
            <text x="304" y="86">correction trop forte</text>
            <line x1="726" y1="385" x2="786" y2="354"></line>
            <text x="796" y="358">correction trop tardive</text>
        </g>
    </svg>

    <div class="comparison">
        <div class="comparison-card stable-card" data-active={settled}>
            <strong>Stabilisation</strong>
            <span>Les corrections deviennent plus petites.</span>
        </div>
        <div class="comparison-card unstable-card" data-active={oscillating}>
            <strong>Oscillation entretenue</strong>
            <span>Le système dépasse sans cesse sa cible.</span>
        </div>
    </div>

    <p class="status" aria-live="polite">{status}</p>
</div>

<style>
    .feedback-curves {
        --unstable: #d56f3e;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto auto;
        gap: clamp(0.35rem, 0.7vw, 0.65rem);
        width: 100%;
        min-height: min(57vh, 35rem);
        padding: clamp(0.8rem, 1.3vw, 1.2rem) clamp(1rem, 1.7vw, 1.5rem);
        border: 1px solid color-mix(in srgb, var(--fg), transparent 86%);
        border-radius: 1.2rem;
        background: color-mix(in srgb, var(--bg), var(--fg) 2%);
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
    .corrections text,
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
        stroke-dashoffset: 0.48;
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

    .corrections,
    .stable-label,
    .tuning-labels {
        opacity: 0;
        transition: opacity 260ms ease;
    }

    .corrections line {
        marker-end: url(#correction-arrow);
        stroke: var(--accent);
        stroke-width: 1.7;
        vector-effect: non-scaling-stroke;
    }

    .corrections text,
    .stable-label text {
        fill: var(--accent);
    }

    .feedback-curves[data-started="true"] .corrections,
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

    .comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(0.7rem, 1.2vw, 1.1rem);
    }

    .comparison-card {
        display: flex;
        gap: 0.7rem;
        align-items: baseline;
        padding: 0.55rem 0.75rem;
        border: 1px solid color-mix(in srgb, var(--fg), transparent 88%);
        border-radius: 0.6rem;
        opacity: 0.24;
        transition:
            opacity 260ms ease,
            border-color 260ms ease;
    }

    .comparison-card strong {
        font-family: var(--font-mono);
        font-size: clamp(0.67rem, 0.78vw, 0.82rem);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .comparison-card span {
        color: var(--muted);
        font-size: clamp(0.72rem, 0.86vw, 0.9rem);
    }

    .stable-card strong {
        color: var(--accent);
    }

    .unstable-card strong {
        color: var(--unstable);
    }

    .comparison-card[data-active="true"] {
        border-color: color-mix(in srgb, var(--fg), transparent 76%);
        opacity: 1;
    }

    .status {
        min-height: 1.4em;
        margin: 0;
        color: var(--muted);
        font-size: clamp(0.78rem, 0.94vw, 0.96rem);
        text-align: center;
    }

    @media (prefers-reduced-motion: reduce) {
        .feedback-curves *,
        .feedback-curves *::before,
        .feedback-curves *::after {
            transition: none !important;
        }
    }
</style>
