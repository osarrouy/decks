function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function notesToHtml(markdown = '') {
  const lines = markdown.trim().split(/\r?\n/)
  let html = ''
  let inList = false

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      if (inList) {
        html += '</ul>'
        inList = false
      }
      continue
    }

    const bullet = line.match(/^[-*]\s+(.*)$/)
    if (bullet) {
      if (!inList) {
        html += '<ul>'
        inList = true
      }
      html += `<li>${escapeHtml(bullet[1])}</li>`
      continue
    }

    if (inList) {
      html += '</ul>'
      inList = false
    }

    html += `<p>${escapeHtml(line)}</p>`
  }

  if (inList) html += '</ul>'
  return html
}
