import { micromark } from 'micromark'

function normalizeNotesMarkdown(markdown: string) {
  return markdown
    .replace(/^\[Sources\]\s*$/gim, '### Sources')
    .replace(/^\[\/Sources\]\s*$/gim, '')
}

function decorateCommentCallouts(html: string) {
  return html
    .replace(
      /<blockquote>\n<p>\[!COMMENT\]<\/p>/g,
      '<blockquote class="presenter-note-comment">'
    )
    .replace(
      /<blockquote>\n<p>\[!COMMENT\]\n/g,
      '<blockquote class="presenter-note-comment">\n<p>'
    )
}

export function notesToHtml(markdown = '') {
  const html = micromark(normalizeNotesMarkdown(markdown.trim()), {
    allowDangerousHtml: false
  })

  return decorateCommentCallouts(html)
}
