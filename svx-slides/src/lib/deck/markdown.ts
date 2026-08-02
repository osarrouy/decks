import { micromark } from 'micromark'

function normalizeNotesMarkdown(markdown: string) {
  return markdown
    .replace(/^\[Sources\]\s*$/gim, '### Sources')
    .replace(/^\[\/Sources\]\s*$/gim, '')
}

function decorateNoteCallout(html: string, tag: string, className: string) {
  return html
    .replace(
      new RegExp(`<blockquote>\n<p>\\[!${tag}\\]<\/p>`, 'g'),
      `<blockquote class="${className}">`
    )
    .replace(
      new RegExp(`<blockquote>\n<p>\\[!${tag}\\]\n`, 'g'),
      `<blockquote class="${className}">\n<p>`
    )
}

function decorateNoteCallouts(html: string) {
  return decorateNoteCallout(
    decorateNoteCallout(html, 'COMMENT', 'presenter-note-comment'),
    'EXEMPLE',
    'presenter-note-example'
  )
}

export function notesToHtml(markdown = '') {
  const html = micromark(normalizeNotesMarkdown(markdown.trim()), {
    allowDangerousHtml: false
  })

  return decorateNoteCallouts(html)
}
