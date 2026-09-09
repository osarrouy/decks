import type { DeckConfig } from '@svx-slides/core/deck/types'

const config = {
  title: 'Économie des données — de l’attention à l’IA',
  theme: 'gallery',
  template: {
    source: 'deck.svx',
    slideSeparator: '---',
    notesSeparator: '--- notes'
  }
} satisfies DeckConfig

export default config
