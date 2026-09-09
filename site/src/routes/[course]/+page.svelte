<script>
  import { Tabs } from "@dg/ui";
  import CourseHeading from "$lib/CourseHeading.svelte";
  import { browser } from "$app/environment";
  import ChapterPicker from "$lib/ChapterPicker.svelte";
  import { page } from "$app/state";
  import FloatingAssistant from "$lib/FloatingAssistant.svelte";
  import CourseOverview from "$lib/CourseOverview.svelte";
  import MarkdownContent from "$lib/MarkdownContent.svelte";
  import Bibliography from "$lib/Bibliography.svelte";
  import SlideDeck from "$lib/SlideDeck.svelte";

  let { data } = $props();

  function courseHref(slug, destination, section, resource) {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- Serialized immediately, not retained as reactive state.
    const query = new URLSearchParams({ vue: destination, onglet: resource });
    if (section) query.set("section", section);
    return `/${slug}/?${query}`;
  }
  let course = $derived(data.course);
  let params = $derived(
    browser ? page.url.searchParams : new URLSearchParams(),
  );
  let tab = $derived(
    params.get("onglet") === "bibliographie" ? "bibliographie" : "slides",
  );
  let legacyIndex = $derived(
    /^section-(\d+)$/.exec(params.get("section") || ""),
  );
  let selected = $derived(
    course.sections.find((section) => section.id === params.get("section")) ||
      (legacyIndex ? course.sections[Number(legacyIndex[1]) - 1] : undefined) ||
      course.sections[0],
  );
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

<header class="heading framed crossed">
  <h1>{course.title}</h1>
</header>

<div class="workspace framed crossed page-fill">
  <aside class="sidebar" aria-label="Chapitres du cours">
    <div class="sidebar-inner">
      <a
        class="overview-link"
        href={presentationHref}
        aria-current={view !== "chapitres" ? "page" : undefined}
        data-sveltekit-noscroll
      >
        <span class="overview-symbol" aria-hidden="true">↗</span><span
          >Vue d’ensemble<small>Présentation · Bibliographie générale</small
          ></span
        >
      </a>
      <div class="sidebar-heading">
        <span>Chapitres</span><span
          >{course.level} / {String(course.sections.length).padStart(
            2,
            "0",
          )}</span
        >
      </div>
      <nav class="chapters" aria-label="Choisir un chapitre">
        {#each course.sections as section, index (section)}
          <a
            href={resourceHref(section, tab)}
            aria-current={view === "chapitres" && selected?.id === section.id
              ? "page"
              : undefined}
            data-sveltekit-noscroll
          >
            <span class="number">{String(index + 1).padStart(2, "0")}</span>
            <span class="name">{section.title}</span>
            <span class="indicator" aria-hidden="true">↗</span>
          </a>
        {/each}
      </nav>
      <div class="mobile-chapters">
        <ChapterPicker
          value={view === "chapitres" ? selected?.id : ""}
          items={course.sections.map((section) => ({
            value: section.id,
            label: section.title,
            href: resourceHref(section, tab),
          }))}
        />
      </div>
    </div>
  </aside>

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
            value: "slides",
            label: "Slides",
            href: resourceHref(selected, "slides"),
          },
          {
            value: "bibliographie",
            label: "Lectures du chapitre",
            href: resourceHref(selected, "bibliographie"),
          },
        ]}
        data-sveltekit-noscroll
      />

      {#if tab === "slides"}
        <section class="content" aria-labelledby="chapter-title">
          <CourseHeading
            id="chapter-title"
            label="Chapitre {String(chapterIndex + 1).padStart(
              2,
              '0',
            )} / {String(course.sections.length).padStart(2, '0')}"
            title={selected.title}
          />
          {#if selected.slides.length}
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
          <div class="outline">
            <span class="eyebrow">Dans ce chapitre</span>
            <MarkdownContent text={selected.description} />
          </div>
          <nav class="pagination" aria-label="Parcourir les chapitres">
            {#if chapterIndex > 0}<a
                href={resourceHref(course.sections[chapterIndex - 1], "slides")}
                data-sveltekit-noscroll>← Chapitre précédent</a
              >{:else}<span>Début du cours</span>{/if}
            {#if chapterIndex < course.sections.length - 1}<a
                href={resourceHref(course.sections[chapterIndex + 1], "slides")}
                data-sveltekit-noscroll>Chapitre suivant →</a
              >{:else}<span>Fin du cours</span>{/if}
          </nav>
        </section>
      {:else}
        <section class="reading" aria-labelledby="chapter-reading-title">
          <CourseHeading
            id="chapter-reading-title"
            label="Chapitre {String(chapterIndex + 1).padStart(2, '0')}"
            title="Lectures du chapitre"
          />
          <p class="reading-name">{selected.title}</p>
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

{#if selected}{#key course.slug}<FloatingAssistant
      {course}
      chapter={selected}
    />{/key}{/if}

<style>
  .eyebrow,
  .badge,
  .overview-link,
  .sidebar-heading,
  .number,
  .indicator,
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

  .heading {
    padding: 38px var(--space-6);
  }

  .heading h1 {
    font-family: var(--font-serif);
    font-size: clamp(34px, 4.5vw, 62px);
    font-weight: 400;
    text-transform: none;
    letter-spacing: -0.025em;
    line-height: 1.1;
    color: var(--text-prominent);
    max-width: 1050px;
  }

  .workspace {
    display: grid;
    grid-template-columns: 290px minmax(0, 1fr);
    min-height: 650px;
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

  .supports a {
    color: var(--text-prominent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .reading-empty a {
    font-size: var(--font-size-sm);
    color: var(--text-prominent);
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

  .pagination > span {
    color: var(--text-primary);
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

  .indicator {
    font-size: var(--font-size-sm);
    color: var(--accent);
    opacity: 0;
    padding-top: 5px;
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

  .outline {
    margin: 26px 0;
  }

  .outline > .eyebrow {
    display: block;
    margin-bottom: 14px;
  }
  .supports {
    list-style: none;
    padding: 22px;
    border: 1px solid var(--border-prominent);
    background: var(--background-subtle);
    font-size: 12px;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-4);
    padding-top: 20px;
    border-top: 1px solid var(--border-prominent);
    font-size: var(--font-size-sm);
  }

  .reading-name {
    margin-bottom: 28px;
    font-family: var(--font-serif);
    font-size: 26px;
    line-height: 1.3;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
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

    .chapters a {
      padding-inline: var(--space-4);
      gap: var(--space-2);
    }

    .content,
    .reading {
      padding: var(--space-5);
    }
  }

  @media (max-width: 700px) {
    .heading {
      padding: 28px 20px;
    }

    .heading h1 {
      font-size: 38px;
    }

    .workspace {
      display: block;
      min-height: 0;
    }

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
