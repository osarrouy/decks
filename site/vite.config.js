import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { loadEnv } from "vite";
import { bloomBackend } from "@dg/bloom/vite";
import { uiPostcss } from "../tooling/postcss.js";
import { deckProxyContext } from "./scripts/decks.mjs";

const workspace = fileURLToPath(new URL("../", import.meta.url));
// Every linked @dg package comes from the same checkout.
const packages = resolve(
  dirname(fileURLToPath(import.meta.resolve("@dg/ui"))),
  "../..",
);
const origins = JSON.parse(process.env.COURSE_DECK_ORIGINS || "{}");

export default ({ isPreview, mode }) => {
  // The assistant's requests reach the Bloom backend through this proxy, as Caddy does in production.
  const backend = bloomBackend(
    loadEnv(mode, process.cwd(), "BLOOM_").BLOOM_BACKEND_ORIGIN || undefined,
  );
  return isPreview
    ? {
        // Preview the assembled output, including decks copied after the Kit build.
        appType: "mpa",
        build: { outDir: "build" },
        plugins: [backend],
      }
    : {
        plugins: [
          sveltekit({ adapter: adapter(), paths: { relative: false } }),
          backend,
        ],
        css: {
          postcss: uiPostcss(
            fileURLToPath(import.meta.resolve("@dg/ui/breakpoints.css")),
          ),
        },
        resolve: { dedupe: ["svelte"] },
        optimizeDeps: { exclude: ["@dg/ui", "@dg/bloom"] },
        ssr: { noExternal: ["@dg/ui", "@dg/bloom"] },
        server: {
          fs: { allow: [workspace, packages] },
          proxy: Object.fromEntries(
            Object.entries(origins).map(([base, target]) => [
              deckProxyContext(base),
              {
                target,
                ws: true,
                // Preserve existing published deck URLs while using the live root route.
                rewrite: (path) =>
                  path.replace(`${base}/index.html`, `${base}/`),
              },
            ]),
          ),
        },
      };
};
