<script>
  import { page } from "$app/state";
  import { ErrorPage } from "@dg/ui";

  let status = $derived(page.status);
</script>

<svelte:head>
  <title>{status} — Erreur</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<ErrorPage {status} lang="fr" />
