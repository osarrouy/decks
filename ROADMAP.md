# Roadmap: align with the latest distributed·gallery packages

This repository consumes packages from the distributed·gallery monorepo (`distributedgallery/interfaces`, checked out locally at `~/Code/@dg`). This file lists everything required to move the portal and the deck framework to the latest versions of those packages, verify the result locally, and deploy it once the owner approves. Remove each item when it is done, and delete this file when the alignment is deployed.

## Instructions for the agent

1. Read this file, the [project overview](README.md), [AGENTS.md](AGENTS.md), the [portal guide](site/README.md) and the [framework guide](svx-deck/README.md). On the @dg side, read `~/Code/@dg/README.md`, `~/Code/@dg/packages/ui/docs/maintain/changes.md` and the README of every package listed under [Packages](#packages).
2. Do every step under [Align locally](#align-locally), then run every check under [Verify locally](#verify-locally). Fix failures and record unresolved ones; do not hide them.
3. **Stop at [Approval gate](#approval-gate).** Report what changed, what was verified and what remains, then wait for the owner's explicit approval.
4. Only after that approval, follow [Deploy](#deploy).

Re-check every fact below against the current code before acting on it: these notes were written on 2026-10-22, and both repositories keep moving.

## How the packages are consumed

- **Local development** links the live @dg checkout through `pnpm.overrides` in the root [`package.json`](package.json), for example `"@dg/ui": "link:../../../../Code/@dg/packages/ui"`. `site/` and `svx-deck/` declare `"@dg/ui": "*"`. Edits in `~/Code/@dg` appear immediately, without a build.
- **CI and Railway** clone `distributedgallery/interfaces` at one pinned commit with a read-only deploy key ([`tooling/fetch-ci-ui.mjs`](tooling/fetch-ci-ui.mjs), constant `ref`), then [`tooling/ci-ui.mjs`](tooling/ci-ui.mjs) rewrites the override and the lockfile so that they point to `.ci/interfaces/packages/ui`. That commit pins every @dg package at once.
- **Transitive dependencies of linked packages are not installed in CI.** The CI clone never runs `pnpm install`, so whatever a linked package imports must be resolvable from this workspace's own `node_modules`. This is why `@csstools/postcss-global-data` and `postcss-custom-media` (dependencies of `@dg/ui`) are listed in the root `devDependencies`. Locally the problem is invisible, because `~/Code/@dg` has its own `node_modules`.
- **Local and deployed versions can therefore differ.** Local development runs against the @dg working tree, while deployment uses the pinned commit. To test what will deploy, the @dg checkout must sit exactly at the commit that is about to be pinned, with a clean working tree.

## Current state (2026-10-22)

| Item                   | Value                                                                                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pinned @dg commit      | `ce6fa7d` (2026-09-19), `@dg/ui` 0.1.0, 72 commits behind @dg `main` on 2026-10-22                                                                                                 |
| `@dg/ui` on @dg `main` | 0.4.0, with breaking changes in 0.2.0, 0.3.0 and 0.4.0                                                                                                                             |
| `@dg/infrastructure`   | Added on 2026-10-18, after the pin. `@dg/ui` imports `@dg/infrastructure/analytics` (in `src/i18n.js`), so **raising the pin without handling it breaks the CI and Railway build** |
| `@dg/bloom`            | Planned: the Bloom backend client extracted from the Bloom app. Check whether `packages/bloom` exists at the target commit                                                         |
| Frameworks here        | SvelteKit 2, Vite 6, `vite-plugin-svelte` 5, `adapter-static` 3                                                                                                                    |
| Frameworks in @dg apps | SvelteKit 3, Vite 8, `vite-plugin-svelte` 7, `adapter-static` 4, Node 22.17+                                                                                                       |
| Course assistant       | [`site/src/lib/Chat.svelte`](site/src/lib/Chat.svelte) returns canned local answers; no backend is connected                                                                       |

`@dg/ui` components do not import `$app/*`, so they run under SvelteKit 2. The `@dg/ui/config/*` factories target SvelteKit 3 and are not used here. Upgrading this repository to SvelteKit 3 is **not** part of this alignment unless the owner asks for it.

## Packages

Align every @dg package that this repository uses at the target commit:

| Package              | Consumer              | Role                                                                            |
| -------------------- | --------------------- | ------------------------------------------------------------------------------- |
| `@dg/ui`             | `site/`, `svx-deck/`  | Components, tokens, CSS foundations, fonts and the `Analytics` component        |
| `@dg/infrastructure` | `@dg/ui` (transitive) | Facts shown in the statistics privacy dialog; apps never import it directly     |
| `@dg/bloom`          | `site/` (assistant)   | Bloom backend client: SSE conversation, errors, history, diagnostics, demo mode |

If the target commit adds another package that is imported by one of these, apply the same rules: a local link, CI rewriting, and its runtime dependencies available from this workspace.

## Align locally

### 1. Choose the target commit

- In `~/Code/@dg`: `git fetch`, then confirm that the working tree is clean and that `HEAD` equals `origin/main` (or the commit chosen by the owner). Record its full SHA. Any uncommitted or unpushed @dg change will not deploy.
- Commit or set aside this repository's unrelated uncommitted work first. On 2026-10-22, `decks/` and `site/src/lib/` contained uncommitted edits: ask the owner before touching them.

### 2. Apply the toolkit migrations

- Read `~/Code/@dg/packages/ui/docs/maintain/changes.md` from **0.2.0 through the current version**. Every breaking entry states its migration. Apply each one that affects `site/`, `svx-deck/` or `decks/*/components/`.
- Search this repository for every removed or renamed name the changelog lists, including tokens, classes, props, custom media and components. Examples from 0.2.0 to 0.4.0: `--focus-color`, `--duration-fast/normal/slow`, `--ease-standard`, `--radius-small/medium`, `--font-size-sm/md`, `--{role}-weight`, `(--wide)`, `field-help`, `field-error`, `field-label`, `GridFlicker`, `.grid-bg`, `Instrument Serif`, `minWidth={…}` as a number, and `Section padding="default"`. Treat this list as a starting point; the changelog is authoritative.
- Changed visual defaults (Page width, Section padding, Heading sizes, frame crosses, `.button`, forms, `code`/`pre`, tables, lists, `.feedback`) need a rendered check rather than a text search.
- Theme: the outermost `Page` now restores the saved theme before first paint. Delete any theme script from `site/src/app.html` and from the generated deck shell, if one exists.
- Breakpoints: both Vite configurations expand `@dg/ui/breakpoints.css` through [`tooling/postcss.js`](tooling/postcss.js). Check that the custom media names used locally still exist.
- Some migrations are already committed here, because local development follows the @dg working tree. For example, `svx-deck/src/lib/components/SlideSurface.svelte` and `decks/blockchain-consensus/components/HashChain.svelte` use the 0.3/0.4 class names `.typescale` and `.formatted`, which the pinned 0.1.0 does not define. Production may therefore already differ from local rendering. Identify these drifts, and do not undo them.

### 3. Dependencies and links

- Add `@dg/infrastructure` with a `link:` override to `~/Code/@dg/packages/infrastructure`, and declare it as a root dependency so that it resolves from the CI clone of `@dg/ui`.
- Add `@dg/bloom` with a `link:` override to `~/Code/@dg/packages/bloom`, and `"@dg/bloom": "*"` in `site/package.json`. Declare its runtime dependencies at the root as well, if it has any (the intended design has none besides `svelte`).
- Compare the versions of the root `devDependencies` mirrored for `@dg/ui` (`@csstools/postcss-global-data`, `postcss-custom-media`) with the `dependencies` of `packages/ui/package.json` at the target commit, and add any new one.
- Check that Svelte satisfies every package's `svelte` peer range, and that Vite still deduplicates Svelte.
- Run `pnpm install` and review the lockfile diff.

### 4. CI and Railway checkout

- [`tooling/ci-ui.mjs`](tooling/ci-ui.mjs) rewrites only `@dg/ui` and requires its link in the lockfile entries of `.`, `site` and `svx-deck`. Generalize it to rewrite **every** `link:` override that points into the @dg checkout (`packages/<name>`). Each link should be required where it actually appears: `@dg/infrastructure` may appear only in the root importer.
- Update the pinned `ref` in [`tooling/fetch-ci-ui.mjs`](tooling/fetch-ci-ui.mjs) only at [Deploy](#deploy), not before approval. Its error messages and names mention “UI”: rename them if they now cover several packages, and keep [`tooling/fetch-ci-ui.test.mjs`](tooling/fetch-ci-ui.test.mjs) passing.
- Update the setup and deployment paragraphs of [README.md](README.md) and [site/README.md](site/README.md) to describe every linked package.

### 5. Statistics (`Analytics`)

- Every distributed·gallery site measures visits with `Analytics` (see `~/Code/@dg/packages/ui/docs/components/analytics.md`). Mount one `Analytics {page}` inside `Page` in [`site/src/routes/+layout.svelte`](site/src/routes/+layout.svelte); `Footer` then shows the privacy control. The dialog follows `Page`'s `lang`, which must be French here.
- Serve `/analytics-config.json` from [`site/deploy/Caddyfile`](site/deploy/Caddyfile), copying the `handle /analytics-config.json` block from `~/Code/@dg/apps/boilerplate/Caddyfile`. Its defaults point to the shared distributed·gallery Umami website. `UMAMI_ENDPOINT` and `UMAMI_WEBSITE_ID` override them, and an empty website ID turns statistics off. Place the block before `file_server`.
- Declare `events` only for fixed, content-free actions worth counting (for example opening the assistant or sending a question), describe them in the `Analytics` children, and send them with `track`. Never derive an event name from content.
- **Decide with the owner** whether standalone and embedded decks (`/slides/<id>/`) are measured. They are separate SvelteKit apps, and each one would need its own `Analytics` mount. Speaker-note and presenter views should not be measured.
- Local development does not use `createViteConfig`, so no local configuration or collector is served and statistics stay off in `pnpm dev`, with no footer control. Verify the control on the Docker image built in [Verify locally](#verify-locally), with `UMAMI_WEBSITE_ID` set to an empty value so that no test visit reaches Umami.

### 6. Course assistant with `@dg/bloom`

- Replace the canned answers in [`site/src/lib/Chat.svelte`](site/src/lib/Chat.svelte) with the `@dg/bloom` conversation API, following that package's README and `~/Code/@dg/apps/bloom` as the reference consumer (send, stop, retry, reset, errors, registered sources, diagnostics).
- Pass the frontend version and API base explicitly: the package must not import `$app/*`.
- Proxy `POST /api/chat` and `GET /api/documents` in [`site/deploy/Caddyfile`](site/deploy/Caddyfile), as `~/Code/@dg/apps/bloom/Caddyfile` does: `reverse_proxy {$BLOOM_API_ORIGIN}`, with `header_up Authorization "Bearer {$BLOOM_API_KEY}"` and `header_up -Cookie`. Return 404 for other `/api` paths. The key stays in Railway variables and never reaches the browser, the repository or logs.
- For local development, proxy the same two routes in the site's Vite configuration, as `~/Code/@dg/apps/bloom/vite.config.js` does.
- **Decide with the owner** which backend and corpus the course uses (the Bloom instance or a dedicated consumer), and which suggestions, labels and texts the assistant shows.
- Automated tests must use the package's demonstration mode or a simulated backend, never real paid generation.

## Verify locally

Run from this repository's root, with `~/Code/@dg` at the target commit:

```sh
pnpm install
pnpm check
pnpm deck build decks/cybernetics --public
pnpm deck build decks/cybernetics --presenter
pnpm deck export decks/cybernetics
pnpm build
PLAYWRIGHT_CHANNEL=chrome pnpm test:ui
```

- Build and serve the production image, then run the HTTP check, as described in [site/README.md](site/README.md#railway-deployment): `node site/scripts/prepare-deploy.mjs`, `docker build`, `docker run` with `-e UMAMI_WEBSITE_ID=` (plus the Bloom variables if the assistant is connected), then `node site/scripts/check-deploy.mjs http://127.0.0.1:8080`.
- Simulate the CI checkout before relying on it. In a disposable copy of this repository, without `node_modules`, place a clone of @dg at the target commit under `.ci/interfaces` and run `CI=true node tooling/ci-ui.mjs`, then `pnpm install --frozen-lockfile` and `pnpm build`. This proves that every linked package and its imports resolve without the local @dg `node_modules`. Never run `ci-ui.mjs` in the real working tree: it rewrites `package.json` and `pnpm-lock.yaml`.
- Rendered check: the portal, a course page, a chapter, the assistant, the 404 page and several decks (projection, presenter, embedded), on desktop and mobile, in both themes, with keyboard navigation and reduced motion. Check the footer privacy control on the Docker image. Compare against the current production site for unintended visual changes caused by the new toolkit defaults.

## Approval gate

Report to the owner:

- the target @dg commit and the packages it pins;
- every migration applied, and any visual default that was kept or overridden;
- the results of every command above, distinguishing pre-existing failures from new ones;
- open decisions (deck statistics, assistant backend and texts, any Railway variable to add).

Do not change the pinned `ref`, commit, push or modify Railway until the owner explicitly approves.

## Deploy

1. Confirm that the target @dg commit is pushed to `distributedgallery/interfaces`.
2. Add the new Railway variables to the course service **before** pushing: `BLOOM_API_ORIGIN`, `BLOOM_API_KEY`, and `UMAMI_ENDPOINT`/`UMAMI_WEBSITE_ID` only to override the defaults. `DG_UI_DEPLOY_KEY` and `RAILPACK_CONFIG_FILE` stay unchanged.
3. Set `ref` in [`tooling/fetch-ci-ui.mjs`](tooling/fetch-ci-ui.mjs) to the full target SHA and commit it together with the alignment, using a message that names the @dg commit.
4. Push to `main` of `osarrouy/decks`. The [Site workflow](.github/workflows/site.yml) runs, and Railway waits for it before building the same commit.
5. Watch the workflow, then the Railway deployment. If either fails, report the logs to the owner before trying a fix.
6. After deployment: `node site/scripts/check-deploy.mjs https://<public-domain>`, a short rendered check of the live site, one test visit visible in Umami (filter by hostname), and one assistant question if the backend is connected and the owner agrees to a paid call.
7. Rollback: revert the commit and push. The previous pinned `ref` comes back with it.

Future alignments only need the [Choose the target commit](#1-choose-the-target-commit), [Apply the toolkit migrations](#2-apply-the-toolkit-migrations), [Verify locally](#verify-locally) and [Deploy](#deploy) steps, starting from the version recorded in the deployed pin.
