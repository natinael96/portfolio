/**
 * Changelog design — the résumé re-cut as release notes.
 *
 * Two sections, in this order:
 *   1. Experience — one monotonic semver timeline. Roles are full releases;
 *      education and training sit inside the same timeline as sub-entries,
 *      so the dates stay honest without competing with the work.
 *   2. Projects — shipped artefacts. No semver here: a project has a status
 *      and a date, not a career version.
 *
 * Facts come from site.ts (FlowCV résumé) and from github.com/natinael96.
 * Nothing here is invented; where a date isn't published, none is shown.
 */

import { site } from './site'

export const changelogMeta = {
  name: site.name,
  handle: 'natinael96',
  role: 'Software developer',
  location: 'Addis Ababa, Ethiopia',
  coords: '9.03°N 38.74°E',
  timezone: 'UTC+3',
  email: site.email,
  /**
   * The hero: role eyebrow plus a status strip that tries to prove the work
   * live.
   *
   * `liveEndpoint`: a GET returning JSON from the Addis Air Net API. Empty
   * string = no fetch, the strip shows the static claim. To light it up:
   * expose an endpoint with `Access-Control-Allow-Origin` for this site's
   * origin, set the URL here, and adjust `pickValue` in ChangelogApp.vue to
   * the response shape. Verified 2026-09: the public API currently blocks
   * cross-origin reads, so this ships static.
   */
  hero: {
    statement: 'I build and run the backend for Addis Ababa\u2019s air quality monitoring network.',
    strip: {
      liveEndpoint: '',
      fallback: 'addisairnet.et \u2014 in production \u00b7 10K+ sensor readings processed daily',
      url: 'https://addisairnet.et/',
    },
  },
  current: '3.0.0',
  since: '2022',
  /** Freshness stamp — a changelog with no visible update date reads dead. */
  updated: 'September 2026',
} as const

/** The conceit, stated plainly — so it reads as a system, not a joke. */
export const versioning = [
  {
    part: 'MAJOR',
    example: '3.0.0',
    meaning: 'The kind of work changed — a first professional seat, a first lead seat.',
  },
  {
    part: 'MINOR',
    example: '2.1.0',
    meaning: 'A new capability — another role, or a programme completed.',
  },
] as const

/**
 * The education tier is a rendering decision, not a semver component — it gets
 * said in prose rather than smuggled into the legend as a fake third part.
 */
export const versioningNote =
  'Education and training sit in the same timeline, set back from the roles they support.'

export type ChangeKind = 'added' | 'changed' | 'fixed' | 'learned'

export interface ChangeLine {
  kind: ChangeKind
  text: string
}

export interface EntryLink {
  label: string
  href: string
  /** Filled call-to-action treatment — reserve for the link that proves the
   *  claim (a live system, a published doc), one per entry at most. */
  primary?: boolean
}

export interface Release {
  version: string
  bump: 'major' | 'minor' | 'head'
  /** Roles render full-weight; education and training render subordinate. */
  tier: 'primary' | 'sub'
  date: string
  railDate: string
  title: string
  org?: string
  orgUrl?: string
  period?: string
  summary: string
  changes: ChangeLine[]
  links?: EntryLink[]
  stat?: { value: string; caption: string }
}

/* ── 1 · Experience ──────────────────────────────────────────────────────── */

export const experience: Release[] = [
  {
    version: 'Unreleased',
    bump: 'head',
    tier: 'primary',
    date: 'In progress',
    railDate: 'HEAD',
    title: 'Open to remote roles',
    summary:
      'Taking calls about backend and full-stack work. Replies within 48 hours, from UTC+3.',
    changes: [
      { kind: 'added', text: 'Availability for remote backend, full-stack, or platform roles.' },
    ],
    links: [
      { label: 'Email', href: `mailto:${site.email}`, primary: true },
      { label: 'LinkedIn', href: site.social.linkedin },
    ],
  },

  {
    version: '3.1.0',
    bump: 'minor',
    tier: 'sub',
    date: 'February 2026',
    railDate: 'Feb 2026',
    title: 'ProDev Backend',
    org: 'ALX Africa',
    orgUrl: 'https://www.alxafrica.com/',
    period: 'Sep 2025 — Feb 2026',
    summary:
      'Advanced backend curriculum, completed through production-style projects rather than exercises.',
    changes: [
      {
        kind: 'learned',
        text: 'Python, SQL, API design, microservices, Docker, Kubernetes, CI/CD, and system security.',
      },
    ],
    links: [
      { label: 'Certificate', href: 'https://savanna.alxafrica.com/certificates/EHB5RJ7Y3F' },
    ],
  },

  {
    version: '3.0.0',
    bump: 'major',
    tier: 'primary',
    date: 'September 2025',
    railDate: 'Sep 2025',
    title: 'Lead Software Engineer',
    org: 'Addis Air Net',
    orgUrl: 'https://addisairnet.et/',
    period: 'Sep 2025 — present · Addis Ababa',
    summary:
      'First lead seat. Air-quality monitoring for Addis Ababa — IoT sensor stations feeding a public real-time dashboard.',
    changes: [
      {
        kind: 'changed',
        text: 'BREAKING — now leads a team of three engineers, owning architecture decisions, code review, and sprint planning.',
      },
      {
        kind: 'added',
        text: 'Backend ingestion services (FastAPI, PostgreSQL) processing 10,000+ sensor readings per day with automatic validation and anomaly flagging.',
      },
      {
        kind: 'added',
        text: '70+ REST endpoints across 11 routers — auth, devices, readings, analytics, admin — with JWT role guards, token blacklist, account lockout, and per-IP rate limits.',
      },
      {
        kind: 'added',
        text: 'Real-time dashboard (React, WebSockets, Recharts, Leaflet) visualising live readings across stations with sub-second update latency.',
      },
      {
        kind: 'fixed',
        text: 'Releases: Dockerized services behind Caddy TLS, deployed to a self-managed Ubuntu VPS by GitHub Actions with automated tests and zero downtime.',
      },
    ],
    stat: { value: '10K+', caption: 'readings ingested and validated per day' },
    links: [{ label: 'Live network', href: 'https://addisairnet.et/', primary: true }],
  },

  {
    version: '2.1.0',
    bump: 'minor',
    tier: 'primary',
    date: 'February 2025',
    railDate: 'Feb 2025',
    title: 'FullStack AI Developer',
    org: 'Amplitude Ventures',
    orgUrl: 'https://www.amplitude.ventures/',
    period: 'Feb 2025 — Nov 2025 · Remote, Norway',
    summary: 'First remote role across time zones, and first production LLM work.',
    changes: [
      {
        kind: 'added',
        text: 'Production full-stack applications with Angular, Django REST Framework, and PostgreSQL.',
      },
      {
        kind: 'added',
        text: 'An automated document-summarisation feature on the OpenAI API — prompt design, streaming responses, and token-cost optimisation.',
      },
      {
        kind: 'changed',
        text: 'Cut average API response time with Redis caching, database indexing, and query optimisation.',
      },
      {
        kind: 'changed',
        text: 'Shipped three production features per sprint, working with designers and product managers across three time zones.',
      },
    ],
  },

  {
    version: '2.0.0',
    bump: 'major',
    tier: 'primary',
    date: 'December 2024',
    railDate: 'Dec 2024',
    title: 'Full-Stack Developer',
    org: 'XyberLabs',
    orgUrl: 'https://xyberlabs.et/',
    period: 'Dec 2024 — Sep 2025 · Contract, remote',
    summary: 'First professional seat. Training stopped being the main thing.',
    changes: [
      {
        kind: 'changed',
        text: 'BREAKING — student to shipping engineer. Work now runs against client deadlines.',
      },
      {
        kind: 'added',
        text: 'Full-stack web applications built and deployed with React, NestJS, PostgreSQL, and MongoDB.',
      },
      {
        kind: 'added',
        text: 'RESTful APIs with JWT authentication and role-based access control across client projects.',
      },
    ],
  },

  {
    version: '1.0.0',
    bump: 'major',
    tier: 'sub',
    date: 'February 2024',
    railDate: 'Feb 2024',
    title: 'Africa to Silicon Valley',
    org: 'A2SV',
    orgUrl: 'https://a2sv.org/',
    period: 'Feb 2024 — Nov 2024',
    summary:
      'Selected into a Google-backed programme — twelve-plus months of intensive data structures, algorithms, and system design.',
    changes: [
      { kind: 'learned', text: '900+ algorithm problems solved across LeetCode and Codeforces.' },
    ],
    stat: { value: '900+', caption: 'algorithm problems solved' },
    links: [
      { label: 'LeetCode', href: site.social.leetcode },
      {
        label: 'Certificate',
        href: 'https://drive.google.com/file/d/1d9Z5bJooQ5Iu5bE57q0y7lkP3k9Zkv0I/view?usp=sharing',
      },
    ],
  },

  {
    version: '0.1.0',
    bump: 'minor',
    tier: 'sub',
    date: 'May 2022',
    railDate: 'May 2022',
    title: 'BSc biomedical engineering',
    org: 'Addis Ababa University',
    period: 'May 2022 — Jun 2026',
    summary:
      'Initial commit. Instruments first, software second — the order explains the work above.',
    changes: [
      {
        kind: 'learned',
        text: 'Data structures, object-oriented programming, database systems, digital signal processing, medical imaging, and applied electronics.',
      },
      {
        kind: 'added',
        text: 'Student Council member, College of Technology and Built Environment (Sep 2025 — Jun 2026).',
      },
    ],
  },
]

/* ── 2 · Projects ────────────────────────────────────────────────────────── */

export type ProjectStatus = 'live' | 'active' | 'complete' | 'archive'

export interface ProjectEntry {
  id: string
  name: string
  /** Ge'ez or other second-script name, set beside the Latin one. */
  altName?: string
  /**
   * Project identity colours, [light, dark] per theme — applied to the title
   * (primary) and the alt-script name (secondary). All values must clear
   * 4.5:1 on their ground; check before adding. Omit for neutral ink.
   */
  colors?: { primary: [string, string]; secondary?: [string, string] }
  status: ProjectStatus
  statusLabel: string
  period?: string
  railLabel: string
  summary: string
  changes: ChangeLine[]
  tech: string[]
  links?: EntryLink[]
  stat?: { value: string; caption: string }
}

export const projects: ProjectEntry[] = [
  {
    id: 'addis-air-net',
    colors: { primary: ['#2f6285', '#8ec1e8'] },
    name: 'Addis Air Net',
    status: 'live',
    statusLabel: 'Live',
    period: 'Sep 2025 — present',
    railLabel: 'Addis Air Net',
    summary:
      'Air-quality monitoring for Addis Ababa — sensor stations, a real-time map, and a public dashboard. Also the day job: see 3.0.0 above for the role.',
    changes: [
      {
        kind: 'added',
        text: 'FastAPI ingestion over PostgreSQL, a Next.js dashboard with Leaflet and Recharts, deployed by GitHub Actions behind Caddy.',
      },
      {
        kind: 'added',
        text: 'A public station map and time-series view, open to anyone — no account needed to read the air over the city.',
      },
    ],
    tech: ['FastAPI', 'PostgreSQL', 'Next.js', 'Docker'],
    stat: { value: '10K+', caption: 'readings served per day' },
    links: [{ label: 'Live network', href: 'https://addisairnet.et/', primary: true }],
  },

  {
    id: 'sinq',
    colors: { primary: ['#1f6f4a', '#7fc9a3'], secondary: ['#8a6a15', '#d9b45b'] },
    name: 'Sinq',
    altName: 'ስንቅ',
    status: 'live',
    statusLabel: 'Live',
    period: 'Jul 2026 — present',
    railLabel: 'Sinq',
    summary:
      'The Ethiopian Orthodox Tewahedo Book of Hours for Android — the seven canonical hours, the whole Psalter, ግጻዌ and ስንክሳር, entirely offline. Built solo.',
    changes: [
      {
        kind: 'added',
        text: 'Seven canonical hours plus the Veil, with a time-of-day suggestion, and the full 150-psalm Psalter with weekday reading divisions.',
      },
      {
        kind: 'added',
        text: 'ባሕረ ሓሳብ — the Ethiopian computus, placing the church year’s movable feasts entirely on-device.',
      },
      {
        kind: 'added',
        text: 'Bookmarks, verse highlights, habit streaks, reminders, and a home-screen widget.',
      },
      {
        kind: 'changed',
        text: 'Search folds phonetically equivalent Ge’ez characters (ሀ/ሐ/ኀ, ሰ/ሠ, ጸ/ፀ), so any spelling of a word finds the prayer.',
      },
      {
        kind: 'fixed',
        text: 'No account, no network, no ads — the app works with the radio off.',
      },
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'Material 3'],
    stat: { value: '7+1', caption: 'canonical hours, plus the Veil' },
    links: [{ label: 'Website', href: 'https://sinq.natinael96.tech/', primary: true }],
  },


  {
    id: 'eotcdevapi',
    colors: { primary: ['#8c3041', '#e09aa6'], secondary: ['#8a6a15', '#d9b45b'] },
    name: 'EOTCDevAPI',
    status: 'live',
    statusLabel: 'Live · open',
    railLabel: 'EOTCDevAPI',
    summary:
      'An open, free REST API for the Ethiopian Orthodox Tewahedo Church calendar. No auth, no keys, no database.',
    changes: [
      {
        kind: 'added',
        text: 'Date conversion between the Ethiopian and Gregorian calendars, in both directions, with batch operations.',
      },
      {
        kind: 'added',
        text: 'Fasting periods with reasoning, feast lookups, and ባሕረ ሓሳብ for the movable feasts.',
      },
      {
        kind: 'added',
        text: 'The ግጻዌ and ስንክሳር lectionary with Bible references, plus iCalendar feeds you can subscribe to.',
      },
      { kind: 'changed', text: 'Dual implementation — TypeScript and Python.' },
    ],
    tech: ['TypeScript', 'Python', 'REST', 'iCalendar'],
    links: [
      { label: 'Docs', href: 'https://natinael96.github.io/EOTCDevAPI/', primary: true },
      { label: 'Source', href: 'https://github.com/natinael96/EOTCDevAPI' },
    ],
  },


  {
    id: 'finalproj-ml',
    colors: { primary: ['#226b66', '#85cbc4'] },
    name: 'AI hypertension monitoring',
    status: 'complete',
    statusLabel: 'Complete',
    period: 'Feb 2026 — Jun 2026',
    railLabel: 'Hypertension monitor',
    summary:
      'Final-year project — multi-sensor hypertension monitoring, where the degree and the day job meet in one instrument.',
    changes: [
      {
        kind: 'added',
        text: 'Full five-layer chain: ESP32 sensor firmware, edge preprocessing, a scikit-learn prediction pipeline, and a React and Supabase clinical dashboard.',
      },
      { kind: 'added', text: 'Real-time streaming from sensor to dashboard at 250 Hz, end to end.' },
    ],
    tech: ['ESP32', 'Python', 'scikit-learn', 'React', 'Supabase'],
    stat: { value: '250 Hz', caption: 'sensor data through the pipeline' },
    links: [{ label: 'Source', href: 'https://github.com/natinael96/finalproj_ml' }],
  },


  {
    id: 'job-board',
    colors: { primary: ['#3b5680', '#9dbae0'] },
    name: 'Job Board Platform API',
    status: 'complete',
    statusLabel: 'Complete',
    railLabel: 'Job Board API',
    summary:
      'Backend API for a job board — listings, applications, authentication, and employer workflows.',
    changes: [
      {
        kind: 'added',
        text: 'REST endpoints over PostgreSQL with role-separated employer and applicant flows.',
      },
    ],
    tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'REST'],
    links: [
      { label: 'Source', href: 'https://github.com/natinael96/Job-Board-Platform-Backend-API' },
    ],
  },


  {
    id: 'archive',
    name: 'Backend archive',
    status: 'archive',
    statusLabel: 'Archive',
    railLabel: 'Backend archive',
    summary:
      'Backend work in public, from the ALX track. Unpolished on purpose — this is where the reps happened.',
    changes: [
      {
        kind: 'added',
        text: 'A GraphQL CRM backend, a multi-milestone travel application, backend security hardening, and a Redis-cached property-listings API.',
      },
    ],
    tech: ['Python', 'GraphQL', 'Redis', 'Docker'],
    links: [{ label: 'All repositories', href: 'https://github.com/natinael96?tab=repositories' }],
  },
]

/* ── Footer blocks ───────────────────────────────────────────────────────── */

/**
 * The stack — a dependency manifest. Each group carries its own [light, dark]
 * accent; all fourteen values clear 4.5:1 on their ground (worst 5.97:1).
 */
export interface DependencyGroup {
  group: string
  /** What this group actually does, in the reader's terms. */
  note: string
  accent: [string, string]
  items: string[]
}

export const dependencies: DependencyGroup[] = [
  {
    group: 'languages',
    note: 'What I write in',
    accent: ['#3b5680', '#9dbae0'],
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Kotlin'],
  },
  {
    group: 'backend',
    note: 'Where most of my work lives',
    accent: ['#1f6f4a', '#7fc9a3'],
    items: ['FastAPI', 'Django', 'NestJS', 'Node.js', 'REST', 'WebSockets', 'GraphQL'],
  },
  {
    group: 'frontend',
    note: 'The surfaces on top of it',
    accent: ['#226b66', '#85cbc4'],
    items: ['React', 'Next.js', 'Vue 3', 'Angular', 'Tailwind CSS'],
  },
  {
    group: 'data',
    note: 'Storage and caching',
    accent: ['#5f4677', '#b7a2d4'],
    items: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    group: 'infra',
    note: 'Shipping and keeping it up',
    accent: ['#8a5227', '#dfab7f'],
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Caddy', 'AWS (EC2, S3)', 'Git'],
  },
  {
    group: 'mobile',
    note: 'Android, for Sinq',
    accent: ['#8c3041', '#e09aa6'],
    items: ['Kotlin', 'Jetpack Compose', 'Material 3'],
  },
  {
    group: 'ml',
    note: 'Models and LLM integration',
    accent: ['#2f6285', '#8ec1e8'],
    items: ['scikit-learn', 'pandas', 'NumPy', 'LLM APIs'],
  },
]

export const contact = {
  note: 'Hiring, collaboration, or technical questions — the inbox is open. Replies within 48 hours, from UTC+3.',
  channels: [
    { name: 'Email', url: `mailto:${site.email}`, slug: site.email },
    { name: 'GitHub', url: site.social.github, slug: 'github.com/natinael96' },
    {
      name: 'LinkedIn',
      url: site.social.linkedin,
      slug: 'linkedin.com/in/natinael-mequanent',
    },
    { name: 'LeetCode', url: site.social.leetcode, slug: 'leetcode.com/natinael96' },
    { name: 'Telegram', url: site.social.telegram, slug: 't.me/natinael96' },
  ],
} as const
