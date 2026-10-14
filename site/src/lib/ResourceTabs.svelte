<script>
    /**
     * @typedef {Object} Props
     * @property {string} label
     * @property {string} value
     * @property {{value: string, label: string, href: string}[]} items
     */

    /** @type {Props} */
    let { label, value, items } = $props();
</script>

<!-- Each resource view has its own URL, so these are navigation links rather than WAI-ARIA tabs. -->
<nav class="ui" aria-label={label} data-sveltekit-noscroll>
    {#each items as item (item.value)}
        <a
            href={item.href}
            aria-current={item.value === value ? "page" : undefined}
            onfocus={(event) =>
                event.currentTarget.scrollIntoView({
                    block: "nearest",
                    inline: "nearest",
                })}>{item.label}</a
        >
    {/each}
</nav>

<style>
    nav {
        display: flex;
        min-width: 0;
        max-width: 100%;
        gap: var(--space-5);
        padding: 0 var(--layout-padding-inline);
        border-bottom: var(--border-width) solid var(--border);
        overflow-x: auto;
    }

    a {
        flex: none;
        display: flex;
        align-items: center;
        min-height: var(--control-min-size);
        padding: var(--control-padding-block) 0;
        border-bottom: calc(2 * var(--border-width)) solid transparent;
        color: var(--text-primary);
        text-decoration: none;
        white-space: nowrap;
    }

    a:hover,
    a[aria-current] {
        color: var(--text-prominent);
    }

    a[aria-current] {
        border-bottom-color: var(--accent);
    }

    a:focus-visible {
        outline: var(--focus-width) solid var(--focus-color);
        outline-offset: -4px;
    }

    @media (--narrow) {
        nav {
            gap: var(--space-4);
        }
    }
</style>
