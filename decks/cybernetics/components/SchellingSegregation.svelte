<script lang="ts">
    import { onMount } from "svelte";
    import { getStepContext } from "@svx-slides/core/deck/stepContext";

    const slideContext = getStepContext();

    export let size = 10;
    export let threshold = 0.33;
    export let interval = 160;

    type Resident = "a" | "b";
    type Cell = Resident | null;
    type Status = "ready" | "running" | "stabilized" | "blocked";

    let board: Cell[] = [];
    let moves = 0;
    let running = false;
    let status: Status = "ready";
    let timer: ReturnType<typeof setInterval>;

    $: animationStarted = $slideContext >= 1;
    $: if (!animationStarted && status !== "ready") {
        board = seed();
        moves = 0;
        status = "ready";
        running = false;
    }
    $: if (animationStarted && status === "ready") {
        status = "running";
        running = true;
    }

    const seed = () => {
        const cells: Cell[] = Array(size * size).fill(null);
        for (let index = 0; index < cells.length; index += 1) {
            const row = Math.floor(index / size);
            const column = index % size;
            cells[index] =
                (row + column * 2) % 3 === 0
                    ? null
                    : index % 2 === 0
                      ? "a"
                      : "b";
        }
        return cells;
    };

    const neighbours = (index: number) => {
        const row = Math.floor(index / size);
        const column = index % size;
        const result: number[] = [];

        for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
            for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
                if (rowOffset === 0 && columnOffset === 0) continue;
                const neighbourRow = row + rowOffset;
                const neighbourColumn = column + columnOffset;
                if (
                    neighbourRow >= 0 &&
                    neighbourRow < size &&
                    neighbourColumn >= 0 &&
                    neighbourColumn < size
                ) {
                    result.push(neighbourRow * size + neighbourColumn);
                }
            }
        }
        return result;
    };

    const satisfied = (cells: Cell[], index: number) => {
        const resident = cells[index];
        if (!resident) return true;
        const occupied = neighbours(index).filter(
            (neighbour) => cells[neighbour],
        );
        if (!occupied.length) return true;
        const similar = occupied.filter(
            (neighbour) => cells[neighbour] === resident,
        ).length;
        return similar / occupied.length >= threshold;
    };

    const step = () => {
        const unhappy = board
            .map((_, index) => index)
            .filter((index) => !satisfied(board, index));

        if (!unhappy.length) {
            status = "stabilized";
            running = false;
            return;
        }

        const empty = board
            .map((cell, index) => (cell === null ? index : -1))
            .filter((index) => index >= 0);
        const legalMoves: Array<{ source: number; destination: number }> = [];

        for (const source of unhappy) {
            for (const destination of empty) {
                const next = board.map((cell, index) =>
                    index === source
                        ? null
                        : index === destination
                          ? board[source]
                          : cell,
                );
                if (satisfied(next, destination)) {
                    legalMoves.push({ source, destination });
                }
            }
        }

        if (!legalMoves.length) {
            status = "blocked";
            running = false;
            return;
        }

        const { source, destination } =
            legalMoves[Math.floor(Math.random() * legalMoves.length)];
        const next = [...board];
        next[destination] = next[source];
        next[source] = null;
        board = next;
        moves += 1;
    };

    const restart = () => {
        board = seed();
        moves = 0;
        status = animationStarted ? "running" : "ready";
        running = animationStarted;
    };

    onMount(() => {
        restart();
        timer = setInterval(() => {
            if (animationStarted && running) step();
        }, interval);
        return () => clearInterval(timer);
    });
</script>

<div class="schelling">
    <div class="schelling-header">
        <span>modèle de Schelling</span>
        <span
            >{status === "ready"
                ? "observer la grille"
                : status === "running"
                  ? "les préférences locales se déplacent"
                  : status === "stabilized"
                    ? "configuration stabilisée"
                    : "blocage : aucun déplacement légal"} · {moves} déplacements</span
        >
    </div>

    <div
        class="board"
        style={`--size: ${size}`}
        role="img"
        aria-label="Simulation abstraite du modèle de ségrégation de Schelling"
    >
        {#each board as cell}
            <span
                class:group-a={cell === "a"}
                class:group-b={cell === "b"}
                class="cell"
                aria-hidden="true"
            ></span>
        {/each}
    </div>

    <div class="schelling-footer">
        <span><i class="legend-a"></i> groupe A</span>
        <span><i class="legend-b"></i> groupe B</span>
        <button type="button" on:click={restart}>recommencer</button>
    </div>
</div>

<style>
    .schelling {
        display: grid;
        gap: 0.8rem;
        width: min(100%, 42rem);
        margin-inline: auto;
        color: var(--text-prominent);
        font-family: var(--font-mono);
        font-size: var(--metadata-font-size);
    }

    .schelling-header,
    .schelling-footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0.75rem;
        color: var(--text-muted);
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(var(--size), 1fr);
        aspect-ratio: 1;
        gap: 1px;
        padding: 1px;
        background: color-mix(in srgb, var(--text-prominent), transparent 86%);
    }
    .cell {
        min-width: 0;
        background: var(--background);
        transition: background-color 120ms ease;
    }

    .cell.group-a {
        background: var(--accent);
        box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.3);
    }

    .cell.group-b {
        background: color-mix(in srgb, var(--text-prominent), var(--accent) 22%);
        box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.22);
    }

    .schelling-footer {
        align-items: center;
    }

    .schelling-footer span {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
    }

    .schelling-footer i {
        display: inline-block;
        width: 0.65rem;
        height: 0.65rem;
    }

    .legend-a {
        background: var(--accent);
    }

    .legend-b {
        background: color-mix(in srgb, var(--text-prominent), var(--accent) 22%);
    }

    button {
        padding: 0.3rem 0.5rem;
        border: 1px solid var(--border-prominent);
        background: transparent;
        color: inherit;
        font: inherit;
        cursor: pointer;
    }

    button:hover {
        border-color: var(--accent);
        color: var(--accent);
    }
</style>
