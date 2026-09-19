<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();
    const initialCells = ["□", "1", "0", "1", "□"];

    $: currentStep = Math.min($step, 3);
    $: headIndex = currentStep >= 3 ? 2 : 1;
    $: state = currentStep >= 3 ? "q₁" : "q₀";
    $: cells = currentStep >= 2 ? ["□", "0", "0", "1", "□"] : initialCells;
    $: stepLabel = [
        "configuration initiale",
        "lire le symbole",
        "écrire un symbole",
        "se déplacer et changer d’état",
    ][currentStep];
    $: action = [
        "La tête se trouve sur la case contenant 1.",
        "La règle sélectionnée dépend de l’état q₀ et du symbole 1.",
        "La machine remplace 1 par 0.",
        "La tête se déplace à droite et passe dans l’état q₁.",
    ][currentStep];
</script>

<div
    class="turing-machine"
    aria-label="Animation d’une machine de Turing : lire 1, écrire 0, puis avancer d’une case"
>
    <div class="machine-heading">
        <div>
            <span class="eyebrow">une règle d’exécution</span>
            <h3>Machine de Turing</h3>
        </div>
        <div class="state-indicator" data-state={state}>
            <span>état interne</span>
            <strong>{state}</strong>
        </div>
    </div>

    <div class="rule-layout">
        <section
            class="tape-panel"
            aria-label="Ruban et tête de lecture-écriture"
        >
            <div class="panel-label">
                <span>ruban / mémoire</span>
                <span>cases</span>
            </div>
            <div class="tape-viewport">
                <div class="tape">
                    {#each cells as cell, index}
                        <div
                            class="cell"
                            class:head-cell={index === headIndex}
                            class:changed={currentStep >= 2 && index === 1}
                            data-index={index - 2}
                        >
                            <span class="cell-value">{cell}</span>
                            {#if index === headIndex}
                                <div class="head" aria-hidden="true">
                                    <span>tête</span>
                                    <i></i>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="tape-caption">
                <span>← gauche</span>
                <strong
                    >symbole sous la tête : {currentStep >= 2
                        ? "0"
                        : "1"}</strong
                >
                <span>droite →</span>
            </div>
        </section>

        <section class="transition-panel" aria-label="Règle de transition">
            <div class="panel-label">
                <span>table des règles</span>
                <span>si… alors…</span>
            </div>
            <div class="rule" data-active={currentStep >= 1}>
                <span class="rule-state">q₀</span>
                <span class="rule-symbol">+</span>
                <span class="rule-symbol">1</span>
                <span class="rule-arrow">→</span>
                <span class="rule-output">0</span>
                <span class="rule-move">→</span>
                <span class="rule-state next">q₁</span>
            </div>
            <p class="rule-caption">
                lire&nbsp; 1&nbsp; · &nbsp;écrire&nbsp; 0&nbsp; ·
                &nbsp;avancer&nbsp; →
            </p>
        </section>
    </div>

    <div class="progression" aria-live="polite">
        <div class="progression-marker">
            {#each [0, 1, 2, 3] as marker}
                <span
                    class:active={currentStep >= marker}
                    class:current={currentStep === marker}
                ></span>
            {/each}
        </div>
        <div class="progression-copy">
            <strong>{stepLabel}</strong>
            <span>{action}</span>
        </div>
    </div>
</div>

<style>
    .turing-machine {
        display: grid;
        gap: clamp(1rem, 2.2vh, 1.65rem);
        width: min(100%, 64rem);
        margin: 0 auto;
        padding: clamp(1rem, 2.5vw, 2rem);
        border: 1px solid color-mix(in srgb, var(--text-prominent), transparent 78%);
        background: color-mix(in srgb, var(--background), var(--text-prominent) 3%);
        box-shadow: 0 1rem 3rem color-mix(in srgb, var(--background), transparent 35%);
    }

    .machine-heading,
    .panel-label,
    .tape-caption,
    .progression {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .machine-heading {
        align-items: end;
        border-bottom: 1px solid color-mix(in srgb, var(--text-prominent), transparent 86%);
        padding-bottom: 0.8rem;
    }

    .eyebrow,
    .panel-label,
    .state-indicator,
    .tape-caption,
    .rule-caption,
    .progression-copy span {
        color: var(--text-muted);
        font-family: var(--font-mono);
        font-size: clamp(0.52rem, 0.75vw, 0.72rem);
        letter-spacing: 0.09em;
        text-transform: uppercase;
    }

    h3 {
        margin: 0.3rem 0 0;
        color: var(--text-prominent);
        font-family: var(--font-serif);
        font-size: clamp(1.55rem, 3.2vw, 2.8rem);
        font-weight: 300;
        letter-spacing: -0.05em;
        line-height: 0.95;
    }

    .state-indicator {
        display: grid;
        justify-items: end;
        gap: 0.25rem;
    }

    .state-indicator strong {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(1.3rem, 2.3vw, 2rem);
        letter-spacing: 0;
    }

    .rule-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.45fr) minmax(13rem, 0.9fr);
        gap: clamp(0.85rem, 2vw, 1.5rem);
        align-items: stretch;
    }

    .tape-panel,
    .transition-panel {
        display: grid;
        gap: 0.9rem;
        min-width: 0;
        padding: clamp(0.75rem, 1.5vw, 1.15rem);
        border: 1px solid color-mix(in srgb, var(--text-prominent), transparent 84%);
    }

    .panel-label {
        font-size: clamp(0.48rem, 0.65vw, 0.64rem);
    }

    .tape-viewport {
        display: grid;
        align-items: center;
        min-height: clamp(7rem, 14vh, 10rem);
        overflow: hidden;
        padding: 1.4rem 0.4rem 0.8rem;
        background: color-mix(in srgb, var(--background), var(--text-prominent) 4%);
    }

    .tape {
        display: grid;
        grid-template-columns: repeat(5, minmax(3.2rem, 1fr));
        width: min(100%, 34rem);
        margin: 0 auto;
    }

    .cell {
        position: relative;
        display: grid;
        place-items: center;
        min-height: clamp(3.2rem, 7vh, 4.8rem);
        border: 1px solid color-mix(in srgb, var(--text-prominent), transparent 70%);
        background: color-mix(in srgb, var(--background), var(--text-prominent) 2%);
        transition:
            background 300ms ease,
            border-color 300ms ease,
            color 300ms ease;
    }

    .cell + .cell {
        border-left: 0;
    }

    .cell::after {
        position: absolute;
        right: 0.35rem;
        bottom: 0.22rem;
        color: color-mix(in srgb, var(--text-muted), transparent 20%);
        content: attr(data-index);
        font-family: var(--font-mono);
        font-size: 0.52rem;
    }

    .cell-value {
        color: var(--text-prominent);
        font-family: var(--font-mono);
        font-size: clamp(1.4rem, 3vw, 2.5rem);
        transition:
            color 300ms ease,
            transform 300ms ease;
    }

    .cell.changed {
        border-color: var(--accent);
        background: color-mix(in srgb, var(--accent), var(--background) 88%);
    }

    .cell.changed .cell-value {
        color: var(--accent);
        transform: scale(1.12);
    }

    .head {
        position: absolute;
        top: -1.35rem;
        left: 50%;
        display: grid;
        justify-items: center;
        gap: 0.12rem;
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: 0.55rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        transform: translateX(-50%);
        white-space: nowrap;
    }

    .head i {
        display: block;
        width: 0.7rem;
        height: 0.7rem;
        border-right: 2px solid var(--accent);
        border-bottom: 2px solid var(--accent);
        transform: rotate(45deg) translate(-0.18rem, -0.18rem);
    }

    .tape-caption {
        gap: 0.5rem;
        font-size: clamp(0.44rem, 0.6vw, 0.58rem);
    }

    .tape-caption strong {
        color: var(--accent);
        font-weight: 400;
    }

    .transition-panel {
        align-content: center;
    }

    .rule {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto;
        align-items: center;
        justify-content: center;
        gap: clamp(0.3rem, 0.7vw, 0.65rem);
        min-height: 4.2rem;
        padding: 0.65rem;
        border: 1px solid color-mix(in srgb, var(--text-prominent), transparent 88%);
        color: color-mix(in srgb, var(--text-muted), transparent 15%);
        opacity: 0.38;
        transition:
            opacity 300ms ease,
            border-color 300ms ease,
            color 300ms ease;
    }

    .rule[data-active="true"] {
        border-color: color-mix(in srgb, var(--accent), transparent 35%);
        color: var(--text-prominent);
        opacity: 1;
    }

    .rule-state,
    .rule-symbol,
    .rule-output,
    .rule-move,
    .rule-arrow {
        font-family: var(--font-mono);
        font-size: clamp(0.85rem, 1.55vw, 1.35rem);
    }

    .rule-state,
    .rule-output {
        color: var(--accent);
    }

    .rule-symbol,
    .rule-arrow,
    .rule-move {
        color: var(--text-muted);
    }

    .rule-caption {
        margin: 0;
        text-align: center;
        font-size: clamp(0.46rem, 0.62vw, 0.6rem);
        line-height: 1.5;
    }

    .progression {
        align-items: start;
        gap: 1.25rem;
        padding-top: 0.2rem;
    }

    .progression-marker {
        display: flex;
        gap: 0.35rem;
        padding-top: 0.25rem;
    }

    .progression-marker span {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        border: 1px solid color-mix(in srgb, var(--text-prominent), transparent 55%);
        border-radius: 50%;
        transition:
            background 260ms ease,
            border-color 260ms ease,
            transform 260ms ease;
    }

    .progression-marker span.active {
        border-color: var(--accent);
        background: color-mix(in srgb, var(--accent), transparent 45%);
    }

    .progression-marker span.current {
        background: var(--accent);
        transform: scale(1.35);
    }

    .progression-copy {
        display: grid;
        gap: 0.25rem;
        min-width: 0;
    }

    .progression-copy strong {
        color: var(--text-prominent);
        font-family: var(--font-serif);
        font-size: clamp(1rem, 1.6vw, 1.35rem);
        font-weight: 400;
    }

    .progression-copy span {
        font-size: clamp(0.48rem, 0.68vw, 0.65rem);
        letter-spacing: 0.04em;
        line-height: 1.5;
        text-transform: none;
    }

    @media (max-width: 760px) {
        .rule-layout {
            grid-template-columns: 1fr;
        }

        .transition-panel {
            min-height: 8rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .cell,
        .cell-value,
        .rule,
        .progression-marker span {
            transition-duration: 0.01ms;
        }
    }
</style>
