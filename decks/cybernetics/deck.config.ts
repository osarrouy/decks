import type { DeckConfig } from '@svx-slides/core/deck/types'

const config = {
  title: 'Histoire du numérique · 2/3 — Cybernetics',
  description: 'Rétroaction, information, systèmes et premiers neurones artificiels.',
  theme: 'gallery',
  template: {
    source: 'deck.svx',
    slideSeparator: '---',
    notesSeparator: '--- notes'
  }
} satisfies DeckConfig

export default config
