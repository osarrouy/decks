import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import {
  parseSingleFileDeck,
  renderGeneratedSlide,
  resolveDeckTemplateConfig,
  type DeckTemplateConfig
} from '../deck/singleFile.js'

export type SingleFileDeckPluginOptions = DeckTemplateConfig & {
  /** Project root. Defaults to Vite's root. */
  root?: string
  /** Remove previously generated slide/note files before writing. */
  clean?: boolean
}

function posixish(path: string) {
  return path.replace(/\\/g, '/')
}

async function cleanGeneratedFiles(outDir: string) {
  try {
    const files = await readdir(outDir)
    await Promise.all(
      files
        .filter((file) => file.endsWith('.svx') || file.endsWith('.notes.md'))
        .map((file) => rm(join(outDir, file), { force: true }))
    )
  } catch {
    // The directory may not exist yet.
  }
}

async function writeIfChanged(path: string, content: string) {
  try {
    const previous = await readFile(path, 'utf8')
    if (previous === content) return
  } catch {
    // File does not exist yet.
  }

  await writeFile(path, content)
}

async function generateSingleFileDeck(options: Required<SingleFileDeckPluginOptions>) {
  const sourcePath = resolve(options.root, options.source)
  const outDir = resolve(options.root, options.outDir)

  let source: string
  try {
    source = await readFile(sourcePath, 'utf8')
  } catch {
    return { sourcePath, outDir, generated: 0, skipped: true }
  }

  const deck = parseSingleFileDeck(source, options)

  await mkdir(outDir, { recursive: true })
  if (options.clean) await cleanGeneratedFiles(outDir)

  await Promise.all(
    deck.slides.flatMap((slide) => {
      const slidePath = join(outDir, `${slide.id}.svx`)
      const writes = [writeIfChanged(slidePath, renderGeneratedSlide(slide))]

      if (slide.notes) {
        writes.push(writeIfChanged(join(outDir, `${slide.id}.notes.md`), `${slide.notes.trim()}\n`))
      }

      return writes
    })
  )

  return { sourcePath, outDir, generated: deck.slides.length, skipped: false }
}

function reloadGeneratedDeck(server: any, outDir: string) {
  server.watcher.add(outDir)
  server.ws.send({ type: 'full-reload' })
}

export function svxSlidesSingleFileDeck(options: SingleFileDeckPluginOptions = {}) {
  let viteConfig: any
  let resolved: Required<SingleFileDeckPluginOptions>

  const setup = () => {
    const template = resolveDeckTemplateConfig(options)
    resolved = {
      root: options.root ? resolve(options.root) : viteConfig.root,
      source: template.source,
      outDir: template.outDir,
      slideSeparator: template.slideSeparator,
      notesSeparator: template.notesSeparator,
      clean: options.clean ?? true
    }
  }

  const run = async () => generateSingleFileDeck(resolved)

  return {
    name: 'svx-slides:single-file-deck',
    enforce: 'pre' as const,

    configResolved(config: any) {
      viteConfig = config
      setup()
    },

    async buildStart() {
      await run()
    },

    configureServer(server: any) {
      const sourcePath = resolve(resolved.root, resolved.source)
      server.watcher.add(sourcePath)

      server.watcher.on('add', async (changedPath: string) => {
        if (posixish(changedPath) !== posixish(sourcePath)) return
        const result = await run()
        reloadGeneratedDeck(server, result.outDir)
      })

      server.watcher.on('change', async (changedPath: string) => {
        if (posixish(changedPath) !== posixish(sourcePath)) return
        const result = await run()
        reloadGeneratedDeck(server, result.outDir)
      })
    }
  }
}
