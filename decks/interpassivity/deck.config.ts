import type { DeckConfig } from "@svx-deck/core/deck/types";

const config = {
  title: "L'interpassivité des foules",
  description: "Interpassivité, réseaux sociaux et subjectivation.",
  theme: "gallery",
  template: {
    source: "deck.svx",
    slideSeparator: "---",
    notesSeparator: "--- notes",
  },
} satisfies DeckConfig;

export default config;
