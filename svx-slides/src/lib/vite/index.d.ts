import type { DeckTemplateConfig } from '../deck/singleFile'

export type SingleFileDeckPluginOptions = DeckTemplateConfig & {
  root?: string
  clean?: boolean
}

export function svxSlidesSingleFileDeck(options?: SingleFileDeckPluginOptions): any
