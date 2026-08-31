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
  },
  warning(directive) {
    this.raw(`<blockquote class="presenter-note-warning">${directive.content || ''}</blockquote>`)
  }
})

function decorateNoteCallouts(html: string) {
  return decorateNoteCallout(
    decorateNoteCallout(
      decorateNoteCallout(html, 'COMMENT', 'presenter-note-comment'),
      'EXEMPLE',
      'presenter-note-example'
    ),
    'WARNING',
    'presenter-note-warning'
  )
}
function hidePresenterNotes(html: string) {
  return html.replace(/<blockquote class="presenter-note-comment">[\s\S]*?<\/blockquote>/g, '')
}

export type NotesAudience = 'presenter' | 'student'

export function notesToHtml(
  markdown = '',
  options: { audience?: NotesAudience } = {}
) {
  const html = micromark(normalizeNotesMarkdown(markdown.trim()), {
    allowDangerousHtml: false,
    extensions: [directive()],
    htmlExtensions: [noteDirectiveHtml]
  })

  const decorated = decorateNoteCallouts(html)
  return options.audience === 'student' ? hidePresenterNotes(decorated) : decorated
}
