---
description: Rewrite a passage of speaker notes according to the deck writing guidelines
argument-hint: <location> [instructions]
---

Rewrite the speaker notes passage designated by this location, then save it in place:

$ARGUMENTS

Invoking this command authorizes the rewrite of that passage only.

## 1. Locate the passage

The location usually comes from Zed. Accept any of these forms, with an absolute or repository-relative path:

- `path:120` or `path:120:5` (line, optional column);
- `path:120-135`, `path#L120-L135` or `path#L120:135` (line range);
- a Zed mention or `file://` link such as `@deck.svx (120:135)`;
- a slide identifier from `<!-- slide: id="…" -->`, searched in `decks/*/deck.svx`.

Any text after the location gives extra instructions for this rewrite.

Read the file before deciding on the scope:

- A range covers those lines. Extend it to whole paragraphs and whole containers if it cuts through one.
- A single line covers the paragraph or container that holds it. If the line is a slide comment, slide markup or the `--- notes` separator, cover the entire notes section of that slide.
- If the location matches no notes passage, or matches several, stop and ask.

## 2. Load the guidelines

Read these files before writing; they are the only source of the rules:

- `decks/AGENTS.md`, especially *Editorial purpose* and *Speaker notes*;
- `decks/README.md` for the note containers;
- the deck's own `AGENTS.md` if it exists, for its audience, level and specific safeguards.

Read the whole slide and its neighbours too, so the passage keeps its transitions and does not repeat what comes just before or after.

## 3. Rewrite

- Apply the *Speaker notes* rules in full: layout, sentences, logic, emphasis and containers.
- Rewrite the sentences, not just the paragraph breaks. Splitting a long paragraph while keeping its long sentences does not meet the guidelines.
- Keep every claim, example, figure, date, name, quotation, qualification and reference. Do not add facts, sources or examples absent from the passage. Restructuring is allowed: splitting, reordering, moving a formula or definition into `:::important`, turning an example into `:::example`.
- Keep the meaning of the existing containers. Do not turn a `:::warning` into ordinary text, or a `:::comment` cue into content.
- Keep `[Sources]` blocks, slide markup, components, frontmatter and everything outside the scope byte for byte.
- Edit only the lines in scope. The working tree may hold other uncommitted changes to the same file.

## 4. Check the draft

Before saving, reread the draft sentence by sentence, containers included:

- Can the sentence be read aloud in one breath? If not, split it.
- Does each comma remain because grammar requires it, or because the alternative would be convoluted? Otherwise replace it with a full stop, a semicolon or a colon, or rephrase.
- Do incidental precisions use em dashes only when they carry emphasis, and become separate sentences otherwise?
- Is the wording direct, without announcement formulas or stacked auxiliaries?
- Is the link to the previous sentence or paragraph explicit wherever the reasoning turns?
- Does each paragraph hold one idea, in four short sentences at most? Conversely, merge consecutive paragraphs that develop the same idea.
- Do "nous" and "vous" follow the voice rule?

Then compare the draft with the original: every claim, example and qualification must still be there.

## 5. Report

Answer in French and keep it short:

- the line range rewritten;
- the main changes (paragraphs split or merged, `:::important` blocks created, connectors made explicit);
- any doubt left for Olivier: a claim that looks inaccurate, a missing logical step, or an ambiguity you could not resolve without inventing content. Mention these in the reply, never in the notes.
