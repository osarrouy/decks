<script lang="ts">
    import { onMount } from "svelte";
    import SlidePreview from "./SlidePreview.svelte";
    import { createDeckController } from "../deck/controller";
    import { notesToHtml } from "../deck/markdown";
    import type { Deck } from "../deck/types";

    export let deck: Deck;

    const controller = createDeckController(
        deck.id,
        deck.slides.length,
        (slide) => deck.slides[slide]?.metadata.steps ?? 0,
    );
    const state = controller.state;

    onMount(controller.mount);

    $: current = deck.slides[$state.slide];
    $: maxStep = current?.metadata.steps ?? 0;
    $: progress = deck.slides.length
        ? (($state.slide + 1) / deck.slides.length) * 100
        : 0;
</script>

<svelte:head>
    <title>{deck.title} — révisions</title>
</svelte:head>

<main
    class="student-root"
    data-theme={deck.theme ?? "default"}
    style={`--progress: ${progress}%`}
>
    <div class="student-shell">
        <header class="student-header">
            <div>
                <p class="student-kicker">Support de révision</p>
                <h1>{deck.title}</h1>
            </div>
            <div class="student-counter" aria-live="polite">
                <strong>{$state.slide + 1}</strong> / {deck.slides.length}
                <span>· étape {$state.step}{maxStep ? `/${maxStep}` : ""}</span>
            </div>
        </header>

        {#if current}
            <section
                class="student-slide-panel"
                aria-label={`Slide ${$state.slide + 1} : ${current.title}`}
            >
                <div class="student-slide-viewport">
                    <SlidePreview slide={current} step={$state.step} />
                </div>
                <div class="student-slide-footer">
                    <span>{current.title}</span>
                    <span>Utilisez ← → ou Espace pour naviguer</span>
                </div>
            </section>

            <section
                class="student-notes presenter-notes"
                aria-live="polite"
                aria-label={`Notes : ${current.title}`}
            >
                <header class="student-notes-header">
                    <span>Notes de cours</span>
                    <span>{current.title}</span>
                </header>
                {#key $state.slide}
                    {#if current.notes}
                        <div
                            class="student-notes-content presenter-notes-content"
                        >
                            {@html notesToHtml(current.notes, {
                                audience: "student",
                            })}
                        </div>
                    {:else}
                        <p class="student-notes-empty muted">
                            Aucune note n’est disponible pour cette slide.
                        </p>
                    {/if}
                {/key}
            </section>

            <nav class="student-controls" aria-label="Navigation des slides">
                <button type="button" on:click={controller.previous}
                    >← Précédent</button
                >
                <button type="button" on:click={controller.next}
                    >Suivant →</button
                >
            </nav>
        {/if}
    </div>
</main>
