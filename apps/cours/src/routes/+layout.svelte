<script>
  import "@dg/ui/styles.css";
  import "$lib/course.css";

  import { page } from "$app/state";
  import { Header, Footer, Page, SkipLink } from "@dg/ui";

  import { courses, courseAliases } from "$lib/courses";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();

  const links = courses.map((course) => ({
    label:
      courses.filter((other) => other.level === course.level).length > 1
        ? course.title
        : course.level,
    href: `/${course.slug}/`,
  }));
  let activeSlug = $derived(page.url.pathname.split("/")[1]);
  let navigationPath = $derived(
    courseAliases[activeSlug]
      ? `/${courseAliases[activeSlug]}/`
      : page.url.pathname,
  );
</script>

<svelte:head>
  <meta
    name="description"
    content="Ressources pour les cours de cultures numériques d'Olivier Sarrouy à l'Université Rennes 2."
  />
</svelte:head>
<SkipLink />

<Page
  style="--section-name-color: var(--text-primary); --section-number-weight: var(--ui-weight)"
>
  <Header
    identity="olivier@sarrouy"
    identityUrl="/"
    app="university"
    {links}
    pathname="{navigationPath}-"
  />
  <main id="main" class="sections">{@render children?.()}</main>
  <Footer identity="olivier·sarrouy" clock />
</Page>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    min-width: 0;
  }

  main > :global(.framed) {
    flex-shrink: 0;
  }

  main > :global(.page-fill) {
    flex-grow: 1;
  }
</style>
