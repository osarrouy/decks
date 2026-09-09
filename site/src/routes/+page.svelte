<script>
  import { Cards, Card, Section, SectionHead, Quote } from "@dg/ui";
  import { courses } from "$lib/courses";

  const quotation = `On nous dit que l'intelligence artificielle sera la mort de l’enseignement.

À cela, je réponds: «absolument pas !»

Mon étudiant m'apporte sa dissertation, écrite par l'IA.

De mon côté, je la confie à mon IA pour qu’elle soit corrigée.

Et voilà.

Nous sommes enfin libres.

Pendant que «l’enseignement» a lieu sans nous, notre surmoi satisfait, nous serons enfin libres de devenir sages.`;
</script>

<svelte:head><title>Ressources de cours — Olivier Sarrouy</title></svelte:head>
<Section crosses="both" padding="0" gap="0">
  <section class="hero grid-bg">
    <Quote content={quotation} author="Slavoj Žižek" />
  </section>
</Section>
<Section crosses="both" padding="28px var(--gutter) 0" gap="25px">
  <SectionHead
    num="01"
    title="Les enseignements"
    count={"/ " + String(courses.length).padStart(2, "0")}
  />
  <div class="courses">
    <Cards label="Les enseignements" minWidth={300}>
      {#each courses as course (course)}
        <Card href={"/" + course.slug + "/"} title={course.title}>
          {#snippet header()}
            <span>{course.cycle}</span>
          {/snippet}
          {#snippet media()}
            <span class="level">{course.level}</span>
          {/snippet}
          <p>{course.summary}</p>
          {#snippet footer()}
            <span>Plan · Bibliographie · Slides · IA</span>
            <span class="arrow" aria-hidden="true">→</span>
          {/snippet}
        </Card>
      {/each}
    </Cards>
  </div>
</Section>
<Section class="page-fill" crosses="both" padding="0" gap="0">
  <div class="welcome">
    <span class="eyebrow">Pour commencer</span>
    <p>
      Choisissez votre enseignement. Le plan vous guide vers les supports de
      chaque section ; l’assistant propose un espace de discussion autour du
      cours.
    </p>
    <span class="badge">Version de démonstration</span>
  </div>
</Section>

<style>
  .level,
  .eyebrow,
  .badge {
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

  .hero {
    padding: 46px 40px 38px;
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  .courses {
    margin-inline: calc(-1 * var(--gutter));
    min-width: 0;
  }

  .level {
    display: block;
    font-size: 70px;
    letter-spacing: -0.07em;
    line-height: 1.4;
    color: var(--accent);
  }

  .arrow {
    font-size: 22px;
    color: var(--accent);
  }

  .welcome {
    display: grid;
    grid-template-columns: 180px 1fr auto;
    align-items: start;
    gap: 30px;
    padding: 35px 28px;
  }

  .welcome p {
    max-width: 660px;
    font-family: var(--font-sans);
    text-transform: none;
    font-weight: var(--body-weight);
    font-size: 15px;
    letter-spacing: 0;
  }

  @media (min-width: 1500px) {
    .hero {
      padding-block: 65px;
    }
  }

  @media (max-width: 900px) {
    .hero {
      padding: 35px 28px;
    }

    .welcome {
      grid-template-columns: 1fr 2fr;
    }

    .welcome .badge {
      grid-column: 2;
    }
  }

  @media (max-width: 640px) {
    .hero {
      padding: 30px 20px;
    }

    .level {
      font-size: 56px;
      margin: var(--space-2) 0;
    }

    .welcome {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 25px;
    }
  }
</style>
