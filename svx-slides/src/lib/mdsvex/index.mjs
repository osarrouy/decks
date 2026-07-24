import remarkDirective from 'remark-directive'

const directiveLayoutNames = new Set(['columns', 'two-columns', 'center', 'cover', 'stack', 'grid'])
const directiveColumnNames = new Set(['column', 'left', 'right'])

function visit(node, callback) {
  if (!node || typeof node !== 'object') return
  callback(node)
  if (Array.isArray(node.children)) {
    for (const child of node.children) visit(child, callback)
  }
}

function parseAttributeValue(value) {
  if (value === undefined || value === '') return true
  if (value === 'true') return true
  if (value === 'false') return false
  return value.replace(/^[\'\"“”‘’]|[\'\"“”‘’]$/g, '')
}

function parseAttributeBlock(raw) {
  const properties = {}
  const classes = []
  const source = raw.trim()
  const pattern = /(?:^|\s)(#[A-Za-z][\w-]*|\.[A-Za-z][\w-]*|[A-Za-z_:][\w:.-]*(?:=("[^"]*"|'[^']*'|[^\s]+))?)/g
  let match

  while ((match = pattern.exec(source))) {
    const token = match[1]
    if (!token) continue

    if (token.startsWith('#')) {
      properties.id = token.slice(1)
      continue
    }

    if (token.startsWith('.')) {
      classes.push(token.slice(1))
      continue
    }

    const [key, rawValue] = token.split(/=(.*)/s)
    properties[key] = parseAttributeValue(rawValue)
  }

  if (classes.length > 0) properties.className = classes
  return properties
}

function mergeProperties(node, properties) {
  node.data ||= {}
  node.data.hProperties ||= {}

  const current = node.data.hProperties
  const incomingClasses = properties.className
  delete properties.className

  Object.assign(current, properties)

  if (incomingClasses) {
    const previous = current.className
    const previousClasses = Array.isArray(previous) ? previous : previous ? String(previous).split(/\s+/) : []
    current.className = [...previousClasses, ...incomingClasses]
  }
}

function extractTrailingAttributes(text) {
  const match = text.match(/^(.*?)(?:\s*)\{([^{}]+)\}\s*$/s)
  if (!match) return undefined
  return {
    text: match[1],
    properties: parseAttributeBlock(match[2])
  }
}

function extractLeadingAttributes(text) {
  const match = text.match(/^\{([^{}]+)\}(.*)$/s)
  if (!match) return undefined
  return {
    text: match[2],
    properties: parseAttributeBlock(match[1])
  }
}

function remarkPandocAttributes() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'heading') {
        const last = node.children?.[node.children.length - 1]
        if (!last || last.type !== 'text') return

        const extracted = extractTrailingAttributes(last.value)
        if (!extracted) return

        last.value = extracted.text.replace(/\s+$/g, '')
        mergeProperties(node, extracted.properties)
        return
      }

      if (node.type !== 'paragraph' || !Array.isArray(node.children)) return

      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index]
        const next = node.children[index + 1]
        if (!child || child.type !== 'image' || !next || next.type !== 'text') continue

        const extracted = extractLeadingAttributes(next.value)
        if (!extracted) continue

        mergeProperties(child, extracted.properties)
        next.value = extracted.text
        if (!next.value) node.children.splice(index + 1, 1)
      }

      const last = node.children[node.children.length - 1]
      if (!last || last.type !== 'text') return

      const extracted = extractTrailingAttributes(last.value)
      if (!extracted) return

      last.value = extracted.text.replace(/\s+$/g, '')
      mergeProperties(node, extracted.properties)
      if (!last.value) node.children.pop()
    })
  }
}

function directiveClasses(name, attributes = {}) {
  const classes = []

  if (directiveLayoutNames.has(name)) {
    classes.push('layout', name)
  } else if (directiveColumnNames.has(name)) {
    classes.push('column', name)
  } else {
    classes.push(name)
  }

  if (attributes.class) classes.push(...String(attributes.class).split(/\s+/).filter(Boolean))
  if (attributes.className) classes.push(...String(attributes.className).split(/\s+/).filter(Boolean))

  return [...new Set(classes)]
}

function remarkLayoutDirectives() {
  return (tree) => {
    visit(tree, (node) => {
      if (!['containerDirective', 'leafDirective', 'textDirective'].includes(node.type)) return

      const attributes = { ...(node.attributes || {}) }
      const classes = directiveClasses(node.name, attributes)
      delete attributes.class
      delete attributes.className

      node.data ||= {}
      node.data.hName = node.type === 'textDirective' ? 'span' : 'div'
      node.data.hProperties = {
        ...attributes,
        className: classes
      }
    })
  }
}

function classListForDirectiveName(name, rawClass = '') {
  const classes = directiveClasses(name, { class: rawClass })
  return classes.join(' ')
}

function htmlAttributesForProperties(properties) {
  const copy = { ...properties }
  const className = Array.isArray(copy.className) ? copy.className.join(' ') : ''
  delete copy.className

  const attributes = Object.entries(copy)
    .map(([key, value]) => (value === true ? key : `${key}=${JSON.stringify(String(value))}`))
    .join(' ')

  return { className, attributes }
}

function htmlAttributesForDirective(raw) {
  const attrBlock = raw.match(/\{([^{}]+)\}/)?.[1]
  if (!attrBlock) return { className: '', attributes: '' }

  return htmlAttributesForProperties(parseAttributeBlock(attrBlock))
}

function renderDirectiveOpen(name, raw = '') {
  const { className: rawClass, attributes } = htmlAttributesForDirective(raw)
  const className = classListForDirectiveName(name, rawClass)
  return `<div class=${JSON.stringify(className)}${attributes ? ` ${attributes}` : ''}>`
}

function transformFriendlyDirectives(content) {
  const lines = content.split('\n')
  let transformed = false
  let depth = 0

  const next = lines.map((line) => {
    const open = line.match(/^\s*:{3,}\s*([A-Za-z][\w-]*)(.*)$/)
    if (open) {
      transformed = true
      depth += 1
      return renderDirectiveOpen(open[1], open[2] ?? '')
    }

    if (depth > 0 && /^\s*:{3,}\s*$/.test(line)) {
      transformed = true
      depth -= 1
      return '</div>'
    }

    return line
  })

  return transformed ? next.join('\n') : content
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderAttributes(properties) {
  const { className, attributes } = htmlAttributesForProperties(properties)
  const classAttribute = className ? ` class=${JSON.stringify(className)}` : ''
  return `${classAttribute}${attributes ? ` ${attributes}` : ''}`
}

function transformPandocAttributeLines(content) {
  const lines = content.split('\n')
  let transformed = false
  let inFence = false

  const next = lines.map((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return line
    }

    if (inFence) return line

    const heading = line.match(/^(#{1,6})\s+(.+?)\s+\{([^{}]+)\}\s*$/)
    if (heading) {
      transformed = true
      const level = heading[1].length
      return `<h${level}${renderAttributes(parseAttributeBlock(heading[3]))}>${escapeHtml(heading[2])}</h${level}>`
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*\{([^{}]+)\}\s*$/)
    if (image) {
      transformed = true
      return `<img src=${JSON.stringify(image[2])} alt=${JSON.stringify(image[1])}${renderAttributes(
        parseAttributeBlock(image[3])
      )} />`
    }

    const paragraph = line.match(/^([^\s<#!*+\-[{][^{}]*?)\s+\{([^{}]+)\}\s*$/)
    if (paragraph) {
      transformed = true
      return `<p${renderAttributes(parseAttributeBlock(paragraph[2]))}>${escapeHtml(paragraph[1])}</p>`
    }

    return line
  })

  return transformed ? next.join('\n') : content
}

export function svxSlidesMarkdownPreprocess() {
  return {
    name: 'svx-slides-markdown-preprocess',
    markup({ content, filename }) {
      if (filename && !/\.(svx|md)$/.test(filename)) return undefined
      const withDirectives = transformFriendlyDirectives(content)
      const code = transformPandocAttributeLines(withDirectives)
      return code === content ? undefined : { code }
    }
  }
}

export function svxSlidesMdsvexOptions(options = {}) {
  return {
    ...options,
    remarkPlugins: [
      ...(options.remarkPlugins || []),
      remarkDirective,
      remarkLayoutDirectives,
      remarkPandocAttributes
    ]
  }
}

export { remarkLayoutDirectives, remarkPandocAttributes }
