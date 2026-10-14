<script>
  import { tick } from "svelte";
  import { excerpt } from "./course-content.js";
  import {
    ChatPanel,
    ChatThread,
    ChatMessage,
    ChatSuggestions,
    ChatComposer,
  } from "@dg/ui";
  let { course, chapter } = $props();
  let question = $state("");
  let messages = $state([]);
  let log = $state();
  let input = $state();
  const prompts = [
    "Résumer ce chapitre",
    "Comment réviser ce chapitre ?",
    "Quelles lectures pour approfondir ?",
  ];

  async function send(text = question) {
    const value = text.trim();
    if (!value) return;
    const lower = value.toLowerCase();
    const answer =
      lower.includes("lecture") || lower.includes("bibliograph")
        ? `Voici les références proposées pour ce chapitre ou cet enseignement : ${(chapter.bibliography.length ? chapter.bibliography : course.bibliography).map((entry) => excerpt(entry.reference)).join(" ; ")}`
        : lower.includes("révis")
          ? `Pour réviser « ${chapter.label} », commencez par expliquer les notions suivantes avec vos propres mots : ${chapter.items.join(" ; ")}. Puis cherchez un exemple pour chacune.`
          : lower.includes("chapitre") || lower.includes("résum")
            ? `Le chapitre « ${chapter.label} » propose de travailler sur les points suivants : ${chapter.items.join(" ; ")}. ${chapter.summary}`
            : lower.includes("plan")
              ? `Le parcours s’organise en ${course.sections.length} chapitres : ${course.sections.map((section) => section.label).join(" ; ")}.`
              : "Cette interface est une démonstration : je ne peux pas encore analyser votre question. Essayez une suggestion pour découvrir une réponse prédéfinie liée au chapitre en cours.";
    messages = [
      ...messages,
      { role: "user", text: value, chapter: chapter.label },
      { role: "assistant", text: answer, chapter: chapter.label },
    ];
    question = "";
    await tick();
    log.scrollToBottom();
    input.focus();
  }
</script>

<ChatPanel>
  <div class="context ui">
    <p>Chapitre en cours<strong>{chapter.label}</strong></p>
    <button
      type="button"
      disabled={!messages.length}
      onclick={() => (messages = [])}>Effacer</button
    >
  </div>
  <ChatThread bind:this={log} label="Discussion de démonstration">
    {#if !messages.length}<div class="welcome">
        <span aria-hidden="true">✳</span>
        <h3>Une question sur le cours ?</h3>
        <p>Gardez vos supports sous les yeux et poursuivez la discussion ici.</p>
        <ChatSuggestions suggestions={prompts} onselect={send} />
      </div>{/if}
    {#each messages as message (message)}<ChatMessage
        role={message.role}
        text={message.text}
        source={message.role === "assistant"
          ? `Chapitre : ${message.chapter}`
          : ""}
      />{/each}
  </ChatThread>
  <ChatComposer
    bind:this={input}
    id="course-question"
    bind:value={question}
    hint="Démonstration · Entrée pour envoyer, Maj + Entrée pour une nouvelle ligne."
    onsend={send}
  />
</ChatPanel>

<style>
  .context {
    display: flex;
    gap: var(--space-3);
    justify-content: space-between;
    align-items: start;
    padding: var(--content-padding-block) var(--content-padding-inline);
    border-bottom: var(--border-width) solid var(--border-prominent);
  }

  strong {
    display: block;
    margin-top: var(--space-1);
    font-weight: var(--ui-weight);
    color: var(--text-prominent);
  }

  button {
    min-width: var(--control-min-size);
    min-height: var(--control-min-size);
    padding: var(--space-1);
    border: 0;
    background: none;
    color: var(--text-primary);
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    cursor: pointer;
  }

  button:disabled {
    opacity: var(--disabled-opacity);
    cursor: default;
  }

  button:focus-visible {
    outline: var(--focus-width) solid var(--focus-color);
    outline-offset: calc(-1 * var(--focus-width));
  }

  .welcome {
    padding-block: var(--space-3);
    text-align: center;
  }

  .welcome > span {
    font-family: var(--font-mono);
    font-size: var(--heading-3-size);
    line-height: var(--ui-line-height);
    color: var(--accent);
  }

  /* ChatWindow applies the UI role; the welcome restores heading and reading typography. */
  h3 {
    margin-block: var(--content-gap-block);
    font-family: var(--font-serif);
    font-size: var(--heading-3-size);
    font-weight: var(--heading-weight);
    line-height: var(--heading-line-height);
    letter-spacing: var(--heading-letter-spacing);
    text-transform: none;
    color: var(--text-prominent);
  }

  .welcome > p {
    font-family: var(--font-sans);
    font-size: var(--body-font-size);
    font-weight: var(--body-weight);
    line-height: var(--body-line-height);
    letter-spacing: var(--body-letter-spacing);
    text-transform: none;
  }
</style>
