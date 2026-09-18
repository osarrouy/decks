<script>
    import { tick } from "svelte";

    /**
     * @typedef {Object} Props
     * @property {{value: string, label: string, part?: string, subtitle?: string, href: string}[]} [items]
     * @property {string} [value]
     */

    /** @type {Props} */
    let { items = [], value = "" } = $props();

    let open = $state(false);
    let container = $state();
    let trigger = $state();
    let selectedIndex = $derived(
        items.findIndex((item) => item.value === value),
    );
    let selected = $derived(items[selectedIndex]);

    function fitMenu(element) {
        const fit = () => {
            const available =
                window.innerHeight - element.getBoundingClientRect().top - 8;
            element.style.setProperty(
                "--_available-height",
                `${Math.max(0, available)}px`,
            );
        };
        fit();
        window.addEventListener("resize", fit);
        window.addEventListener("scroll", fit, true);
        return () => {
            window.removeEventListener("resize", fit);
            window.removeEventListener("scroll", fit, true);
            element.style.removeProperty("--_available-height");
        };
    }

    function close() {
        // The native toggle event may arrive after focus has already moved away.
        container.open = false;
        open = false;
    }

    function dismiss(event) {
        if (container?.open && !container.contains(event.target)) close();
    }

    async function onKeydown(event) {
        if (
            container?.open &&
            event.key === "Escape" &&
            container.contains(event.target)
        ) {
            event.preventDefault();
            close();
            await tick();
            trigger.focus({ preventScroll: true });
        }
    }
</script>

<svelte:window
    onpointerdown={dismiss}
    onfocusin={dismiss}
    onkeydown={onKeydown}
/>

<!-- Chapter choices are navigation links, with native Tab / Enter behavior. -->
<details bind:this={container} bind:open>
    <summary bind:this={trigger}>
        <span class="label">Chapitre en cours</span>
        <span class="field">
            {#if selected}
                <span class="number">
                    {String(selectedIndex + 1).padStart(2, "0")}
                </span>
            {/if}
            <span class="title">
                <span class="title-line">
                    <span>{selected?.label || "Choisir un chapitre"}</span>
                    {#if selected?.part}<span class="part">{selected.part}</span
                        >{/if}
                </span>
                {#if selected?.subtitle}
                    <span class="metadata">{selected.subtitle}</span>
                {/if}
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="m2 4 4 4 4-4" />
            </svg>
        </span>
    </summary>
    <nav
        aria-label="Choisir un chapitre sur mobile"
        data-sveltekit-noscroll
        {@attach open ? fitMenu : undefined}
    >
        {#each items as item, index (item.value)}
            <a
                href={item.href}
                aria-current={item.value === value ? "page" : undefined}
                onclick={(event) => {
                    if (
                        !event.ctrlKey &&
                        !event.metaKey &&
                        !event.shiftKey &&
                        !event.altKey
                    )
                        close();
                }}
            >
                <span class="number">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span class="title">
                    <span class="title-line">
                        <span>{item.label}</span>
                        {#if item.part}<span class="part">{item.part}</span
                            >{/if}
                    </span>
                    {#if item.subtitle}
                        <span class="metadata">{item.subtitle}</span>
                    {/if}
                </span>
                <span class="indicator" aria-hidden="true"
                    >{item.value === value ? "✓" : "↗"}</span
                >
            </a>
        {/each}
    </nav>
</details>

<style>
    details {
        position: relative;
        font-family: var(--font-mono);
        font-size: var(--font-size-md);
        font-weight: var(--ui-weight);
        line-height: var(--ui-line-height);
        letter-spacing: 0.48px;
    }
    summary {
        list-style: none;
        cursor: pointer;
    }
    summary::-webkit-details-marker {
        display: none;
    }
    .label {
        display: block;
        margin-bottom: var(--space-2);
        color: var(--text-primary);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
    }
    .field,
    a {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        min-height: 44px;
        padding: var(--space-3);
        color: var(--text-prominent);
    }
    .field {
        border: 1px solid var(--border-prominent);
        background: var(--background);
    }
    .title {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
    }
    .title-line {
        display: flex;
        align-items: baseline;
        gap: var(--space-2);
    }
    .number,
    .indicator,
    svg {
        flex: none;
        color: var(--text-muted);
    }
    .metadata {
        display: block;
        margin-top: var(--space-2);
        color: var(--accent);
    }
    .part {
        flex: none;
        color: var(--accent);
        font-size: var(--metadata-font-size);
        line-height: 1;
        white-space: nowrap;
    }
    svg {
        fill: none;
        stroke: currentColor;
        stroke-width: 1;
    }
    details[open] .field {
        border-color: var(--accent);
    }
    details[open] svg {
        color: var(--accent);
        transform: rotate(180deg);
    }
    nav {
        position: absolute;
        z-index: 1;
        inset-inline: 0;
        top: calc(100% + var(--space-1));
        max-height: min(320px, 50dvh, var(--_available-height, 50dvh));
        overflow-y: auto;
        overscroll-behavior: contain;
        border: 1px solid var(--border-prominent);
        background: var(--background);
    }
    a {
        text-decoration: none;
        border-inline-start: 2px solid transparent;
    }
    a + a {
        border-top: 1px solid var(--border);
    }
    a:hover {
        background: var(--background-subtle);
    }
    a[aria-current] {
        border-inline-start-color: var(--accent);
        background: var(--accent-subtle);
    }
    a[aria-current] .number,
    a[aria-current] .indicator {
        color: var(--accent);
    }
    summary:focus-visible {
        outline: none;
    }
    summary:focus-visible .field,
    a:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: -2px;
    }
</style>
