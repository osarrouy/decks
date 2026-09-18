<script>
  import { Heading, Tabs } from "@dg/ui";
  import CourseHeading from "$lib/CourseHeading.svelte";
  import { browser } from "$app/environment";
  import ChapterNavigation from "$lib/ChapterNavigation.svelte";
  import { page } from "$app/state";
  import { selectChapter } from "$lib/course-content.js";
  import CourseOverview from "$lib/CourseOverview.svelte";
  import MarkdownContent from "$lib/MarkdownContent.svelte";
  import Bibliography from "$lib/Bibliography.svelte";
  import SlideDeck from "$lib/SlideDeck.svelte";

  let { data } = $props();

  function courseHref(slug, destination, section, resource) {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- Serialized immediately, not retained as reactive state.
    const query = new URLSearchParams({
      vue: destination,
      onglet: resource,
    });
    if (section) query.set("section", section);
    return `/${slug}/?${query}`;
  }
  let course = $derived(data.course);
  let params = $derived(
    browser ? page.url.searchParams : new URLSearchParams(),
  );
  let tab = $derived(
    ["resume", "slides", "bibliographie"].includes(params.get("onglet"))
      ? params.get("onglet")
      : "resume",
  );
  let selected = $derived(selectChapter(course, params.get("section")));
  let chapterIndex = $derived(course.sections.indexOf(selected));
  let requestedView = $derived(params.get("vue"));
  // Open the overview by default; existing chapter links still open their resource.
  let view = $derived(
    ["presentation", "bibliographie", "chapitres"].includes(requestedView)
      ? requestedView
      : params.has("section") || params.has("onglet")
        ? "chapitres"
        : "presentation",
  );
  function resourceHref(section, resource) {
    return courseHref(course.slug, "chapitres", section?.id, resource);
  }
  let presentationHref = $derived(
    courseHref(course.slug, "presentation", selected?.id, tab),
  );
  let bibliographyHref = $derived(
    courseHref(course.slug, "bibliographie", selected?.id, tab),
  );
</script>

<svelte:head><title>{course.title} — Olivier Sarrouy</title></svelte:head>

<Heading title={course.title} metadata={course.level} crosses="both" />

<div class="workspace framed crossed">
  <ChapterNavigation
    chapters={course.sections}
    level={course.level}
    value={view === "chapitres" ? selected?.id : ""}
    overviewHref={presentationHref}
    chapterHref={(section) => resourceHref(section, tab)}
  />

  <div class="resources">
    {#if view !== "chapitres"}
      <Tabs
        label="Informations générales du cours"
        value={view}
        items={[
          {
            value: "presentation",
            label: "Présentation",
            href: presentationHref,
          },
          {
            value: "bibliographie",
            label: "Bibliographie générale",
            href: bibliographyHref,
          },
        ]}
        data-sveltekit-noscroll
      />
      <CourseOverview {course} {view} chapterHref={resourceHref} />
    {:else if selected}
      <Tabs
        label="Ressources du cours"
        value={tab}
        items={[
          {
            value: "resume",
            label: "Résumé",
            href: resourceHref(selected, "resume"),
          },
          {
            value: "slides",
            label: "Slides",
            href: resourceHref(selected, "slides"),
          },
          {
            value: "bibliographie",
            label: "Bibliographie",
            href: resourceHref(selected, "bibliographie"),
          },
        ]}
        data-sveltekit-noscroll
      />

      {#if tab !== "bibliographie"}
        <section class="content" aria-labelledby="chapter-title">
          <CourseHeading
            id="chapter-title"
            label="Chapitre {String(chapterIndex + 1).padStart(
              2,
              '0',
            )} / {String(course.sections.length).padStart(2, '0')}"
            title={selected.title}
            part={selected.part}
          />
          {#if tab === "resume"}
            <MarkdownContent text={selected.description} />
          {:else if selected.slides.length}
            {#each selected.slides as support (support.url)}
              {#if support.integration === "iframe"}
                <SlideDeck title={support.title} url={support.url} />
              {:else}
                <p class="supports">
                  <a href={support.url} target="_blank" rel="noreferrer"
                    >{support.title} ↗</a
                  >
                </p>
              {/if}
            {/each}
          {:else}
            <div class="slide">
              <span class="slide-number" aria-hidden="true"
                >{String(chapterIndex + 1).padStart(2, "0")}</span
              >
              <div>
                <span class="slide-icon" aria-hidden="true">▤</span>
                <h3>Les slides arrivent ici.</h3>
                <p>
                  Les supports de ce chapitre seront intégrés prochainement.
                </p>
                <span class="badge">Support à venir</span>
              </div>
              <span class="slide-footer">{course.level} · Olivier Sarrouy</span>
            </div>
          {/if}
          <nav class="pagination" aria-label="Parcourir les chapitres">
            {#if chapterIndex > 0}<a
                href={resourceHref(course.sections[chapterIndex - 1], tab)}
                data-sveltekit-noscroll>← Chapitre précédent</a
              >{:else}<span>Début du cours</span>{/if}
            {#if chapterIndex < course.sections.length - 1}<a
                href={resourceHref(course.sections[chapterIndex + 1], tab)}
                data-sveltekit-noscroll>Chapitre suivant →</a
              >{:else}<span>Fin du cours</span>{/if}
          </nav>
        </section>
      {:else}
        <section class="reading" aria-labelledby="chapter-reading-title">
          <CourseHeading id="chapter-reading-title" title="Bibliographie" />
          {#if selected.bibliography?.length}
            <Bibliography references={selected.bibliography} />
          {:else}
            <div class="reading-empty">
              <span class="eyebrow">Sélection à venir</span>
              <p>
                Les lectures spécifiques à ce chapitre seront précisées
                prochainement.
              </p>
              <a href={bibliographyHref} data-sveltekit-noscroll
                >Consulter la bibliographie générale ↗</a
              >
            </div>
          {/if}
        </section>
      {/if}
    {:else}
      <section class="content">
        <p class="reading-intro">
          Le plan du cours sera précisé prochainement.
        </p>
      </section>
    {/if}
  </div>
</div>

<style>
  .eyebrow,
  .badge,
  .slide-number,
  .slide-icon,
  .slide-footer,
  .supports,
  .pagination,
  .reading-empty a {
    font-family: var(--font-mono);
    letter-spacing: 0.48px;
    font-weight: var(--ui-weight);
    text-transform: uppercase;
  }

  .eyebrow {
    text-transform: uppercase;
    font-size: var(--font-size-sm);
    letter-spacing: 0.13em;
    color: var(--text-primary);
  }

  .badge {
    display: inline-block;
    font-size: var(--font-size-xs);
    border: 1px solid var(--border-prominent);
    padding: 6px 10px;
    line-height: 1.5;
    color: var(--text-primary);
    background: var(--background);
  }

  .reading-intro {
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    font-weight: var(--body-weight);
    text-transform: none;
    letter-spacing: 0.02em;
    line-height: 1.7;
    max-width: 620px;
    margin-bottom: 28px;
  }

  .workspace {
    display: grid;
    grid-template-columns: 290px minmax(0, 1fr);
    min-height: 650px;
  }

  .supports a {
    color: var(--text-prominent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .reading-empty a {
    font-size: var(--font-size-sm);
    color: var(--text-prominent);
  }

  .pagination > span {
    color: var(--text-primary);
  }

  .resources {
    min-width: 0;
  }

  .content,
  .reading {
    padding: 28px var(--space-6);
  }

  .slide {
    position: relative;
    min-height: 300px;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 50px 28px;
    background: var(--background-subtle);
    border: 1px solid var(--border-prominent);
  }

  .slide-number {
    position: absolute;
    top: 18px;
    left: 20px;
    font-size: var(--font-size-sm);
    color: var(--accent);
  }

  .slide-icon {
    font-size: 30px;
    color: var(--accent);
    line-height: 1.6;
  }

  .slide h3 {
    font-family: var(--font-serif);
    font-size: 28px;
    font-weight: 400;
    line-height: inherit;
    text-transform: none;
    letter-spacing: 0;
    color: var(--text-prominent);
    margin: var(--space-3) 0;
  }

  .slide p {
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    font-weight: var(--body-weight);
    text-transform: none;
    letter-spacing: 0.02em;
    line-height: 1.7;
    max-width: 380px;
    margin: 0 auto 18px;
  }

  .slide-footer {
    position: absolute;
    bottom: 16px;
    left: 20px;
    font-size: var(--font-size-xs);
  }

  .supports {
    list-style: none;
    padding: 22px;
    border: 1px solid var(--border-prominent);
    background: var(--background-subtle);
    font-size: 12px;
  }

  .pagination {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-4);
    padding-top: 20px;
    border-top: 1px solid var(--border-prominent);
    font-size: var(--font-size-sm);
  }

  .reading-empty {
    padding: 26px;
    border: 1px solid var(--border-prominent);
    background: var(--background-subtle);
  }

  .reading-empty p {
    margin: 14px 0 22px;
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    font-weight: var(--body-weight);
    text-transform: none;
    line-height: 1.7;
    letter-spacing: 0.48px;
  }

  @media (max-width: 1000px) {
    .workspace {
      grid-template-columns: 240px minmax(0, 1fr);
    }

    .content,
    .reading {
      padding: var(--space-5);
    }
  }

  @media (max-width: 700px) {
    .workspace {
      display: block;
      min-height: 0;
    }

    .content,
    .reading {
      padding: 22px 20px;
    }

    .slide {
      min-height: 260px;
      aspect-ratio: auto;
      padding-inline: 18px;
    }

    .pagination {
      font-size: var(--font-size-xs);
    }
  }
</style>
