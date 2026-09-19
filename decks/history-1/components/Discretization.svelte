<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();
    const gridSize = 7;
    const coordinates = Array.from(
        { length: gridSize + 1 },
        (_, index) => index,
    );
    const levels = [
        [255, 255, 255, 255, 192, 0, 255],
        [255, 255, 255, 255, 160, 32, 255],
        [255, 255, 255, 128, 0, 128, 255],
        [255, 255, 128, 0, 128, 255, 255],
        [255, 128, 0, 255, 255, 255, 255],
        [255, 0, 128, 255, 255, 255, 255],
        [255, 224, 255, 255, 255, 255, 255],
    ];
    const formatLevel = (level: number) => String(level);
    const textColor = (level: number) => (level < 128 ? "#fff" : "var(--text-prominent)");
</script>

<div
    class="discretization"
    aria-label="Les trois étapes de la numérisation d’une image"
>
    <section class="stage" data-active={$step >= 0} data-current={$step === 0}>
        <header>
            <span class="stage-number">01</span>
            <div>
                <strong>continu</strong>
                <small>l’image analogique</small>
            </div>
        </header>

        <svg
            class="image continuous"
            viewBox="0 0 240 240"
            role="img"
            aria-label="Une forme continue"
        >
            <rect class="frame" x="8" y="8" width="224" height="224" />
            <path
                class="curve"
                d="M 62 190 C 68 165 77 139 96 121 C 112 106 130 102 147 90 C 164 78 173 59 178 39"
            />
        </svg>
    </section>

    <div class="arrow" data-active={$step >= 1} aria-hidden="true">→</div>

    <section class="stage" data-active={$step >= 1} data-current={$step === 1}>
        <header>
            <span class="stage-number">02</span>
            <div>
                <strong>échantillonnée</strong>
                <small>la grille de pixels</small>
            </div>
        </header>

        <svg
            class="image sampled"
            viewBox="0 0 240 240"
            role="img"
            aria-label="La même forme découpée par une grille de pixels"
        >
            <rect class="frame" x="8" y="8" width="224" height="224" />
            <path
                class="curve"
                d="M 62 190 C 68 165 77 139 96 121 C 112 106 130 102 147 90 C 164 78 173 59 178 39"
            />
            <g class="grid">
                {#each coordinates as coordinate}
                    <line
                        x1={8 + coordinate * 32}
                        y1="8"
                        x2={8 + coordinate * 32}
                        y2="232"
                    />
                    <line
                        x1="8"
                        y1={8 + coordinate * 32}
                        x2="232"
                        y2={8 + coordinate * 32}
                    />
                {/each}
            </g>
        </svg>
    </section>

    <div class="arrow" data-active={$step >= 2} aria-hidden="true">→</div>

    <section class="stage" data-active={$step >= 2} data-current={$step >= 2}>
        <header>
            <span class="stage-number">03</span>
            <div>
                <strong>codée</strong>
                <small>les niveaux de gris</small>
            </div>
        </header>

        <svg
            class="image encoded"
            viewBox="0 0 240 240"
            role="img"
            aria-label="Une grille de pixels codés par des niveaux de gris"
        >
            <rect class="frame" x="8" y="8" width="224" height="224" />
            {#each levels as row, rowIndex}
                {#each row as level, columnIndex}
                    <rect
                        class="pixel"
                        x={8 + columnIndex * 32}
                        y={8 + rowIndex * 32}
                        width="32"
                        height="32"
                        style={`--level: ${level}`}
                    />
                    <text
                        class="pixel-value"
                        x={24 + columnIndex * 32}
                        y={27 + rowIndex * 32}
                        fill={textColor(level)}>{formatLevel(level)}</text
                    >
                {/each}
            {/each}
        </svg>

        <div class="encoding">
            <span>0 = noir</span>
            <span>255 = blanc</span>
            <strong>pixel ∈ 0 … 255</strong>
        </div>
    </section>
</div>

<style>
    .discretization {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(
                0,
                1fr
            );
        gap: clamp(0.55rem, 1.15vw, 1.1rem);
        align-items: center;
        width: 100%;
        min-height: min(62vh, 39rem);
    }

    .stage {
        display: grid;
        gap: 0.8rem;
        min-width: 0;
        padding: clamp(0.7rem, 1.25vw, 1.2rem);
        border: 1px solid color-mix(in srgb, var(--text-prominent), transparent 84%);
        background: color-mix(in srgb, var(--background), var(--text-prominent) 3%);
        opacity: 0.28;
        transform: translateY(0.45rem);
        transition:
            opacity 260ms ease,
            transform 260ms ease,
            border-color 260ms ease,
            background 260ms ease;
    }

    .stage[data-active="true"] {
        opacity: 0.72;
        transform: translateY(0);
    }

    .stage[data-current="true"] {
        opacity: 1;
        border-color: var(--accent);
        background: color-mix(in srgb, var(--accent), var(--background) 94%);
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent), transparent 70%);
    }

    header {
        display: flex;
        align-items: baseline;
        gap: 0.7rem;
        min-height: 2.8rem;
    }

    .stage-number,
    small,
    p,
    .encoding,
    .pixel-value {
        font-family: var(--font-mono);
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .stage-number {
        color: var(--accent);
        font-size: clamp(0.62rem, 0.8vw, 0.82rem);
    }

    header div {
        display: grid;
        gap: 0.2rem;
    }

    strong {
        color: var(--text-prominent);
        font-family: var(--font-serif);
        font-size: clamp(1.25rem, 2vw, 2rem);
        font-style: italic;
        font-weight: 300;
        letter-spacing: -0.04em;
        line-height: 0.95;
    }

    small {
        color: var(--text-muted);
        font-size: clamp(0.48rem, 0.62vw, 0.68rem);
    }

    .image {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 1;
    }

    .frame {
        fill: none;
        stroke: color-mix(in srgb, var(--text-prominent), transparent 68%);
        stroke-width: 1;
    }

    .curve {
        fill: none;
        stroke: var(--text-prominent);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 24;
    }

    .sampled .curve {
        opacity: 0.86;
    }

    .grid {
        fill: none;
        stroke: var(--accent);
        stroke-opacity: 0.74;
        stroke-width: 1.25;
    }

    .pixel {
        fill: rgb(var(--level) var(--level) var(--level));
        stroke: color-mix(in srgb, var(--background), var(--text-prominent) 38%);
        stroke-width: 1;
    }

    .pixel-value {
        font-size: 6px;
        letter-spacing: 0;
        text-anchor: middle;
    }

    p {
        margin: 0;
        color: var(--text-muted);
        font-size: clamp(0.53rem, 0.72vw, 0.76rem);
        line-height: 1.4;
    }

    em {
        color: var(--accent);
        font-style: normal;
    }

    .arrow {
        color: var(--accent);
        font-size: clamp(1.3rem, 2.2vw, 2.2rem);
        opacity: 0.14;
        transform: translateX(-0.25rem);
        transition:
            opacity 260ms ease,
            transform 260ms ease;
    }

    .arrow[data-active="true"] {
        opacity: 1;
        transform: translateX(0);
    }

    .encoding {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0.35rem 0.7rem;
        color: var(--text-muted);
        font-size: clamp(0.46rem, 0.6vw, 0.64rem);
    }

    .encoding strong {
        width: 100%;
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(0.52rem, 0.68vw, 0.72rem);
        font-style: normal;
        letter-spacing: 0.08em;
        line-height: 1.2;
    }

    @media (max-width: 900px) {
        .discretization {
            grid-template-columns: 1fr;
            gap: 0.7rem;
        }

        .arrow {
            justify-self: center;
            transform: rotate(90deg);
        }

        .arrow[data-active="true"] {
            transform: rotate(90deg);
        }
    }
</style>
