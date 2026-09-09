import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { searchForWorkspaceRoot } from "vite";
import {
  svxDeckMarkdownPreprocess,
  svxDeckMdsvexOptions,
} from "../lib/mdsvex/index.mjs";
import { svxDeckSingleFileDeck } from "../lib/vite/index.mjs";
import { svxDeckStaticAssets } from "../lib/vite/staticAssets.mjs";

const coreRoot = fileURLToPath(new URL("../../", import.meta.url));
const uiRoot = resolve(
  dirname(fileURLToPath(import.meta.resolve("@dg/ui"))),
  "..",
);

export function svelteConfig({ staticDir, outputDir, base }) {
  return {
    extensions: [".svelte", ".svx"],
    preprocess: [
      vitePreprocess(),
      svxDeckMarkdownPreprocess(),
      mdsvex(svxDeckMdsvexOptions({ extensions: [".svx"] })),
    ],
    kit: {
      paths: { base },
      files: { assets: staticDir },
      adapter: adapter({ pages: outputDir, assets: outputDir, strict: true }),
    },
  };
}

export function viteConfig({
  deckRoot,
  appRoot,
  configPath,
  staticDir,
  base,
  template,
  view,
}) {
  return {
    root: appRoot,
    plugins: [
      svxDeckSingleFileDeck({
        ...template,
        root: deckRoot,
        outDir: resolve(appRoot, "src/generated/deck"),
        notesAudience: view === "students" ? "student" : "presenter",
      }),
      svxDeckStaticAssets(staticDir, base),
      sveltekit(),
    ],
    resolve: {
      dedupe: ["svelte"],
      alias: {
        "@dg/ui": uiRoot,
        "$deck-config": configPath,
        $components: resolve(deckRoot, "components"),
        // Frozen course components still contain the former import namespace.
        "@svx-slides/core": "@svx-deck/core",
        "@svx-slides/components": resolve(coreRoot, "src/lib/components"),
      },
    },
    optimizeDeps: { exclude: ["@svx-deck/core", "@dg/ui"] },
    ssr: { noExternal: ["@svx-deck/core", "@dg/ui"] },
    server: {
      fs: {
        allow: [deckRoot, coreRoot, uiRoot, searchForWorkspaceRoot(deckRoot)],
      },
    },
  };
}
