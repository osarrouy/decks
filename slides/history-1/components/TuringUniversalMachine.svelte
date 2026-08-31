<script lang="ts">
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const step = getStepContext();
    const programRows = [
        ["q₀", "1", "→", "0", "R", "q₁", "…"],
        ["q₁", "0", "→", "1", "R", "q₁", "…"],
    ];
    const inputCells = ["w", ":", "1"];

    $: currentStep = Math.min($step, 4);
    $: simulationState = currentStep >= 3 ? "q₁" : "q₀";
    $: stepLabel = [
        "programme et entrée",
        "lire la description codée",
        "interpréter la règle",
        "simuler la transition",
        "changer de programme",
    ][currentStep];
    $: action = [
        "La machine U reçoit l’encodage d’une machine M et son entrée w.",
        "U parcourt le ruban pour lire un extrait de la table de M.",
        "U sélectionne la transition correspondant à l’état et au symbole courants.",
        "U simule l’action de M : écrire, se déplacer et changer d’état.",
        "Les règles propres à U restent fixes ; seule la description fournie change.",
    ][currentStep];
</script>

<div
    class="universal-machine"
    aria-label="Animation conceptuelle d’une machine de Turing universelle : lire une description codée puis simuler une règle"
>
    <div class="machine-heading">
        <div>
            <span class="eyebrow">une machine qui simule les autres</span>
            <h3>Machine de Turing universelle</h3>
        </div>
        <div class="state-indicator">
            <span>mécanisme fixe</span>
            <strong>U</strong>
        </div>
    </div>

    <div class="universal-layout">
        <section
            class="tape-panel"
            aria-label="Encodage d’une machine M et de son entrée w"
        >
            <div class="panel-label">
                <span>ruban / données</span>
                <span>encodage de ⟨M, w⟩</span>
            </div>
            <div class="tape-group">
                <div class="tape-label">extrait de la table de M</div>
                <div class="program-tape">
                    {#each programRows as row, rowIndex}
                        <div class="program-row">
                            {#each row as cell, index}
                                <div
                                    class="cell"
                                    class:selected={currentStep === 1}
                                    class:interpreted={currentStep >= 2 &&
                                        rowIndex === 0}
                                >
                                    <span>{cell}</span>
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="tape-group input-group">
                <div class="tape-label">entrée w de la machine simulée</div>
                <div class="tape input-tape">
                    {#each inputCells as cell, index}
                        <div
                            class="cell"
                            class:active={currentStep >= 3 && index === 2}
                        >
                            <span>{cell}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </section>

        <section
            class="interpreter-panel"
            aria-label="Interprétation par la machine universelle"
        >
            <div class="panel-label">
                <span>interprétation</span>
                <span>U reste inchangée</span>
            </div>
            <div class="universal-core">
                <div class="core-symbol">U</div>
                <div class="core-copy">
                    <strong>machine universelle</strong>
                    <span>ses propres règles restent fixes</span>
                </div>
            </div>
            <div class="interpretation-arrow">↓</div>
            <div class="decoded-rule" data-active={currentStep >= 2}>
                <span>q₀ + 1</span>
                <b>→</b>
                <span>0, R, q₁</span>
            </div>
            <div class="simulation-state">
                <span>état simulé</span>
                <strong>{simulationState}</strong>
            </div>
        </section>
    </div>

    <div class="universality-note" data-visible={currentStep >= 4}>
        <code>U + programme A → calcul A</code>
        <code>U + programme B → calcul B</code>
    </div>

    <div class="progression" aria-live="polite">
        <div class="progression-marker">
            {#each [0, 1, 2, 3, 4] as marker}
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
    .universal-machine {
        display: grid;
        gap: clamp(0.9rem, 1.8vh, 1.4rem);
        width: min(100%, 68rem);
        margin: 0 auto;
        padding: clamp(1rem, 2.5vw, 2rem);
        border: 1px solid color-mix(in srgb, var(--fg), transparent 78%);
        background: color-mix(in srgb, var(--bg), var(--fg) 3%);
        box-shadow: 0 1rem 3rem color-mix(in srgb, var(--bg), transparent 35%);
    }

    .machine-heading,
    .panel-label,
    .progression {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .machine-heading {
        align-items: end;
        border-bottom: 1px solid color-mix(in srgb, var(--fg), transparent 86%);
        padding-bottom: 0.8rem;
    }

    .eyebrow,
    .panel-label,
    .state-indicator,
    .tape-label,
    .core-copy span,
    .simulation-state span,
    .progression-copy span {
        color: var(--muted);
        font-family: var(--font-mono);
        font-size: clamp(0.5rem, 0.7vw, 0.68rem);
        letter-spacing: 0.09em;
        text-transform: uppercase;
    }

    h3 {
        margin: 0.3rem 0 0;
        color: var(--fg);
        font-family: var(--font-heading);
        font-size: clamp(1.45rem, 3vw, 2.65rem);
        font-weight: 300;
        letter-spacing: -0.05em;
        line-height: 0.95;
    }

    .state-indicator {
        display: grid;
        justify-items: end;
        gap: 0.25rem;
    }

    .state-indicator strong,
    .simulation-state strong {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(1.25rem, 2.2vw, 1.9rem);
        letter-spacing: 0;
    }

    .universal-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(15rem, 0.9fr);
        gap: clamp(0.85rem, 2vw, 1.5rem);
        align-items: stretch;
    }

    .tape-panel,
    .interpreter-panel {
        display: grid;
        gap: 0.85rem;
        min-width: 0;
        padding: clamp(0.75rem, 1.5vw, 1.1rem);
        border: 1px solid color-mix(in srgb, var(--fg), transparent 84%);
    }

    .panel-label {
        font-size: clamp(0.46rem, 0.62vw, 0.6rem);
    }

    .tape-group {
        display: grid;
        gap: 0.4rem;
    }

    .tape-label {
        font-size: clamp(0.45rem, 0.6vw, 0.58rem);
    }

    .tape {
        display: grid;
        align-items: stretch;
        overflow: hidden;
        background: color-mix(in srgb, var(--bg), var(--fg) 4%);
    }

    .program-tape {
        display: grid;
        gap: 0.35rem;
    }

    .program-row {
        display: grid;
        grid-template-columns: repeat(7, minmax(2rem, 1fr));
    }

    .input-tape {
        grid-template-columns: minmax(4.2rem, 1.8fr) minmax(2rem, 0.6fr) minmax(
                2.4rem,
                0.8fr
            );
        width: min(100%, 15rem);
    }

    .cell {
        position: relative;
        display: grid;
        place-items: center;
        min-height: clamp(2.8rem, 6vh, 4.2rem);
        border: 1px solid color-mix(in srgb, var(--fg), transparent 72%);
        color: var(--fg);
        font-family: var(--font-mono);
        font-size: clamp(0.75rem, 1.35vw, 1.3rem);
        transition:
            background 300ms ease,
            border-color 300ms ease,
            color 300ms ease,
            transform 300ms ease;
    }

    .cell + .cell {
        border-left: 0;
    }

    .cell.selected {
        border-color: var(--accent);
        background: color-mix(in srgb, var(--accent), var(--bg) 88%);
        color: var(--accent);
        transform: translateY(-0.18rem);
    }

    .cell.interpreted {
        border-color: color-mix(in srgb, var(--accent), transparent 35%);
        background: color-mix(in srgb, var(--accent), var(--bg) 92%);
    }

    .cell.active {
        border-color: var(--accent);
        background: color-mix(in srgb, var(--accent), var(--bg) 82%);
        color: var(--accent);
        transform: scale(1.04);
    }

    .interpreter-panel {
        align-content: center;
    }

    .universal-core {
        display: flex;
        align-items: center;
        gap: 0.9rem;
        padding: 0.8rem;
        border: 1px solid color-mix(in srgb, var(--accent), transparent 55%);
        background: color-mix(in srgb, var(--accent), var(--bg) 93%);
    }

    .core-symbol {
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: clamp(1.5rem, 3vw, 2.5rem);
    }

    .core-copy {
        display: grid;
        gap: 0.25rem;
        min-width: 0;
    }

    .core-copy strong {
        font-family: var(--font-heading);
        font-size: clamp(1rem, 1.6vw, 1.35rem);
        font-weight: 400;
    }

    .core-copy span,
    .simulation-state span {
        font-size: clamp(0.44rem, 0.6vw, 0.58rem);
        letter-spacing: 0.04em;
        text-transform: none;
    }

    .interpretation-arrow {
        color: var(--muted);
        font-family: var(--font-mono);
        font-size: 1.2rem;
        line-height: 0.7;
        text-align: center;
    }

    .decoded-rule {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(0.4rem, 0.9vw, 0.8rem);
        min-height: 3.4rem;
        padding: 0.6rem;
        border: 1px solid color-mix(in srgb, var(--fg), transparent 88%);
        color: color-mix(in srgb, var(--muted), transparent 10%);
        font-family: var(--font-mono);
        font-size: clamp(0.75rem, 1.25vw, 1.2rem);
        opacity: 0.4;
        transition:
            opacity 300ms ease,
            border-color 300ms ease,
            color 300ms ease;
    }

    .decoded-rule[data-active="true"] {
        border-color: color-mix(in srgb, var(--accent), transparent 35%);
        color: var(--fg);
        opacity: 1;
    }

    .decoded-rule b {
        color: var(--accent);
        font-weight: 400;
    }

    .simulation-state {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 1rem;
        font-size: clamp(0.5rem, 0.7vw, 0.68rem);
    }

    .universality-note {
        display: flex;
        justify-content: center;
        gap: clamp(0.6rem, 2vw, 1.5rem);
        padding-top: 0.1rem;
        opacity: 0;
        transition: opacity 300ms ease;
    }

    .universality-note[data-visible="true"] {
        opacity: 1;
    }

    .universality-note code {
        color: var(--fg);
        font-family: var(--font-mono);
        font-size: clamp(0.58rem, 0.85vw, 0.82rem);
    }

    .progression {
        align-items: start;
        gap: 1.1rem;
        padding-top: 0.2rem;
    }

    .progression-marker {
        display: flex;
        gap: 0.3rem;
        padding-top: 0.25rem;
    }

    .progression-marker span {
        display: block;
        width: 0.48rem;
        height: 0.48rem;
        border: 1px solid color-mix(in srgb, var(--fg), transparent 55%);
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
        color: var(--fg);
        font-family: var(--font-heading);
        font-size: clamp(0.95rem, 1.5vw, 1.3rem);
        font-weight: 400;
    }

    .progression-copy span {
        font-size: clamp(0.46rem, 0.65vw, 0.62rem);
        letter-spacing: 0.04em;
        line-height: 1.5;
        text-transform: none;
    }

    @media (max-width: 760px) {
        .universal-layout {
            grid-template-columns: 1fr;
        }

        .universality-note {
            flex-direction: column;
            align-items: center;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .cell,
        .decoded-rule,
        .universality-note,
        .progression-marker span {
            transition-duration: 0.01ms;
        }
    }
</style>
