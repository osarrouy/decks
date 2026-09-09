import { existsSync } from "node:fs";
import { mkdir, readFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { loadConfigFromFile } from "vite";
import {
  parseSingleFileDeck,
  resolveDeckTemplateConfig,
} from "../lib/deck/singleFile.mjs";
import { writeIfChanged } from "./files.mjs";

export async function loadDeckConfig(deckRoot) {
  const path = resolve(deckRoot, "deck.config.ts");
  const loaded = existsSync(path)
    ? ((
        await loadConfigFromFile({ command: "build", mode: "production" }, path)
      )?.config ?? {})
    : {};
  const template = resolveDeckTemplateConfig(loaded.template);
  const source = await readFile(resolve(deckRoot, template.source), "utf8");
  const { config } = parseSingleFileDeck(source, template);
  // Select supported fields: historical theme declarations do not configure rendering.
  return {
    id: loaded.id ?? config.id ?? "deck",
    title: loaded.title ?? config.title ?? "Slides",
    description: loaded.description ?? config.description,
    template,
  };
}

export async function ensureRuntimeApp(deckRoot, options = {}) {
  const { view = "deck", base = "", dev = false } = options;
  const mode = view === "embed" && dev ? "embed-dev" : view;
  const appRoot = resolve(deckRoot, `.svx-deck/${mode}`);
  const src = resolve(appRoot, "src");
  const routes = resolve(src, "routes");
  const configPath = resolve(src, "generated/deck-config.mjs");
  const outputDir = options.outputDir ?? resolve(deckRoot, "build");
  const staticDir = existsSync(resolve(deckRoot, "static"))
    ? resolve(deckRoot, "static")
    : resolve(appRoot, "static");
  const config = await loadDeckConfig(deckRoot);
  const presenter = view === "deck" && (dev || options.presenter);
  for (const dir of [
    routes,
    resolve(src, "generated"),
    resolve(src, "lib"),
    staticDir,
  ]) {
    await mkdir(dir, { recursive: true });
  }
  if (presenter) await mkdir(resolve(routes, "presenter"), { recursive: true });
  else await rm(resolve(routes, "presenter"), { recursive: true, force: true });

  const files = {
    "package.json": JSON.stringify({
      type: "module",
      private: true,
      name: "svx-deck-runtime",
    }),
    "svelte.config.js": `import { svelteConfig } from '@svx-deck/core/runtime/config'
export default svelteConfig(${JSON.stringify({ staticDir, outputDir, base })})`,
    "vite.config.mjs": `import { viteConfig } from '@svx-deck/core/runtime/config'
export default viteConfig(${JSON.stringify({ deckRoot, appRoot, configPath, staticDir, base, template: config.template, view })})`,
    "src/generated/deck-config.mjs": `export default ${JSON.stringify(config)}`,
    "src/app.html": `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script>
      try { if (localStorage.getItem('dg-theme') === 'dark') document.documentElement.dataset.theme = 'dark' } catch {}
    </script>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>`,
    "src/routes/+layout.svelte": `<script>
  import '@svx-deck/core/styles.css'
  import { onMount } from 'svelte'
  import { SkipLink } from '@dg/ui'
  import { syncTheme } from '@svx-deck/core/runtime/theme'
  let { children } = $props()
  onMount(syncTheme)
</script>
<SkipLink />
{@render children()}`,
    "src/routes/+layout.ts":
      "export const prerender = true\nexport const ssr = true",
    "src/routes/+page.svelte": page(
      view === "students"
        ? "StudentView"
        : view === "embed"
          ? "EmbeddedView"
          : "DeckView",
    ),
  };
  const loader = await readFile(
    new URL("./deck.ts.template", import.meta.url),
    "utf8",
  );
  files["src/lib/deck.ts"] = loader.replace(
    "__INCLUDE_NOTES__",
    view === "embed"
      ? "false"
      : "import.meta.env.DEV || import.meta.env.VITE_INCLUDE_NOTES === 'true'",
  );
  if (presenter)
    files["src/routes/presenter/+page.svelte"] = page("PresenterView");
  for (const [file, content] of Object.entries(files)) {
    await writeIfChanged(resolve(appRoot, file), content + "\n");
  }
  return { appRoot, configFile: resolve(appRoot, "vite.config.mjs") };
}

function page(component) {
  return `<script lang="ts">
  import ${component} from '@svx-deck/core/components/${component}.svelte'
  import { deck } from '$lib/deck'
</script>
<${component} {deck} />`;
}
