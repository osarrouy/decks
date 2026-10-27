<script>
  import { onMount } from "svelte";
  import { version } from "$app/env";
  import { track } from "@dg/ui";
  import { Chat, ChatWindow, Conversation } from "@dg/bloom";

  let { course, chapter } = $props();
  // One conversation per course: the layout remounts the assistant when the course changes.
  const chat = new Conversation({ version, track });
  // The backend receives only the messages, so the suggestions name the chapter they ask about.
  let suggestions = $derived([
    `Résume le chapitre « ${chapter.label} »`,
    `Comment réviser le chapitre « ${chapter.label} » ?`,
    `Quelles lectures pour approfondir « ${chapter.label} » ?`,
  ]);

  onMount(() => {
    chat.start();
    return () => chat.stop();
  });
</script>

<ChatWindow
  id="course-assistant"
  title="Assistant IA"
  subtitle={course.title}
  badge={chat.demo ? "Démo" : ""}
>
  <Chat {chat} name="Assistant IA" {suggestions} toolbar={false}>
    {#snippet welcome()}
      <h3>Une question sur le cours ?</h3>
      <p>Gardez vos supports sous les yeux et poursuivez la discussion ici.</p>
    {/snippet}
  </Chat>
</ChatWindow>
