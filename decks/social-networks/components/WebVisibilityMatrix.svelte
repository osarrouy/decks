<script lang="ts">
    type QuadrantNumber = 1 | 2 | 3 | 4;

    type Quadrant = {
        number: QuadrantNumber;
        position: string;
        title: string;
        examples: string[];
    };

    export let activeQuadrant: QuadrantNumber | null = null;

    const quadrants: Quadrant[] = [
        {
            number: 1,
            position: "top-left",
            title: "Sphère publique restreinte",
            examples: [
                "tribune signée",
                "expert·e reconnu·e",
                "blog professionnel",
            ],
        },
        {
            number: 3,
            position: "top-right",
            title: "Web participatif",
            examples: [
                "blog personnel",
                "vidéo amateur",
                "contribution à Wikipédia",
            ],
        },
        {
            number: 2,
            position: "bottom-left",
            title: "Espace public",
            examples: [
                "journal télévisé",
                "site de presse",
                "émission de radio",
            ],
        },
        {
            number: 4,
            position: "bottom-right",
            title: "Web en clair-obscur",
            examples: [
                "pseudonyme sur un forum",
                "commentaire",
                "groupe privé",
            ],
        },
    ];
</script>

<figure class="web-visibility">
    <div
        class="matrix"
        role="img"
        aria-label="Matrice des publics du web : de professionnel à amateur, et de personnalité à quidam."
    >
        <div class="axis-line axis-line-x" aria-hidden="true"></div>
        <div class="axis-line axis-line-y" aria-hidden="true"></div>
        <div class="axis-label axis-label-y-top">INTÉRÊT PUBLIC</div>
        <div class="axis-label axis-label-y-bottom">INTÉRÊT PRIVE</div>
        <div class="axis-label axis-label-x-left">PROFESSIONNEL</div>
        <div class="axis-label axis-label-x-right">AMATEUR</div>

        <div class="quadrant-grid">
            {#each quadrants as quadrant}
                <section
                    class={`quadrant ${quadrant.position} ${
                        activeQuadrant !== null &&
                        quadrant.number !== activeQuadrant
                            ? "quadrant--muted"
                            : ""
                    }`}
                >
                    <h3>{quadrant.title}</h3>
                    <ul>
                        {#each quadrant.examples as example}
                            <li>{example}</li>
                        {/each}
                    </ul>
                </section>
            {/each}
        </div>
    </div>
</figure>

<style>
    .web-visibility {
        width: min(100%, 64rem);
        margin: 1.5rem auto 0;
        color: var(--text-prominent);
    }

    .matrix {
        position: relative;
        padding: 2.3rem 6.8rem;
    }

    .quadrant-grid {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        /*border: 1px solid*/
        border: none;
        /*color-mix(in srgb, var(--text-prominent) 38%, transparent);*/
        /*background: color-mix(in srgb, white 35%, transparent);*/
    }

    .quadrant--muted {
        opacity: 0.08;
    }

    .quadrant {
        min-height: 1rem;
        padding: 1rem 1.15rem;
        min-height: 80%;
        /*background: color-mix(in srgb, white 38%, transparent);*/
    }

    /*.quadrant:nth-child(odd) {
        border-right: 1px solid
            color-mix(in srgb, var(--text-prominent) 24%, transparent);
    }*/

    /*.quadrant:nth-child(-n + 2) {
        border-bottom: 1px solid
            color-mix(in srgb, var(--text-prominent) 24%, transparent);
    }*/

    .quadrant h3 {
        max-width: 17ch;
        margin: 0;
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: 1.3rem;
        font-weight: 100;
        /*font-size: clamp(0.78rem, 1.1vw, 1rem);*/
        line-height: 1.15;
        text-transform: uppercase;
    }

    .quadrant ul {
        display: grid;
        /*gap: 0.22rem;*/
        margin: 0.75rem 0 0;
        padding: 0;
        font-weight: 300;
        /*padding-left: 1rem;*/
        /*color: var(--text-muted);*/
        list-style-type: none;
    }

    .quadrant ul li {
        font-size: 1.3rem; /*clamp(0.5rem, 0.5vw, 0.5rem);*/
    }

    .quadrant li::marker {
        color: var(--accent);
    }

    .axis-line {
        position: absolute;
        z-index: 2;
        background: var(--accent);
        opacity: 0.75;
        pointer-events: none;
    }

    .axis-line-x {
        top: 50%;
        right: 1.2rem;
        left: 1.2rem;
        height: 2px;
    }

    .axis-line-y {
        top: 1.2rem;
        bottom: 1.2rem;
        left: 50%;
        width: 2px;
    }

    .axis-label {
        position: absolute;
        z-index: 3;
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: 1em;
        letter-spacing: 0.06em;
        line-height: 1;
        text-transform: uppercase;
        white-space: nowrap;
        font-weight: 100;
    }

    .axis-label-y-top {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .axis-label-y-bottom {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .axis-label-x-left {
        top: 50%;
        left: 0;
        transform: translateX(-100%) translateY(-50%);
    }

    .axis-label-x-right {
        top: 50%;
        right: 0;
        transform: translateX(100%) translateY(-50%);
    }

    @media (max-width: 700px) {
        .matrix {
            padding-inline: 4.8rem;
        }

        .quadrant {
            min-height: 8rem;
            padding: 0.8rem;
        }

        .quadrant ul {
            padding-left: 0.85rem;
        }
    }
</style>
