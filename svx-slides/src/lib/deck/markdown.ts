import { micromark } from 'micromark'
import { directive, directiveHtml } from 'micromark-extension-directive'
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

const noteDirectiveHtml = directiveHtml({
  '*'(directive) {
    if (directive.type !== 'containerDirective') return false
    this.raw(directive.content || '')
  },
  comment(directive) {
    this.raw(`<blockquote class="presenter-note-comment">${directive.content || ''}</blockquote>`)
  },
  example(directive) {
    this.raw(`<blockquote class="presenter-note-example">${directive.content || ''}</blockquote>`)
  }
})

function decorateNoteCallouts(html: string) {
  return decorateNoteCallout(
    decorateNoteCallout(html, 'COMMENT', 'presenter-note-comment'),
    'EXEMPLE',
    'presenter-note-example'
  )
}

export function notesToHtml(markdown = '') {
  const html = micromark(normalizeNotesMarkdown(markdown.trim()), {
    allowDangerousHtml: false,
    extensions: [directive()],
    htmlExtensions: [noteDirectiveHtml]
  })

  return decorateNoteCallouts(html)
}
