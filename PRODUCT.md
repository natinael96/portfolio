# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences arrive with different reading depths, and the site has to hold
all three without a mode switch:

1. **Remote hiring managers and engineers abroad** — evaluating for a backend,
   full-stack or platform seat. They read code and follow links. The
   engineering detail on Sinq and Addis Air Net exists for them, and they are
   the only audience that will open a repository.
2. **Recruiters and HR screeners** — a non-technical first pass, scanning for
   role fit, years, stack keywords and availability before forwarding. They
   skim; they do not read change lines. Everything they need is in the first
   viewport.
3. **Ethiopian employers and the regional market** — Addis Air Net, A2SV and
   ALX carry direct name recognition here that they do not carry abroad.

Not an audience: freelance or contract clients. The site is not selling
project work.

## Product Purpose

A personal portfolio for Natinael Mequanent Shebabaw, a software developer in
Addis Ababa, currently between roles and open to remote work.

Its job is to **back up applications he sends** — it is the proof link inside
an application or a LinkedIn message, not a discovery channel. Someone already
has his name when they arrive. Success is the site surviving scrutiny, not
generating traffic.

This has a direct consequence: **discoverability, SEO and shareability are not
requirements.** Do not trade depth, honesty or load weight for reach.

## Positioning

The claim a neighbouring portfolio could not truthfully copy: he **built and
ran** a city-scale sensor network that is still in production after he left it,
and he ships a complex Amharic-first Android application solo, on a release
cadence, with a test suite.

Most portfolios at this level claim participation in work. This one can point
at two live systems and the source of both.

## Operating Context

- Read cold, usually in a tab opened from an application, alongside several
  other candidates' links. First impression happens in seconds; the decision to
  keep reading happens in the first viewport.
- Reached on desktop and phone in roughly equal measure; no assumption of a
  fast connection, since a meaningful share of readers are in Ethiopia.
- Frequently read by someone who will then open GitHub in the next tab. Claims
  made here get checked there, which is why they must match.

## Capabilities and Constraints

- Static Vite + Vue 3 + TypeScript SPA. No backend of its own.
- Deploys from `master` to Vercel; pushing to `master` is the deploy. Canonical
  host is `www.natinael96.tech`.
- **Three routes, all live and all intentional.** `/` is the changelog design;
  `/monitor` (alias `/vitals`) is the archived Vital Signs design; `/old`
  (alias `/private`) is the archived editorial design. `vercel.json` rewrites
  everything to `index.html`.
- Content is the source of truth in `src/content/` — `changelog.ts` and
  `writing.ts` feed `/`, `site.ts` feeds the two archived designs. A fact that
  appears on more than one route has to be changed in more than one file.
- One third-party runtime dependency: the footer visit counter
  (`abacus.jasoncameron.dev`). It is decorative, fails silently, and can be
  switched off by clearing `changelogMeta.visits.namespace`.
- The Addis Air Net public API blocks cross-origin reads, so the live PM2.5
  readout in the hero ships as a static claim. The fetch path exists and is
  documented; it needs a CORS header on that API, not new code here.

## Brand Commitments

- **Amharic and Ge'ez are binding, not decoration.** ስንቅ, ግጻዌ, ባሕረ ሓሳብ and the
  Ethiopic typography are part of how he presents. Noto Serif Ethiopic is in
  the font stack for this reason and must not be optimised away.
- **The archived designs stay live.** `/monitor` and `/old` are part of the
  record. They are not dead weight to be deleted in a future cleanup.
- Name, email and links are fixed facts, not copy to be rewritten:
  `natinael.96@gmail.com`, `github.com/natinael96`.

## Evidence on Hand

Real, and verifiable — every claim on the site traces to one of these:

- **Résumé** (FlowCV, 2026-08-04) — the origin of `src/content/site.ts`.
- **Addis Air Net** — live at `addisairnet.et`; source at
  `~/Desktop/project/airq/air-qua-monitor-back`. Verified 2026-09-18: 13
  routers, 83 endpoints, 13 models, 22 migrations, 8 middleware, a dedicated
  PurpleAir router with 11 endpoints.
- **Sinq** — live at `sinq.natinael96.tech`; source at
  `~/Desktop/project/---sinq` and `github.com/natinael96/sinq`. Verified
  2026-09-18: v2.5.1, versionCode 77, 441 tests across 71 files, 241 Kotlin
  files, ~47k lines, 202 content files, 28 MB bundled, 10.4 MB APK.
- **EOTCDevAPI** — `github.com/natinael96/EOTCDevAPI`, docs at
  `natinael96.github.io/EOTCDevAPI`.
- **Certificates** — ALX (`savanna.alxafrica.com/certificates/EHB5RJ7Y3F`),
  A2SV (Google Drive link in `site.ts`).

**Absences future work must not fabricate:**

- No testimonials, references, client quotes or press. None exist.
- No blog posts. The Writing section renders an honest empty state; do not
  seed it with invented entries.
- `sysdesign.natinael96.tech` is **not deployed** and currently 404s. The
  source is at `~/Desktop/telegram`.
- No metric beyond what the two repositories can be counted to produce. The
  daily readings figure (25K+) is the one number supplied by the user rather
  than counted from source.

## Product Principles

1. **Proof, not reach.** The site exists to survive scrutiny from someone who
   already has his name. Never trade depth or honesty for discoverability.
2. **Every claim is checkable.** Readers open GitHub in the next tab. Counts
   come from counting the source, not from memory or the résumé; where a date
   or figure is not published, show none rather than an estimate.
3. **Three depths, one page.** A screener must succeed in the first viewport
   and an engineer must be able to keep going for several screens. Neither
   audience gets a separate mode.
4. **Amharic and Ge'ez are first-class.** They set typography and font-stack
   requirements, and they are never the thing trimmed for weight.
5. **The record is append-only.** Superseded designs move to a route; they do
   not get deleted. The same instinct governs content: a role that ended gets
   its dates closed, not erased.

## Accessibility & Inclusion

- WCAG 2.1 AA is the working floor, verified rather than assumed: text pairs at
  4.5:1 (3:1 for large), interactive targets at 24×24 minimum, and a
  `prefers-reduced-motion` path that stops ambient motion while preserving the
  state it encoded.
- Both themes are first-class and must be measured independently; a colour that
  passes on one ground is not evidence about the other.
- Readers on slow Ethiopian connections are a real segment: font and bundle
  weight are an accessibility concern here, not only a performance one.
