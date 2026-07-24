import type { MdsvexOptions } from 'mdsvex'

export function svxSlidesMarkdownPreprocess(): {
  name: string
  markup(input: { content: string; filename?: string }): { code: string } | undefined
}

export function svxSlidesMdsvexOptions(options?: MdsvexOptions): MdsvexOptions
export function remarkLayoutDirectives(): unknown
export function remarkPandocAttributes(): unknown
