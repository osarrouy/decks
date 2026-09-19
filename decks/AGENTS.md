# Working on deck sources

- These directories contain authored course material, assets and teaching components. Do not change their contents during architecture or styling work.
- Moving a deck directory does not authorize rewriting imports, metadata, notes, examples, formatting or media. The framework handles historical source conventions where necessary.
- Keep local components beside their deck. Deduplication requires authorization to edit teaching sources.
- Use [README.md](README.md) for authoring conventions when a content change is explicitly requested.

## Editorial purpose

The projected slides support the students' attention; the speaker notes support Olivier's live explanation. Treat these as two distinct reading situations. The notes must let the speaker recover the argument at a glance while speaking.

## Projected slides

- Keep projected content minimal by default. Use one short title only when it helps orient students; omit it when the main visual or component is self-explanatory. Avoid subtitles, captions, legends and step-by-step explanatory text unless they are necessary to understand what is shown.
- When a custom component carries the slide's main idea, let it use the full slide surface. Avoid decorative frames, panels and surrounding text that duplicate information already visible in the component.
- Put the explanation, supporting arguments, qualifications and teaching instructions in the speaker notes. Do not turn slides into paragraphs or summaries of everything the speaker will say.
- Preserve the teaching purpose of supplied quotations, examples and media. Minimal text is not a reason to remove authored material without authorization.
- Use the concise Markdown image syntax `![Alt text](path)` by default. Use raw HTML or a Svelte component only when an image needs behavior, layout or attributes that Markdown cannot express clearly.
- Style deck-specific teaching components with the existing `@dg/ui` tokens and visual language by default. Reuse its typography, spacing, colors, borders and interaction patterns instead of defining a separate theme for a deck.

## Speaker notes

- Write short, complete, grammatically well-formed sentences. Keep them clear, direct and quick to scan while speaking. Concision must come from removing repetition and unnecessary wording, not from omitting subjects, verbs or logical connections.
- Use compact prose as an oral memory aid. Do not write a continuous speech or a textbook passage to be read word for word. Sentence fragments are appropriate for labels and brief presentation cues, not as the default form of substantive explanations.
- Keep each block focused on one move in the explanation. Separate blocks with blank lines so the speaker can find their place quickly.
- Preserve the thesis, supporting arguments, definitions, concrete examples, logical transitions and necessary qualifications. Compression must not remove a premise or a step needed to understand the reasoning.
- Make the relationships explicit: cause, consequence, contrast, condition, objection or transition. In French notes, use natural connectors such as "Donc", "Mais", "Parce que" and "Cela signifie que". Use plain paragraphs without introductory arrows by default; chains of arrows must not replace the sentences that explain a mechanism.
- Explain why one step leads to the next. Name the actors, what each does and what changes as a result. When an institution or technical term becomes necessary to the explanation, explain its role before relying on it.
- Follow a concrete example through successive steps when this makes the mechanism clearer. Keep the actors and quantities consistent; show the relevant before-and-after change and what accounts for it. State simplifying assumptions when needed to prevent a false inference.
- The speaker must be able to reconstruct what to explain and how the elements connect without consulting the conversation that produced the notes. Prefer another short sentence or block over an unexplained causal jump; length should follow the difficulty of the passage.
- Match the vocabulary and assumed knowledge to the stated audience of each course. Define an unfamiliar term when it becomes useful, then connect it to a concrete example. Do not assume that every deck targets the same academic level.
- Simplify without changing the mechanism or overstating a claim. Retain conditions, meaningful uncertainty and distinctions that prevent a likely misunderstanding. Distinguish an author's position from an established fact.
- Use the note containers documented in [README.md](README.md) where they help the speaker scan the explanation: `:::example` for concrete examples or worked illustrations, `:::warning` for important qualifications and likely misunderstandings, and `:::comment` for presentation cues and instructions to the speaker.
- Open each container on its own line with three colons and its name, then close it with `:::` on its own line. Use `:::example`, not the two-colon leaf directive `::example`, for a block of notes. Containers may contain several short paragraphs; use them selectively and keep the main argument in ordinary paragraphs.

## Editorial requests

- A request for an opinion, review or proposed rewrite calls for an answer in the conversation. It does not authorize replacing the deck source.
- The writing rules above apply to new material and authorized revisions. Do not use them as a reason to restyle other decks or normalize existing content.
