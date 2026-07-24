export { default as DeckView } from './lib/components/DeckView.svelte'
export { default as Fragment } from './lib/components/Fragment.svelte'
export { default as PresenterView } from './lib/components/PresenterView.svelte'
export { default as SlideSurface } from './lib/components/SlideSurface.svelte'
export { default as TwoColumns } from './lib/components/TwoColumns.svelte'

export { createDeckController } from './lib/deck/controller'
export { enhanceImageGlow } from './lib/deck/imageGlow'
export { notesToHtml } from './lib/deck/markdown'
export {
  defaultDeckTemplateConfig,
  parseSingleFileDeck,
  renderGeneratedSlide,
  resolveDeckTemplateConfig
} from './lib/deck/singleFile'
export type { DeckTemplateConfig, ParsedSingleFileDeck, ParsedSingleFileSlide } from './lib/deck/singleFile'
export { getStepContext, setStepContext } from './lib/deck/stepContext'
export type { Deck, DeckConfig, PresentationState, Slide, SlideMetadata } from './lib/deck/types'
