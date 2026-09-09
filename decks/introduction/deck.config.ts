import type { DeckConfig } from '@svx-slides/core/deck/types'

const config = {
  title: 'Introduction',
  theme: 'gallery',
  template: {
    source: 'deck.svx',
    slideSeparator: '---',
    notesSeparator: '--- notes'
  }
} satisfies DeckConfig

export default config
