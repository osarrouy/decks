import { micromark } from 'micromark'

function normalizeNotesMarkdown(markdown: string) {
  return markdown
    .replace(/^\[Sources\]\s*$/gim, '### Sources')
    .replace(/^\[\/Sources\]\s*$/gim, '')
}

export function notesToHtml(markdown = '') {
  return micromark(normalizeNotesMarkdown(markdown.trim()), {
    allowDangerousHtml: false
  })
}
