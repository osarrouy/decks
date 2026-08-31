import type { DeckTemplateConfig } from '../deck/singleFile'

export type NotesAudience = 'presenter' | 'student'

export type SingleFileDeckPluginOptions = DeckTemplateConfig & {
  root?: string
  clean?: boolean
  notesAudience?: NotesAudience
}

export function svxSlidesSingleFileDeck(options?: SingleFileDeckPluginOptions): any
