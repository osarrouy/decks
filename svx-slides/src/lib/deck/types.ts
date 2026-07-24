export type SlideMetadata = {
  title?: string
  steps?: number
  /** Position in the source deck. Generated automatically. */
  order?: number
  layout?: string
  align?: string
  tone?: string
  [key: string]: string | number | boolean | undefined
}

export type Slide = {
  id: string
  order: number
  title: string
  component: any
  metadata: SlideMetadata
  notes?: string
}

export type DeckConfig = {
  id?: string
  title: string
  description?: string
  theme?: string
  template?: {
    source?: string
    outDir?: string
    slideSeparator?: string
    notesSeparator?: string
  }
}

export type Deck = DeckConfig & {
  id: string
  slides: Slide[]
}

export type PresentationState = {
  slide: number
  step: number
}
