<script>
  import { ChatWindow } from "@dg/ui";
  import Chat from "./Chat.svelte";
  let { course, chapter } = $props();
</script>

<ChatWindow
  id="course-assistant"
  title="Assistant IA"
  subtitle={course.title}
  badge="Démo"><Chat {course} {chapter} /></ChatWindow
>
