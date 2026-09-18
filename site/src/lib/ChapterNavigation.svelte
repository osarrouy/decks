<script>
    import ChapterPicker from "./ChapterPicker.svelte";

    /**
     * @typedef {Object} Props
     * @property {{id: string, title: string, part?: string, subtitle?: string}[]} chapters
     * @property {string} level
     * @property {string} [value]
     * @property {string} overviewHref
     * @property {(chapter: Props["chapters"][number]) => string} chapterHref
     */

    /** @type {Props} */
    let { chapters, level, value = "", overviewHref, chapterHref } = $props();
</script>

<aside class="sidebar" aria-label="Chapitres du cours">
    <div class="sidebar-inner">
        <a
            class="overview-link"
            href={overviewHref}
            aria-current={!value ? "page" : undefined}
            data-sveltekit-noscroll
        >
            <span class="overview-symbol" aria-hidden="true">↗</span><span
                >Vue d’ensemble<small
                    >Présentation · Bibliographie générale</small
                ></span
            >
        </a>
        <div class="sidebar-heading">
            <span>Chapitres</span><span
                >{level} / {String(chapters.length).padStart(2, "0")}</span
            >
        </div>
        <nav class="chapters" aria-label="Choisir un chapitre">
            {#each chapters as section, index (section)}
                <a
                    href={chapterHref(section)}
                    aria-current={value === section.id ? "page" : undefined}
                    data-sveltekit-noscroll
                >
                    <span class="number">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span class="name" class:has-part={section.part}>
                        {section.title}
                        {#if section.part}
                            <sup class="part">{section.part}</sup>
                        {/if}
                        {#if section.subtitle}
                            <span class="metadata">{section.subtitle}</span>
                        {/if}
                    </span>
                    <span class="indicator" aria-hidden="true">↗</span>
                </a>
            {/each}
        </nav>
        <div class="mobile-chapters">
            <ChapterPicker
                {value}
                items={chapters.map((section) => ({
                    value: section.id,
                    label: section.title,
                    part: section.part,
                    subtitle: section.subtitle,
                    href: chapterHref(section),
                }))}
            />
        </div>
    </div>
</aside>

<style>
    .overview-link,
    .sidebar-heading,
    .number,
    .indicator {
        font-family: var(--font-mono);
        letter-spacing: 0.48px;
        font-weight: var(--ui-weight);
        text-transform: uppercase;
    }

    .sidebar {
        position: relative;
        z-index: 4; /* Selection line above the frame, below the crosses (z-index: 5). */
        border-right: 1px solid var(--border-prominent);
        min-width: 0;
    }

    .sidebar-inner {
        position: sticky;
        top: 20px;
        padding: var(--space-5) 0;
    }

    .overview-link,
    .chapters a {
        position: relative;
    }

    .overview-link[aria-current]::before,
    .chapters a[aria-current]::before {
        content: "";
        position: absolute;
        inset-block: 0;
        left: -4px; /* Offset by 2 px and compensate for the transparent border. */
        width: 3px;
        background: var(--accent);
        pointer-events: none;
    }

    .overview-link {
        display: flex;
        gap: 14px;
        align-items: flex-start;
        padding: 20px 22px;
        margin: -24px 0 26px;
        border-bottom: 1px solid var(--border-prominent);
        border-left: 2px solid transparent;
        font-size: var(--font-size-sm);
    }

    .overview-link[aria-current] {
        background: var(--background-prominent);
        color: var(--text-prominent);
    }

    .overview-link:hover {
        background: var(--background-subtle);
    }

    .overview-symbol {
        color: var(--accent);
    }

    .overview-link small {
        display: block;
        margin-top: 9px;
        font-family: var(--font-sans);
        font-weight: var(--body-weight);
        font-size: 12px;
        line-height: 1.5;
        text-transform: none;
        letter-spacing: 0;
    }

    .sidebar-heading {
        display: flex;
        justify-content: space-between;
        gap: var(--space-3);
        padding: 0 var(--space-5) 22px;
        font-size: var(--font-size-xs);
    }

    .sidebar-heading > span:last-child {
        color: var(--accent);
    }

    .chapters a {
        display: grid;
        grid-template-columns: 20px minmax(0, 1fr) 10px;
        gap: var(--space-3);
        align-items: start;
        padding: 21px 22px;
        border-top: 1px solid var(--border);
        border-left: 2px solid transparent;
    }

    .chapters a:last-child {
        border-bottom: 1px solid var(--border);
    }

    .chapters a:hover {
        background: var(--background-subtle);
    }

    .chapters a[aria-current] {
        background: var(--background-prominent);
    }

    .number {
        font-size: var(--font-size-sm);
        color: var(--text-primary);
        padding-top: 5px;
    }

    .name {
        font-family: var(--font-serif);
        font-size: 22px;
        font-weight: 400;
        text-transform: none;
        letter-spacing: 0;
        line-height: 1.2;
    }

    .part {
        position: absolute;
        inset-inline-end: 0;
        top: 0;
        color: var(--accent);
        font-family: var(--font-mono);
        font-size: 0.48em;
        font-weight: var(--ui-weight);
        letter-spacing: 0.04em;
        white-space: nowrap;
    }

    .name.has-part {
        position: relative;
        padding-inline-end: 38px;
    }

    .indicator {
        font-size: var(--font-size-sm);
        color: var(--accent);
        opacity: 0;
        padding-top: 5px;
    }

    .name .metadata {
        display: block;
        margin-top: var(--space-2);
        color: var(--accent);
        overflow-wrap: anywhere;
    }

    .chapters a[aria-current] .indicator {
        opacity: 1;
    }

    .chapters a[aria-current] .number {
        color: var(--accent);
    }

    .mobile-chapters {
        display: none;
    }

    @media (max-width: 1000px) {
        .chapters a {
            padding-inline: var(--space-4);
            gap: var(--space-2);
        }
    }

    @media (max-width: 700px) {
        .sidebar {
            border-right: 0;
            border-bottom: 1px solid var(--border-prominent);
        }

        .sidebar-inner {
            position: static;
            padding: var(--space-4) 20px;
        }

        .overview-link {
            margin: -16px -20px 18px;
            padding: 20px;
        }

        .sidebar-heading,
        .chapters {
            display: none;
        }

        .mobile-chapters {
            display: block;
        }
    }
</style>
