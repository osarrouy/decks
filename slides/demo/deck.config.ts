import type { DeckConfig } from '@svx-slides/core/deck/types'

const config = {
  title: 'Introduction aux Cultures Numériques',
  // description: 'Une présentation de démonstration pour tester le runtime maison.',
  theme: 'gallery',
  template: {
    source: 'deck.svx',
    slideSeparator: '---',
    notesSeparator: '--- notes'
  }
} satisfies DeckConfig

export default config
