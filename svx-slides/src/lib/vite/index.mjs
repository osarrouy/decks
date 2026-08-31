import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const defaultDeckTemplateConfig = {
  source: 'deck.svx',
  outDir: 'src/generated/deck',
  slideSeparator: '---',
  notesSeparator: '--- notes'
}

function resolveDeckTemplateConfig(config = {}) {
  return { ...defaultDeckTemplateConfig, ...config }
}

function markerMatches(line, marker) {
  return line.trim() === marker
}

function normalizeNewlines(source) {
  return source.replace(/\r\n?/g, '\n')
}

function parseScalar(value) {
  const trimmed = value.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
  return trimmed.replace(/^['"]|['"]$/g, '')
}

function parseSimpleYaml(source) {
  const data = {}
  for (const line of source.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const match = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (match) data[match[1]] = parseScalar(match[2])
  }
  return data
}

function looksLikeFrontmatter(source) {
  return source
    .split('\n')
    .every((line) => !line.trim() || line.trim().startsWith('#') || /^[A-Za-z0-9_-]+:\s*/.test(line.trim()))
}

function extractFrontmatter(source, slideSeparator) {
  const lines = source.split('\n')
  if (!markerMatches(lines[0] ?? '', slideSeparator)) return { body: source }

  const closingIndex = lines.findIndex((line, index) => index > 0 && markerMatches(line, slideSeparator))
  if (closingIndex === -1) return { body: source }

  const frontmatter = lines.slice(1, closingIndex).join('\n')
  if (!looksLikeFrontmatter(frontmatter)) return { body: source }

  return { body: lines.slice(closingIndex + 1).join('\n') }
}

function parseSlideDirective(content) {
  const match = content.match(/^\s*<!--\s*slide(?::\s*([^]*?))?\s*-->\s*/)
  if (!match) return { metadata: {}, content }

  const metadata = {}
  const attributePattern = /([A-Za-z0-9_-]+)(?:=("[^"]*"|'[^']*'|[^\s]+))?/g
  let attribute
  while ((attribute = attributePattern.exec(match[1] ?? ''))) {
    metadata[attribute[1]] = attribute[2] === undefined ? true : parseScalar(attribute[2])
  }

  return { metadata, content: content.slice(match[0].length) }
}

function inferTitle(content, fallback) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]
  return heading ? heading.replace(/<[^>]+>/g, '').replace(/[*_`~]/g, '').trim() : fallback
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function compactBlock(lines) {
  return lines.join('\n').trim()
}

function buildSlide(contentLines, notesLines, index) {
  const rawContent = compactBlock(contentLines)
  const rawNotes = compactBlock(notesLines)
  if (!rawContent && !rawNotes) return undefined

  const { metadata, content } = parseSlideDirective(rawContent)
  const order = index + 1
  const title = String(metadata.title ?? inferTitle(content, `Slide ${order}`))
  const id = String(metadata.id ?? (slugify(title) || `slide-${order}`))
  const steps = typeof metadata.steps === 'number' ? metadata.steps : 0

  return {
    id,
    order,
    metadata: { ...metadata, title, steps, order },
    content: content.trim(),
    notes: rawNotes || undefined
  }
}

function parseSingleFileDeck(source, config = {}) {
  const template = resolveDeckTemplateConfig(config)
  const { body } = extractFrontmatter(normalizeNewlines(source), template.slideSeparator)
  const slides = []
  const contentLines = []
  const notesLines = []
  let inNotes = false

  const flush = () => {
    const slide = buildSlide(contentLines, notesLines, slides.length)
    if (slide) slides.push(slide)
    contentLines.length = 0
    notesLines.length = 0
    inNotes = false
  }

  for (const line of body.split('\n')) {
    if (markerMatches(line, template.slideSeparator)) {
      flush()
    } else if (markerMatches(line, template.notesSeparator)) {
      inNotes = true
    } else if (inNotes) {
      notesLines.push(line)
    } else {
      contentLines.push(line)
    }
  }

  flush()
  return { slides }
}

function serializeFrontmatter(metadata) {
  const entries = Object.entries(metadata).filter(([, value]) => value !== undefined && value !== false)
  if (entries.length === 0) return ''
  return `---\n${entries
    .map(([key, value]) => `${key}: ${typeof value === 'string' ? JSON.stringify(value) : value}`)
    .join('\n')}\n---\n\n`
}

const sharedComponentImport = "import { Persona } from '@svx-slides/components'"

function maskFencedCode(content) {
  return content.replace(/^```[^\n]*(?:\n|$)[\s\S]*?^```[ \t]*(?:\n|$)/gm, (block) =>
    block.replace(/[^\n]/g, ' ')
  )
}

function removeManualSharedImports(content) {
  const masked = maskFencedCode(content)
  const importPattern =
    /^[ \t]*import\s+(?:\{\s*Persona\s*\}|Persona)\s+from\s+['"]@svx-slides\/components(?:\/Persona\.svelte)?['"];?[ \t]*(?:\r?\n|$)/gm
  const matches = [...masked.matchAll(importPattern)]
  let result = content

  for (const match of matches.reverse()) {
    if (match.index === undefined) continue
    result = `${result.slice(0, match.index)}${result.slice(match.index + match[0].length)}`
  }

  return result
}

function injectSharedComponentImports(content) {
  const withoutManualImport = removeManualSharedImports(content)
  const masked = maskFencedCode(withoutManualImport)
  const scripts = [...masked.matchAll(/<script(?:\s[^>]*)?>/g)]
  const script = scripts.find(
    (match) => !/\bmodule\b/.test(match[0]) && !/\bcontext\s*=\s*['"]module['"]/.test(match[0])
  )

  if (!script || script.index === undefined) {
    return `<script>\n  ${sharedComponentImport}\n</script>\n\n${withoutManualImport.trim()}`
  }

  const insertion = script.index + script[0].length
  return `${withoutManualImport.slice(0, insertion)}\n  ${sharedComponentImport}${withoutManualImport.slice(insertion)}`
}
function normalizeStaticAssetUrls(content, deckRoot) {
  if (!deckRoot) return content

  return content.replace(/(["'`])\/assets\/([^"'`\s)]+)/g, (match, quote, asset) => {
    const rootAsset = resolve(deckRoot, 'static', asset)
    const nestedAsset = resolve(deckRoot, 'static', 'assets', asset)
    return existsSync(rootAsset) && !existsSync(nestedAsset) ? `${quote}/${asset}` : match
  })
}

function renderGeneratedSlide(slide, deckRoot) {
  const rendered = `${serializeFrontmatter(slide.metadata)}${injectSharedComponentImports(slide.content.trim())}\n`
  return normalizeStaticAssetUrls(rendered, deckRoot)
}

function posixish(path) {
  return path.replace(/\\/g, '/')
}

function filterStudentNotes(markdown) {
  const lines = markdown.split('\n')
  const filtered = []
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

function transformNotes(notes, audience) {
  return audience === 'student' ? filterStudentNotes(notes) : notes
}


async function cleanGeneratedFiles(outDir) {
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

async function writeIfChanged(path, content) {
  try {
    const previous = await readFile(path, 'utf8')
    if (previous === content) return
  } catch {
    // File does not exist yet.
  }

  await writeFile(path, content)
}

async function generateSingleFileDeck(options) {
  const sourcePath = resolve(options.root, options.source)
  const outDir = resolve(options.root, options.outDir)

  let source
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
      const fileStem = `${String(slide.order).padStart(3, '0')}-${slide.id}`
      const notes = slide.notes ? transformNotes(slide.notes, options.notesAudience) : ''
      const writes = [writeIfChanged(join(outDir, `${fileStem}.svx`), renderGeneratedSlide(slide, options.root))]
      if (notes) writes.push(writeIfChanged(join(outDir, `${fileStem}.notes.md`), `${notes}\n`))
      return writes
    })
  )

  return { sourcePath, outDir, generated: deck.slides.length, skipped: false }
}

function reloadGeneratedDeck(server, outDir) {
  server.watcher.add(outDir)
  server.ws.send({ type: 'full-reload' })
}

export function svxSlidesSingleFileDeck(options = {}) {
  let viteConfig
  let resolved

  const setup = () => {
    const template = resolveDeckTemplateConfig(options)
    resolved = {
      root: options.root ? resolve(options.root) : viteConfig.root,
      source: template.source,
      outDir: template.outDir,
      slideSeparator: template.slideSeparator,
      notesSeparator: template.notesSeparator,
      notesAudience: options.notesAudience ?? 'presenter',
      clean: options.clean ?? true
    }
  }

  const run = async () => generateSingleFileDeck(resolved)

  return {
    name: 'svx-slides:single-file-deck',
    enforce: 'pre',
    configResolved(config) {
      viteConfig = config
      setup()
    },
    async buildStart() {
      await run()
    },
    configureServer(server) {
      const sourcePath = resolve(resolved.root, resolved.source)
      server.watcher.add(sourcePath)
      server.watcher.on('add', async (changedPath) => {
        if (posixish(changedPath) !== posixish(sourcePath)) return
        const result = await run()
        reloadGeneratedDeck(server, result.outDir)
      })
      server.watcher.on('change', async (changedPath) => {
        if (posixish(changedPath) !== posixish(sourcePath)) return
        const result = await run()
        reloadGeneratedDeck(server, result.outDir)
      })
    }
  }
}
