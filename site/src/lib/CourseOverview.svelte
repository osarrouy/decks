<script>
  import CourseHeading from "$lib/CourseHeading.svelte";
  import MarkdownContent from "./MarkdownContent.svelte";
  import Bibliography from "./Bibliography.svelte";

  /**
   * @typedef {Object} Props
   * @property {any} course
   * @property {string} [view]
   * @property {any} chapterHref
   */

  /** @type {Props} */
  let { course, view = "presentation", chapterHref } = $props();
</script>

<div class="overview">
  {#if view === "presentation"}
    <section aria-labelledby="course-presentation-title">
      <CourseHeading
        id="course-presentation-title"
        label="L’enseignement · {course.level}"
        title="Présentation du cours"
      />
      <MarkdownContent text={course.description} lead />
      <div class="facts">
        <span>{course.cycle}</span><span
          >{String(course.sections.length).padStart(2, "0")} chapitres</span
        ><span>Olivier Sarrouy</span>
      </div>
      <div>
        <h3>Le parcours</h3>
        {#each course.sections as section, index (section)}
          <a
            class="chapter"
            href={chapterHref(section, "resume")}
            data-sveltekit-noscroll
          >
            <span class="number">{String(index + 1).padStart(2, "0")}</span>
            <span
              ><span class="title"
                ><span>{section.title}</span>{#if section.part}<span
                    class="part">{section.part}</span
                  >{/if}</span
              >{#if section.subtitle}<span class="subtitle"
                  >{section.subtitle}</span
                >{/if}<span class="summary">{section.summary}</span></span
            >
            <span class="arrow" aria-hidden="true">↗</span>
          </a>
        {/each}
      </div>
    </section>
  {:else}
    <section aria-labelledby="general-reading-title">
      <CourseHeading
        id="general-reading-title"
        label="À l’échelle du cours"
        title="Bibliographie générale"
      />
      <p class="reading-intro">
        Les ouvrages de référence pour l’ensemble du cours. Cette sélection
        accompagne le parcours et permet de prolonger les questions abordées en
        séance.
      </p>
      {#if course.bibliography.length}
        <Bibliography references={course.bibliography} />
      {:else}
        <p class="reading-intro">
          La bibliographie générale sera précisée prochainement.
        </p>
      {/if}
    </section>
  {/if}
</div>

<style>
  .facts,
  h3,
  .number,
  .arrow {
    font-family: var(--font-mono);
    letter-spacing: 0.48px;
    font-weight: var(--ui-weight);
    text-transform: uppercase;
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

  .overview {
    padding: var(--space-6);
  }

  .facts {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3) var(--space-5);
    padding: 22px 0 30px;
    font-size: var(--font-size-xs);
  }

  h3 {
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    font-weight: 400;
    line-height: inherit;
    color: inherit;
    margin-bottom: 14px;
  }

  .chapter {
    display: grid;
    grid-template-columns: 24px 1fr 14px;
    align-items: start;
    gap: 18px;
    padding: 22px 0;
    border-top: 1px solid var(--border-prominent);
  }

  .number,
  .arrow {
    color: var(--accent);
    font-size: var(--font-size-sm);
    padding-top: var(--space-1);
  }

  .title {
    display: flex;
    align-items: baseline;
    gap: 9px;
    font-family: var(--font-serif);
    font-size: 26px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--text-prominent);
    text-transform: none;
    letter-spacing: 0;
  }

  .part {
    flex: none;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--ui-weight);
    letter-spacing: 0.04em;
    line-height: 1;
    white-space: nowrap;
  }

  .subtitle {
    display: block;
    margin-top: var(--space-2);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
    font-weight: var(--ui-weight);
    letter-spacing: 0.05em;
    line-height: 1.45;
    text-transform: uppercase;
  }

  .summary {
    display: block;
    margin-top: var(--space-2);
    max-width: 600px;
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    font-weight: var(--body-weight);
    text-transform: none;
    letter-spacing: 0.01em;
    line-height: 1.6;
  }

  .chapter:hover .title {
    color: var(--accent);
  }

  @media (max-width: 700px) {
    .overview {
      padding: var(--space-5) 20px;
    }

    .chapter {
      gap: 10px;
    }
  }
</style>
