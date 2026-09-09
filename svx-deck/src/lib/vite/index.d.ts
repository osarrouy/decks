import type { DeckTemplateConfig } from "../deck/singleFile.mjs";

export type NotesAudience = "presenter" | "student";

export type SingleFileDeckPluginOptions = DeckTemplateConfig & {
  root?: string;
  clean?: boolean;
  notesAudience?: NotesAudience;
};

export function svxDeckSingleFileDeck(
  options?: SingleFileDeckPluginOptions,
): any;
