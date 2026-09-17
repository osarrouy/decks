<script>
  import "@dg/ui/styles.css";

  import { page } from "$app/state";
  import { browser } from "$app/environment";
  import { Header, Footer, Main, Page, SkipLink } from "@dg/ui";
  import FloatingAssistant from "$lib/FloatingAssistant.svelte";
  import { selectChapter } from "$lib/course-content.js";

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
  let course = $derived(page.status < 400 ? page.data.course : undefined);
  let chapter = $derived(
    course &&
      selectChapter(
        course,
        browser ? page.url.searchParams.get("section") : null,
      ),
  );
</script>

<svelte:head>
  <meta
    name="description"
    content="Ressources pour les cours de cultures numériques d'Olivier Sarrouy à l'Université Rennes 2."
  />
</svelte:head>
<SkipLink />

<Page>
  <Header
    identity="olivier@sarrouy"
    identityUrl="/"
    app="university"
    {links}
    path={navigationPath}
  />
  <Main>{@render children?.()}</Main>
  <Footer identity="olivier·sarrouy" clock />
</Page>

{#if course && chapter}
  {#key course.slug}<FloatingAssistant {course} {chapter} />{/key}
{/if}
