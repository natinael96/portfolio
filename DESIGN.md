---
name: natinael96.tech
description: A working record kept in the open — the résumé as release notes, on ruled paper.
colors:
  instrument-green: "#1f6f4a"
  instrument-green-tint: "#e3efe7"
  tracing-paper: "#fdfcfa"
  card-white: "#ffffff"
  graphite: "#22201c"
  graphite-soft: "#4a463f"
  pencil: "#6f685d"
  rule-hairline: "#e5e0d7"
  rule-strong: "#c9c2b5"
  tag-added: "#1f6f4a"
  tag-added-bg: "#e3efe7"
  tag-changed: "#3b5680"
  tag-changed-bg: "#e6ecf4"
  tag-fixed: "#8a5227"
  tag-fixed-bg: "#f5ebe2"
  tag-learned: "#5f4677"
  tag-learned-bg: "#efe9f2"
typography:
  display:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 5.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "clamp(1.375rem, 3.4vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, Noto Serif Ethiopic, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, Noto Serif Ethiopic, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  none: "0"
  control: "3px"
spacing:
  hair: "0.125rem"
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  base: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  xxl: "3rem"
  section: "4.5rem"
components:
  button-primary:
    backgroundColor: "{colors.instrument-green}"
    textColor: "{colors.tracing-paper}"
    rounded: "{rounded.control}"
    padding: "0.5rem 0.75rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "#1b5f40"
    textColor: "{colors.tracing-paper}"
  link-chip:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.graphite-soft}"
    rounded: "{rounded.control}"
    padding: "0.25rem 0.5rem"
  panel:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.graphite-soft}"
    rounded: "{rounded.none}"
    padding: "{spacing.base}"
  tag-added:
    backgroundColor: "{colors.tag-added-bg}"
    textColor: "{colors.tag-added}"
    rounded: "{rounded.control}"
    padding: "0.18rem 0"
    width: "4.75rem"
  status-live:
    backgroundColor: "{colors.instrument-green-tint}"
    textColor: "{colors.instrument-green}"
    rounded: "{rounded.control}"
    padding: "0.15rem 0.5rem"
---

# Design System: natinael96.tech

## Overview

**Creative North Star: "The Engineering Logbook"**

A logbook is written while the work is happening, by someone who expects to be
held to it. It is ruled, dated, and numbered. Nothing in it is staged for a
reader, which is exactly why a reader trusts it. This system takes that
posture: the page is a record, not a pitch, and it assumes the visitor is
capable of reading one.

Everything follows from that. Structure comes from ruled lines rather than
boxes, because a ledger is ruled. Keys, versions, dates and counts are set in
monospace because they are data being logged, not decoration borrowed to look
technical. Colour is rationed to state — what is available, what is current,
what is live — since a log that highlights everything has recorded nothing. The
one place the system spends ornament is the change tags, which borrow the
green/blue/amber/purple vocabulary every developer already reads fluently from
release notes.

The design is deliberately unfashionable. It rejects the current portfolio
house style outright: no rounded status pills, no chip rows, no pulsing dots,
no coloured bar down the side of a card, no highlighter behind a word. Those
were all present at some point and all removed on sight. What is left has to
earn attention with substance, which suits a page whose job is to survive
scrutiny rather than to catch an eye.

**Key Characteristics:**

- Ruled, not boxed — hairlines separate, containers don't enclose
- Zero shadows, zero radius on panels; 3px only on small controls
- Monospace for data, sans for prose, Ethiopic first-class in both
- One accent, spent only on state
- Two themes measured independently, never inverted from each other

## Colors

Warm neutral paper under a single deep green, with a four-hue badge vocabulary
that exists only inside change tags.

### Primary

- **Instrument Green** (`#1f6f4a` light / `#7fc9a3` dark): the only accent in
  the system. It appears on availability, the live status of a project, primary
  call-to-action buttons, links inside prose, and the caret. Roughly 4–6
  occurrences per screen is the working ceiling.
- **Instrument Green Tint** (`#e3efe7` light / `#1c2b23` dark): the ground
  behind a state badge. Never a section background.

### Neutral

- **Tracing Paper** (`#fdfcfa` light / `#191a18` dark): the page ground. Warm
  rather than white — a drafting stock, not a screen.
- **Card White** (`#ffffff` light / `#1f211e` dark): panels and chips, one step
  off the ground. This tonal step is the *only* depth cue in the system.
- **Graphite** (`#22201c` light / `#e9e7e1` dark): headings, version numbers,
  pulled statistics.
- **Graphite Soft** (`#4a463f` light / `#b6b2a9` dark): body prose and change
  lines. The most-read colour on the page.
- **Pencil** (`#6f685d` light / `#8f8b83` dark): metadata — dates, periods,
  captions, rail labels, counts.
- **Rule Hairline** (`#e5e0d7` light / `#30322d` dark) and **Rule Strong**
  (`#c9c2b5` light / `#474a43` dark): the entire structural vocabulary.

### Tertiary — change tags only

Four badge hues carrying the changelog idiom, scoped exclusively to `.cl-tag`
and never used elsewhere: **Added** (`#1f6f4a`), **Changed** (`#3b5680`),
**Fixed** (`#8a5227`), **Learned** (`#5f4677`), each on its own tint.

### Named Rules

**The State-Only Rule.** Instrument Green marks state and nothing else:
available, current, live. It is never general emphasis, never a decorative
heading colour, never used to make something merely important look important.
When a thing needs weight, use weight.

**The Two-Ground Rule.** A colour is verified against the surface it actually
lands on, not against the page. An accent validated on the ground says nothing
about the same accent on a 12% tint of itself — that exact mistake produced
seven AA failures in the Stack badges. Measure both themes separately; never
derive one by inverting the other.

**The Borrowed-Vocabulary Rule.** The four tag hues are not this system's
palette. They are quoted from release notes because developers already read
them fluently. They stay inside change tags; promoting one to a section colour
breaks the quotation.

## Typography

**Display Font:** Geist Mono (with `ui-monospace`, `monospace`)
**Body Font:** Geist (with `Noto Serif Ethiopic`, `system-ui`, `sans-serif`)
**Ethiopic:** Noto Serif Ethiopic, resolved through the body stack

**Character:** A logbook hand and a reading hand. Monospace carries everything
that is *logged* — the name, version numbers, dates, keys, counts, labels — and
the sans carries everything that is *read*. The split is semantic, not
decorative: if a value could go in a table, it is monospace.

Ethiopic sits inside the body stack rather than in a separate rule, so ስንቅ and
ባሕረ ሓሳብ resolve to the loaded Ethiopic face anywhere they appear instead of
falling to whatever the OS has.

### Hierarchy

Seven steps, and nothing may sit between them: **12 · 14 · 16 · 19 · 22 · 28 · 44**.

- **Display** (Geist Mono 600, `clamp(1.75rem, 5.5vw, 2.75rem)`, 1.05, -0.035em):
  the name. Once per page.
- **Headline** (Geist Mono 600, `clamp(1.375rem, 3.4vw, 1.75rem)`, -0.035em):
  version numbers — the entry points of the log.
- **Title** (Geist 600, 19px, 1.35, -0.015em): entry titles, section headings.
- **Body** (Geist 400, 16px, 1.6): change lines and summaries, held to a 66ch
  measure. 16px is a floor, not a preference.
- **Label** (Geist Mono 500, 12px, 0.16em, uppercase): metadata keys, tags,
  rail headings.

### Named Rules

**The Sixteen-Pixel Floor.** Body text is never below 16px. A dense role may
use 14px for genuinely secondary metadata; nothing that is read in sentences
goes under 16.

**The Monospace-Is-Data Rule.** Monospace marks information that is logged,
measured or versioned. It is never applied to prose to make the page look
technical — that is costume, and this page has enough real data not to need it.

**The Dark-Compensation Rule.** Light text on dark ground reads tighter and
thinner than the same pair inverted. Reading text on dark gains leading (1.6 →
1.7) and a touch of tracking (0.006em). Never ship dark as a pure inversion.

## Layout

A single reading column against a sticky rail. Content is capped at 62rem with
a fluid gutter (`clamp(1.25rem, 4vw, 2.5rem)`); the rail appears at ≥900px as a
7.5rem column and is hidden below that, where the jump nav in the header takes
over its job.

Spacing is a 4px base — **4 · 8 · 12 · 16 · 24 · 32 · 48 · 72** — with one
documented half-step at 2px for optical badge padding. No value outside the
scale. Grouping follows the logbook: entries sit tight internally and separate
generously, with a hairline at every boundary.

Grids collapse rather than scroll. The Stack goes 3 → 2 → 1 column, change
lines drop their tag column below 480px and stack the tag above its text, and
the metadata block collapses its key column below 560px. Verified to 320px and
to 200% text zoom with no horizontal overflow.

## Elevation & Depth

**There are no shadows in this system.** None. The last one — on the
back-to-top button — was removed because it declared elevation twice alongside
a border.

Depth is carried by exactly two devices: a 1px hairline, and a single tonal
step from ground (`Tracing Paper`) to surface (`Card White`). That is the whole
vocabulary. A floating control is defined by its border, not by a shadow under
it.

### Named Rules

**The Flat Rule.** No `box-shadow` anywhere, in any state, including hover and
focus. If an element needs to separate from what is behind it, give it a rule
or a surface step.

**The One-Declaration Rule.** An element declares elevation once. A 1px border
under a soft shadow is the ghost card; pick the border.

## Shapes

Radius is near-absent and semantic. **Panels, cards and entries have no radius
at all** — they are ruled regions, not containers. Radius appears only on small
controls at 3px (chips, badges, buttons, the theme toggle) and on the one true
pill, the circular back-to-top button.

Borders do the structural work: hairlines between entries and rows, a 2px rule
under section headings, a left rule marking the education tier, and a 1px
border defining every panel and control.

### Named Rules

**The No-Card Rule.** A rounded, shadowed rectangle is not how this system
groups things. Group with rules and space. If something reads as a card, it is
probably the wrong container.

**The Side-Bar Ban.** A coloured `border-left` or `border-top` thicker than 1px
on a card, panel or callout is forbidden outright — no brief earns it back. It
is the single most recognizable tell of a generated interface, and two of them
existed here before polish removed them.

## Components

### Buttons

- **Shape:** minimal rounding (3px); never a pill except the circular
  back-to-top control.
- **Primary:** filled Instrument Green with Tracing Paper text
  (`0.5rem 0.75rem`). Reserved for the one link per entry that *proves* the
  claim — a live system, published docs, the email address. At most one per
  entry; five on the page.
- **Hover / Focus:** border and colour shift over 0.15s; focus-visible is a
  2px accent outline at 3px offset. No transform, no lift.
- **Secondary (chip):** Card White ground, hairline border, Graphite Soft text,
  with a trailing `↗` on external links.

### Chips

- **Stack chips:** hairline border, 20px radius, Pencil text, with a 12px brand
  mark whose colour is per-theme precomputed. Chips without a mark render text
  only — never a placeholder.
- **Change tags:** fixed 4.75rem column, uppercase 12px monospace, one of four
  tinted grounds. Below 480px they leave the column and sit above their text.

### Cards / Containers

- **Corner Style:** none (0).
- **Background:** Card White on Tracing Paper — the single tonal step.
- **Shadow Strategy:** none. See Elevation.
- **Border:** 1px Rule Hairline; the Stack card takes its group colour on hover
  only.
- **Internal Padding:** 16px (`{spacing.base}`); the hero entry takes 24px.

### Navigation

Two navigations, deliberately different in kind. The **sticky rail** (≥900px)
lists every entry as version-plus-date, with the active entry marked by an
accent left border and accent text; it tracks the entry whose top has passed a
reading line a third of the way down the viewport. The **jump nav** in the
header is a flat row of four section links, monospace, with Stack accented
because it is the one a reader would not think to look for. Minimum 24px
target height on both.

### Signature Component — the metadata block

The hero is a definition list of key/value rows on hairlines: monospace
uppercase keys in a 5.5rem column, values in body sans, one row per fact
(status, based, shipping, live). It replaced a pill-and-chip header and is the
clearest statement of the system's thesis — a record, ruled, read top to
bottom. Below 560px the key column collapses and keys sit above their values.

## Do's and Don'ts

### Do:

- **Do** spend Instrument Green on state only — available, current, live.
- **Do** verify every colour against the surface it actually sits on, and
  measure both themes independently.
- **Do** keep body text at 16px or above, and prose within a 66ch measure.
- **Do** use monospace for logged data — versions, dates, keys, counts — and
  sans for anything read in sentences.
- **Do** separate with hairlines and space; let the tonal step from ground to
  surface carry what little depth exists.
- **Do** prefix every modifier class with `is-`. Tailwind's utilities are
  global via `style.css`, so a bare `fixed` or `hidden` silently pulls an
  element out of its layout — this has happened here.
- **Do** use `padding-block` on any section that also carries `.cl-shell`; the
  `padding` shorthand overrides the shell's gutter and the section goes
  edge-to-edge on mobile.
- **Do** give `prefers-reduced-motion` a real alternative: stop ambient loops
  outright, keep transitions at 1ms so state still reports.

### Don't:

- **Don't** use rounded status pills, chip rows or pulsing dots as page
  furniture. This is the generated-portfolio house style and it was removed
  from this page on sight.
- **Don't** put a coloured `border-left` or `border-top` above 1px on any card,
  panel or callout. Banned outright.
- **Don't** emphasise a word with a highlighter or gradient behind it. Emphasis
  is weight or colour, never a marker stroke.
- **Don't** add a `box-shadow` anywhere, in any state.
- **Don't** write metaphor-forward copy. Claims are direct and checkable —
  "I build and run the backend for Addis Ababa's air quality monitoring
  network", not "the air over a city of five million passes through my code".
- **Don't** introduce a font size or spacing value outside the two scales. If a
  step is missing, add it to the token block rather than one-offing it.
- **Don't** animate anything ambient beyond the single live-status pulse, and
  never animate a layout property.
