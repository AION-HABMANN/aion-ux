# Habmann style standard (from 2026-11-02)

Habmann's review (e-mail, revision due **5 November 2026**) asked for two design changes: use the **official Habmann master template**, and show the **correct Habmann logo** instead of AION branding. The logo needs to appear on the title slide only. Content stays as it is. This is the standard for every Habmann deliverable from now on.

## Rules

1. **Slides are built on `../Template Blockstart V1 10_2025.pptx`** (Habmann master), never on a blank python-pptx deck. `_build/pptlib.py` opens it, removes the sample slides and uses its layouts: `Abschnitts-Überschrift` (title slide, carries the Habmann logo), `Leer` (section dividers, chevron artwork), `Title and Footer` (all content slides, small chevron mark top right).
2. **Logo:** the full Habmann logo only on the title slide (the template layout supplies it); content slides carry only the template's small chevron. Word documents show the logo once, on the cover (`docx/_tools/habmann-logo.png`, taken from the template).
3. **No AION branding** anywhere: slides, footers, Word cover, footers, document properties. The course is called "UX Developer". Footer text: `UX Developer · Day N · <deck or document>`.
4. **Font:** Gill Sans MT (the template's font) for slides and Word documents.
5. **Palette:** navy `1A3381` (titles, table heads, dark panels), green `51AE2F` (fills with bold white text), dark green `3A7F1F` (small green text on white), periwinkle `5F6FB5` (second accent), tints `ECEEF7` / `E5F2DF`. No other accent colours.
6. **Titles** are bold navy capitals in the template's title placeholder (one or two lines, 15 to 24 pt); the content area starts under the template's rule (`DY = 0.45` in `pptlib.py` shifts all content up).
7. Content, wording, figures, sources and the AI notice are unchanged by a restyle. Pictures keep their AI label and source line.

## Rebuild

```
python _build/build_decks.py          # 32 decks
python ../docx/_tools/build_all.py    # Materi, Task, Trainer
python _build/make_casestudy.py
python _build/collect.py
```

## Open

- Habmann offered to send the official master template; this folder uses `Template Blockstart V1 10_2025.pptx`. If their file differs, swap it in `aion-ux/` (same name) and rebuild; check the layout indexes at the top of `pptlib.py` (`LAYOUT_TITLE`, `LAYOUT_SECTION`, `LAYOUT_CONTENT`).
- Gill Sans MT is a Windows/Office font; on a machine without it PowerPoint substitutes another face.
