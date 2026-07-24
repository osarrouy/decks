import type { DeckConfig, SlideMetadata } from './types'

export type DeckTemplateConfig = {
  /** Source file, relative to the slide project root. */
  source?: string
  /** Directory for generated `.svx` and `.notes.md` files, relative to the project root. */
  outDir?: string
  /** Line that starts a new slide. */
  slideSeparator?: string
  /** Line that starts speaker notes for the current slide. */
  notesSeparator?: string
}

export type ParsedSingleFileSlide = {
  id: string
  order: number
  title: string
  metadata: SlideMetadata & { id?: string }
  content: string
  notes?: string
}

export type ParsedSingleFileDeck = {
  config: Partial<DeckConfig>
  slides: ParsedSingleFileSlide[]
}

export const defaultDeckTemplateConfig = {
  source: 'deck.svx',
  outDir: 'src/generated/deck',
  slideSeparator: '---',
  notesSeparator: '--- notes'
} satisfies Required<DeckTemplateConfig>

export function resolveDeckTemplateConfig(config: DeckTemplateConfig = {}) {
  return {
    ...defaultDeckTemplateConfig,
    ...config
  }
}

function normalizeNewlines(source: string) {
  return source.replace(/\r\n?/g, '\n')
}

function markerMatches(line: string, marker: string) {
  return line.trim() === marker
}

function parseScalar(value: string) {
  const trimmed = value.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
  return trimmed.replace(/^['"]|['"]$/g, '')
}

function parseSimpleYaml(source: string) {
  const data: Record<string, string | number | boolean> = {}

  for (const line of source.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const match = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!match) continue

    data[match[1]] = parseScalar(match[2])
  }

  return data
}

function looksLikeFrontmatter(source: string) {
  return source
    .split('\n')
    .every((line) => !line.trim() || line.trim().startsWith('#') || /^[A-Za-z0-9_-]+:\s*/.test(line.trim()))
}

function extractFrontmatter(source: string, slideSeparator: string) {
  const lines = source.split('\n')
  if (!markerMatches(lines[0] ?? '', slideSeparator)) return { data: {}, body: source }

  const closingIndex = lines.findIndex((line, index) => index > 0 && markerMatches(line, slideSeparator))
  if (closingIndex === -1) return { data: {}, body: source }

  const frontmatter = lines.slice(1, closingIndex).join('\n')
  if (!looksLikeFrontmatter(frontmatter)) return { data: {}, body: source }

  return {
    data: parseSimpleYaml(frontmatter),
    body: lines.slice(closingIndex + 1).join('\n')
  }
}

function parseSlideDirective(content: string) {
  const match = content.match(/^\s*<!--\s*slide(?::\s*([^]*?))?\s*-->\s*/)
  if (!match) return { metadata: {}, content }

  const rawAttributes = match[1] ?? ''
  const metadata: Record<string, string | number | boolean> = {}
  const attributePattern = /([A-Za-z0-9_-]+)(?:=("[^"]*"|'[^']*'|[^\s]+))?/g
  let attribute: RegExpExecArray | null

  while ((attribute = attributePattern.exec(rawAttributes))) {
    metadata[attribute[1]] = attribute[2] === undefined ? true : parseScalar(attribute[2])
  }

  return {
    metadata,
    content: content.slice(match[0].length)
  }
}

function inferTitle(content: string, fallback: string) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]
  if (!heading) return fallback

  return heading
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`~]/g, '')
    .trim()
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function compactBlock(lines: string[]) {
  return lines.join('\n').trim()
}

function buildSlide(contentLines: string[], notesLines: string[], index: number): ParsedSingleFileSlide | undefined {
  const rawContent = compactBlock(contentLines)
  const rawNotes = compactBlock(notesLines)

  if (!rawContent && !rawNotes) return undefined

  const { metadata, content } = parseSlideDirective(rawContent)
  const order = index + 1
  const fallbackTitle = `Slide ${order}`
  const title = String(metadata.title ?? inferTitle(content, fallbackTitle))
  const id = String(metadata.id ?? (slugify(title) || `slide-${order}`))
  const steps = typeof metadata.steps === 'number' ? metadata.steps : 0

  return {
    id,
    order,
    title,
    metadata: {
      ...metadata,
      title,
      steps,
      order
    },
    content: content.trim(),
    notes: rawNotes || undefined
  }
}

export function parseSingleFileDeck(source: string, config: DeckTemplateConfig = {}): ParsedSingleFileDeck {
  const template = resolveDeckTemplateConfig(config)
  const normalized = normalizeNewlines(source)
  const { data, body } = extractFrontmatter(normalized, template.slideSeparator)
  const slides: ParsedSingleFileSlide[] = []
  const contentLines: string[] = []
  const notesLines: string[] = []
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
      continue
    }

    if (markerMatches(line, template.notesSeparator)) {
      inNotes = true
      continue
    }

    if (inNotes) {
      notesLines.push(line)
    } else {
      contentLines.push(line)
    }
  }

  flush()

  return {
    config: data as Partial<DeckConfig>,
    slides
  }
}

function serializeFrontmatter(metadata: SlideMetadata & { id?: string }) {
  const entries = Object.entries(metadata as Record<string, unknown>).filter(
    ([, value]) => value !== undefined && value !== false
  )
  if (entries.length === 0) return ''

  const lines = entries.map(([key, value]) => `${key}: ${typeof value === 'string' ? JSON.stringify(value) : value}`)
  return `---\n${lines.join('\n')}\n---\n\n`
}

export function renderGeneratedSlide(slide: ParsedSingleFileSlide) {
  return `${serializeFrontmatter(slide.metadata)}${slide.content.trim()}\n`
}
