<script>
  import { ErrorPage } from "@dg/ui";

  const status = 404;
</script>

<svelte:head>
  <title>{status} — Erreur</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<ErrorPage {status} lang="fr" />
