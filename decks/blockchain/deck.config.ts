import type { DeckConfig } from "@svx-deck/core/deck/types";

const config = {
  title: "Blockchain 101",
  theme: "gallery",
  template: {
    source: "deck.svx",
    slideSeparator: "---",
    notesSeparator: "--- notes",
  },
} satisfies DeckConfig;

export default config;
