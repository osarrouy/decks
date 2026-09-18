import type { DeckConfig } from '@svx-slides/core/deck/types'

const config = {
  title: 'Histoire du numérique · 3/3 — Internet et l’ordinateur personnel',
  description: 'Des réseaux à commutation de paquets au Web et à la micro-informatique.',
  theme: 'gallery',
  template: {
    source: 'deck.svx',
    slideSeparator: '---',
    notesSeparator: '--- notes'
  }
} satisfies DeckConfig

export default config
