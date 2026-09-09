#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build, createServer, loadConfigFromFile, preview } from 'vite'

const coreRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

function usage() {
  console.log(`svx-slides

Usage:
  svx-slides dev <deck-dir> [--students|--embed] [--base /prefix] [--host 0.0.0.0] [--port 5173]
  svx-slides build <deck-dir> [--public|--presenter|--students|--embed] [--base /prefix] [--out-dir path]
  svx-slides export <deck-dir>
  svx-slides preview <deck-dir> [--host 0.0.0.0] [--port 4173]
`)
}

function parseArgs(argv) {
  const [command, deckDirArg = '.'] = argv
  const flags = {}

  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index]
    if (!token.startsWith('--')) continue

    const [rawKey, inlineValue] = token.slice(2).split(/=(.*)/s)
    const next = argv[index + 1]
    flags[rawKey] = inlineValue ?? (next && !next.startsWith('--') ? argv[++index] : true)
  }

  return { command, deckDirArg, flags }
}

function normalizeTheme(theme) {
  if (!theme || theme === 'default') return '@svx-slides/theme-default'
  if (theme.startsWith('@')) return theme
  return `@svx-slides/theme-${theme}`
}

function themeWorkspaceName(themePackage) {
  return themePackage.match(/^@svx-slides\/theme-(.+)$/)?.[1]
}

function resolveThemeStylePath(deckRoot, themePackage) {
  const name = themeWorkspaceName(themePackage)
  if (!name) return undefined

  const candidates = [
    resolve(deckRoot, 'themes', name, 'src/style.css'),
    resolve(deckRoot, '..', 'themes', name, 'src/style.css'),
    resolve(deckRoot, '..', '..', 'themes', name, 'src/style.css'),
    resolve(coreRoot, '..', 'themes', name, 'src/style.css')
  ]

  return candidates.find((candidate) => existsSync(candidate))
}

function jsString(value) {
  return JSON.stringify(value)
}

function rel(from, to) {
  return relative(from, to).replace(/\\/g, '/')
}

async function loadDeckConfig(realConfigPath) {
  if (!existsSync(realConfigPath)) {
    return {
      title: 'Slides',
      theme: 'default'
    }
  }

  const loaded = await loadConfigFromFile(
    { command: 'build', mode: process.env.NODE_ENV ?? 'production' },
    realConfigPath
  )

  return loaded?.config ?? {
    title: 'Slides',
    theme: 'default'
  }
}

async function ensureRuntimeApp(deckRoot, options = {}) {
  const appRoot = resolve(deckRoot, `.svx-slides/${options.view === 'students' ? 'student-app' : options.view === 'embed' ? (options.dev ? 'embed-dev-app' : 'embed-app') : 'app'}`)
  const outputDir = options.outputDir ?? resolve(deckRoot, 'build')
  const base = options.base ?? ''
  const srcRoot = resolve(appRoot, 'src')
  const routesRoot = resolve(srcRoot, 'routes')
  const generatedRoot = resolve(srcRoot, 'generated')
  const realConfigPath = resolve(deckRoot, 'deck.config.ts')
  const deckConfigPath = resolve(generatedRoot, 'deck-config.mjs')
  const staticDir = resolve(deckRoot, 'static')
  const appStaticDir = resolve(appRoot, 'static')
  const componentsDir = resolve(deckRoot, 'components')
  const deckFile = resolve(deckRoot, 'deck.svx')
  const presenterRoute = resolve(routesRoot, 'presenter')

  await mkdir(routesRoot, { recursive: true })
  if (options.view !== 'deck') await rm(presenterRoute, { recursive: true, force: true })
  else await mkdir(presenterRoute, { recursive: true })
  await mkdir(generatedRoot, { recursive: true })
  await mkdir(resolve(srcRoot, 'lib'), { recursive: true })
  await mkdir(appStaticDir, { recursive: true })

  if (!existsSync(deckFile)) {
    throw new Error(`Deck introuvable: ${deckFile}`)
  }

  const deckConfig = await loadDeckConfig(realConfigPath)
  const themePackage = normalizeTheme(deckConfig.theme)
  const themeStylePath = resolveThemeStylePath(deckRoot, themePackage)
  const coreStylesDir = resolve(coreRoot, 'src/lib/styles')
  await writeFile(deckConfigPath, `export default ${JSON.stringify(deckConfig, null, 2)}\n`)

  const pageComponent = options.view === 'students' ? 'StudentView' : options.view === 'embed' ? 'EmbeddedView' : 'DeckView'

  await writeFile(
    resolve(appRoot, 'package.json'),
    JSON.stringify({ type: 'module', private: true, name: 'svx-slides-runtime-app' }, null, 2) + '\n'
  )

  await writeFile(
    resolve(appRoot, 'svelte.config.js'),
    `import adapter from '@sveltejs/adapter-static'\nimport { mdsvex } from 'mdsvex'\nimport { vitePreprocess } from '@sveltejs/vite-plugin-svelte'\nimport { svxSlidesMarkdownPreprocess, svxSlidesMdsvexOptions } from '@svx-slides/core/mdsvex'\n\nexport default {\n  extensions: ['.svelte', '.svx'],\n  preprocess: [\n    vitePreprocess(),\n    svxSlidesMarkdownPreprocess(),\n    mdsvex(svxSlidesMdsvexOptions({ extensions: ['.svx'] }))\n  ],\n  kit: {\n    paths: { base: ${jsString(base)} },\n    files: {\n      assets: ${jsString(existsSync(staticDir) ? staticDir : appStaticDir)}\n    },\n    adapter: adapter({\n      pages: ${jsString(outputDir)},\n      assets: ${jsString(outputDir)},\n      fallback: undefined,\n      precompress: false,\n      strict: true\n    })\n  }\n}\n`
  )

  await writeFile(
    resolve(appRoot, 'vite.config.mjs'),
    `import { resolve } from 'node:path'\nimport { sveltekit } from '@sveltejs/kit/vite'\nimport { svxSlidesSingleFileDeck } from '@svx-slides/core/vite'\nimport { defineConfig } from 'vite'\nimport { svxSlidesStaticAssets } from ${jsString(pathToFileURL(resolve(coreRoot, 'src/lib/vite/staticAssets.mjs')).href)}\nimport deckConfig from ${jsString(pathToFileURL(deckConfigPath).href)}\n\nconst deckRoot = ${jsString(deckRoot)}\nconst coreRoot = ${jsString(coreRoot)}\nconst themePackage = ${jsString(themePackage)}\nconst themeStylePath = ${jsString(themeStylePath)}\nconst coreStylesDir = ${jsString(coreStylesDir)}\n\nfunction normalizePath(path) {\n  return path?.replace(/\\\\/g, '/')\n}\n\nfunction isWatchedStyle(file) {\n  const normalized = normalizePath(file)\n  const coreRoot = normalizePath(coreStylesDir)\n  const themeFile = normalizePath(themeStylePath)\n\n  return normalized === themeFile || normalized?.startsWith(coreRoot + '/')\n}\n\nfunction svxSlidesThemeCss() {\n  return {\n    name: 'svx-slides:theme-css',\n    resolveId(id) {\n      if (id === 'virtual:svx-slides/styles.css') return '\\0virtual:svx-slides/styles.css'\n    },\n    load(id) {\n      if (id !== '\\0virtual:svx-slides/styles.css') return\n      return \`@import '@svx-slides/core/styles.css';\\n@import '\${themePackage}/style.css';\\n\`\n    },\n    configureServer(server) {\n      server.watcher.add(coreStylesDir)\n      if (themeStylePath) server.watcher.add(themeStylePath)\n\n      server.watcher.on('change', (file) => {\n        if (!isWatchedStyle(file)) return\n\n        const mod = server.moduleGraph.getModuleById('\\0virtual:svx-slides/styles.css')\n        if (mod) server.moduleGraph.invalidateModule(mod)\n        server.ws.send({ type: 'full-reload' })\n      })\n    }\n  }\n}\n\nexport default defineConfig({\n  root: ${jsString(appRoot)},\n  plugins: [\n    svxSlidesSingleFileDeck({\n      root: deckRoot,\n      source: deckConfig.template?.source ?? 'deck.svx',\n      outDir: ${jsString(rel(deckRoot, resolve(srcRoot, 'generated/deck')))},\n      slideSeparator: deckConfig.template?.slideSeparator ?? '---',\n      notesSeparator: deckConfig.template?.notesSeparator ?? '--- notes',\n      notesAudience: ${jsString(options.view === 'students' ? 'student' : 'presenter')}\n    }),\n    svxSlidesStaticAssets(${jsString(staticDir)}, ${jsString(base)}),\n    svxSlidesThemeCss(),\n    sveltekit()\n  ],\n  resolve: {\n    alias: {\n      '$deck-config': ${jsString(deckConfigPath)},\n      '$components': ${jsString(componentsDir)}\n    }\n  },\n  optimizeDeps: {\n    exclude: ['@svx-slides/core', themePackage]\n  },\n  server: {\n    fs: {\n      allow: [deckRoot, coreRoot, resolve(deckRoot, '../..')]\n    }\n  },\n  ssr: {\n    noExternal: ['@svx-slides/core', themePackage]\n  }\n})\n`
  )

  await writeFile(
    resolve(srcRoot, 'app.html'),
    `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    %sveltekit.head%\n  </head>\n  <body data-sveltekit-preload-data="hover">\n    <div style="display: contents">%sveltekit.body%</div>\n  </body>\n</html>\n`
  )

  await writeFile(
    resolve(srcRoot, 'lib/deck.ts'),
    `import deckConfig from '$deck-config'\nimport type { Deck, DeckConfig, Slide, SlideMetadata } from '@svx-slides/core/deck/types'\n\nconst slideModules = import.meta.glob('/src/generated/deck/*.svx', { eager: true }) as Record<\n  string,\n  { default: any; metadata?: SlideMetadata }\n>\n\nconst includeNotes = ${options.view === 'embed' ? 'false' : "import.meta.env.DEV || import.meta.env.VITE_INCLUDE_NOTES === 'true'"}\n\nconst noteModules = (includeNotes\n  ? import.meta.glob('/src/generated/deck/*.notes.md', {\n      eager: true,\n      query: '?raw',\n      import: 'default'\n    })\n  : {}) as Record<string, string>\n\nfunction slideFileFromPath(path: string) {\n  return path.match(/\\/src\\/generated\\/deck\\/([^/]+)\\.svx$/)?.[1] ?? path\n}\n\nfunction orderFromFile(file: string) {\n  return Number(file.match(/^(\\d+)/)?.[1] ?? 9999)\n}\n\nfunction notePathForSlide(path: string) {\n  return path.replace(/\\.svx$/, '.notes.md')\n}\n\nconst config = (deckConfig ?? { title: 'Slides', theme: 'default' }) as DeckConfig\n\nconst slides: Slide[] = Object.entries(slideModules)\n  .map(([path, module]) => {\n    const file = slideFileFromPath(path)\n    const metadata = module.metadata ?? {}\n\n    return {\n      id: file,\n      order: orderFromFile(file),\n      title: typeof metadata.title === 'string' ? metadata.title : file.replace(/^\\d+[-_]?/, ''),\n      component: module.default,\n      metadata,\n      notes: noteModules[notePathForSlide(path)]\n    }\n  })\n  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))\n\nexport const deck: Deck = {\n  id: config.id ?? 'deck',\n  title: config.title,\n  description: config.description,\n  theme: config.theme ?? 'default',\n  slides\n}\n`
  )

  await writeFile(
    resolve(routesRoot, '+layout.svelte'),
    `<script lang="ts">\n  import 'virtual:svx-slides/styles.css'\n</script>\n\n<slot />\n`
  )

  await writeFile(resolve(routesRoot, '+layout.ts'), `export const prerender = true\nexport const ssr = true\n`)

  await writeFile(
    resolve(routesRoot, '+page.svelte'),
    `<script lang="ts">\n  import ${pageComponent} from '@svx-slides/core/components/${pageComponent}.svelte'\n  import { deck } from '$lib/deck'\n</script>\n\n<${pageComponent} {deck} />\n`
  )

  if (options.view === 'deck') {
    await writeFile(
      resolve(presenterRoute, '+page.svelte'),
      `<script lang="ts">\n  import { PresenterView } from '@svx-slides/core'\n  import { deck } from '$lib/deck'\n</script>\n\n<PresenterView {deck} />\n`
    )
  }

  return { appRoot, configFile: resolve(appRoot, 'vite.config.mjs') }
}

async function runDev(deckRoot, flags) {
  const view = flags.embed ? 'embed' : flags.students ? 'students' : 'deck'
  const base = flags.base ?? ''
  if (typeof base !== 'string' || (base && !/^\/(?!\/)[a-zA-Z0-9_/-]+$/.test(base)) || base.endsWith('/')) {
    throw new Error('--base must be a path such as /slides/history-1, without a trailing slash')
  }
  const { appRoot, configFile } = await ensureRuntimeApp(deckRoot, { view, base, dev: true })
  process.chdir(appRoot)
  const server = await createServer({
    root: appRoot,
    configFile,
    server: {
      host: flags.host === true ? '0.0.0.0' : flags.host,
      port: flags.port ? Number(flags.port) : undefined,
      strictPort: Boolean(flags['strict-port'])
    }
  })
  await server.listen()
  server.printUrls()
  // The portal launcher allocates a free port and waits for this ready signal.
  const address = server.httpServer.address()
  process.send?.({ type: 'svx-slides:ready', origin: `http://127.0.0.1:${address.port}` })
}

async function runBuild(deckRoot, flags) {
  const view = flags.embed ? 'embed' : flags.students ? 'students' : 'deck'
  if (flags.embed && (flags.presenter || flags.students)) throw new Error('--embed exports slides only; do not combine it with --presenter or --students')
  const base = flags.base ?? ''
  if (typeof base !== 'string' || (base && !/^\/(?!\/)[a-zA-Z0-9_/-]+$/.test(base)) || base.endsWith('/')) {
    throw new Error('--base must be a path such as /slides/history-1, without a trailing slash')
  }
  if (flags['out-dir'] === true) throw new Error('--out-dir requires a path')
  const outputDir = resolve(deckRoot, flags['out-dir'] || 'build')
  if (outputDir === deckRoot || deckRoot.startsWith(outputDir + '/') || ['static', 'components', 'source', '.svx-slides'].some(name => outputDir === resolve(deckRoot, name) || outputDir.startsWith(resolve(deckRoot, name) + '/'))) {
    throw new Error('--out-dir must be a dedicated build directory outside the deck sources')
  }
  if (outputDir !== resolve(deckRoot, 'build') && existsSync(outputDir) && (await readdir(outputDir)).length && !existsSync(resolve(outputDir, 'svx-slides.json'))) {
    throw new Error('--out-dir already exists and is not an svx-slides export')
  }
  const { appRoot, configFile } = await ensureRuntimeApp(deckRoot, { view, base, outputDir })
  process.env.VITE_INCLUDE_NOTES = flags.presenter || flags.students ? 'true' : 'false'
  await rm(outputDir, { recursive: true, force: true })
  process.chdir(appRoot)
  await build({ root: appRoot, configFile })
  const slides = (await readdir(resolve(appRoot, 'src/generated/deck'))).filter(file => file.endsWith('.svx'))
  await writeFile(resolve(outputDir, 'svx-slides.json'), JSON.stringify({
    version: 1, view, base, notes: Boolean(flags.presenter || flags.students), slideCount: slides.length
  }, null, 2) + '\n')
}

async function runPreview(deckRoot, flags) {
  const server = await preview({
    root: deckRoot,
    build: { outDir: 'build' },
    preview: {
      host: flags.host === true ? '0.0.0.0' : flags.host,
      port: flags.port ? Number(flags.port) : undefined
    }
  })
  server.printUrls()
}

const { command, deckDirArg, flags } = parseArgs(process.argv.slice(2))

if (!command || command === '--help' || command === '-h' || flags.help || flags.h) {
  usage()
  process.exit(command ? 0 : 1)
}

const deckRoot = resolve(process.cwd(), deckDirArg)

try {
  if (command === 'dev') await runDev(deckRoot, flags)
  else if (command === 'build') await runBuild(deckRoot, flags)
  else if (command === 'export') await runBuild(deckRoot, { ...flags, students: true })
  else if (command === 'preview') await runPreview(deckRoot, flags)
  else {
    usage()
    process.exit(1)
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
