import type { DeckConfig, SlideMetadata } from "./types";

export type DeckTemplateConfig = {
  /** Source file, relative to the slide project root. */
  source?: string;
  /** Directory for generated `.svx` and `.notes.md` files, relative to the project root. */
  outDir?: string;
  /** Line that starts a new slide. */
  slideSeparator?: string;
  /** Line that starts speaker notes for the current slide. */
  notesSeparator?: string;
};

export type ParsedSingleFileSlide = {
  id: string;
  order: number;
  title: string;
  metadata: SlideMetadata & { id?: string };
  content: string;
  notes?: string;
};

export type ParsedSingleFileDeck = {
  config: Partial<DeckConfig>;
  slides: ParsedSingleFileSlide[];
};

export const defaultDeckTemplateConfig: Required<DeckTemplateConfig>;
export function resolveDeckTemplateConfig(
  config?: DeckTemplateConfig,
): Required<DeckTemplateConfig>;
export function parseSingleFileDeck(
  source: string,
  config?: DeckTemplateConfig,
): ParsedSingleFileDeck;
export function renderGeneratedSlide(
  slide: ParsedSingleFileSlide,
  deckRoot?: string,
): string;
