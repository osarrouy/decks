import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { sveltekit } from "@sveltejs/kit/vite";
import { uiPostcss } from "../tooling/postcss.js";

const workspace = fileURLToPath(new URL("../", import.meta.url));
const uiRoot = resolve(
  dirname(fileURLToPath(import.meta.resolve("@dg/ui"))),
  "..",
);
const origins = JSON.parse(process.env.COURSE_DECK_ORIGINS || "{}");

export default ({ isPreview }) =>
  isPreview
    ? {
        // Preview the assembled output, including decks copied after the Kit build.
        appType: "mpa",
        build: { outDir: "build" },
      }
    : {
        plugins: [sveltekit()],
        css: {
          postcss: uiPostcss(
            fileURLToPath(import.meta.resolve("@dg/ui/breakpoints.css")),
          ),
        },
        resolve: { dedupe: ["svelte"] },
        optimizeDeps: { exclude: ["@dg/ui"] },
        ssr: { noExternal: ["@dg/ui"] },
        server: {
          fs: { allow: [workspace, uiRoot] },
          proxy: Object.fromEntries(
            Object.entries(origins).map(([base, target]) => [
              base,
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
