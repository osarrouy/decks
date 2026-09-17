<script>
  import { tick } from "svelte";
  import { excerpt } from "./course-content.js";
  import {
    ChatPanel,
    ChatContext,
    ChatThread,
    ChatMessage,
    ChatWelcome,
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
  <ChatContext
    label="Chapitre en cours"
    title={chapter.label}
    canClear={Boolean(messages.length)}
    onclick={() => (messages = [])}
  />
  <ChatThread bind:this={log} label="Discussion de démonstration">
    {#if !messages.length}<ChatWelcome
        title="Une question sur le cours ?"
        description="Gardez vos supports sous les yeux et poursuivez la discussion ici."
        ><ChatSuggestions suggestions={prompts} onselect={send} /></ChatWelcome
      >{/if}
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
