import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import {
  parseSingleFileDeck,
  renderGeneratedSlide,
  resolveDeckTemplateConfig,
  type DeckTemplateConfig
} from '../deck/singleFile.js'

export type NotesAudience = 'presenter' | 'student'

export type SingleFileDeckPluginOptions = DeckTemplateConfig & {
  /** Project root. Defaults to Vite's root. */
  root?: string
  /** Remove previously generated slide/note files before writing. */
  clean?: boolean
  /** Filter generated notes for the target audience. */
  notesAudience?: NotesAudience
}

function posixish(path: string) {
  return path.replace(/\\/g, '/')
}

function filterStudentNotes(markdown: string) {
  const lines = markdown.split('\n')
  const filtered: string[] = []
  let inCommentDirective = false
  let inCommentCallout = false

  for (const line of lines) {
    if (inCommentDirective) {
      if (/^\s*:::\s*$/.test(line)) inCommentDirective = false
      continue
    }

    if (/^\s*:::\s*comment\b/i.test(line)) {
      inCommentDirective = true
      continue
    }

    if (/^\s*>\s*\[!COMMENT\]\s*$/i.test(line)) {
      inCommentCallout = true
      continue
    }

    if (inCommentCallout) {
      if (/^\s*>\s?/.test(line) || /^\s*$/.test(line)) continue
      inCommentCallout = false
    }

    filtered.push(line)
  }

  return filtered.join('\n').trim()
}

function transformNotes(notes: string, audience: NotesAudience) {
  return audience === 'student' ? filterStudentNotes(notes) : notes
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
      const notes = slide.notes ? transformNotes(slide.notes, options.notesAudience) : ''
      const writes = [writeIfChanged(slidePath, renderGeneratedSlide(slide))]

      if (notes) {
        writes.push(writeIfChanged(join(outDir, `${slide.id}.notes.md`), `${notes}\n`))
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
      clean: options.clean ?? true,
      notesAudience: options.notesAudience ?? 'presenter'
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
