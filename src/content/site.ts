/**
 * Site copy and links — sourced from the FlowCV resume (2026-08-04) + public GitHub.
 * Every fact (roles, dates, projects, stats) comes from the resume/GitHub.
 * Editorial copy only reframes what is already true — it invents nothing.
 */

export const site = {
  name: 'Natinael Mequanent Shebabaw',
  roleLabel: 'Software developer',
  email: 'natinael.96@gmail.com',
  social: {
    github: 'https://github.com/natinael96',
    linkedin: 'https://www.linkedin.com/in/natinael-mequanent-b861492a5/',
    twitter: '',
    leetcode: 'https://leetcode.com/natinael96',
    telegram: 'https://t.me/natinael96',
  },
} as const

/* ── Monitor — the "Vital Signs" design (default route) ────────────────── */

export interface MonitorChannel {
  id: string
  code: string
  label: string
  /** Waveform character drawn in the signal rail. */
  wave: 'ecg' | 'drift' | 'pulse' | 'square' | 'bead' | 'sine' | 'ticks' | 'flat'
  /** CSS custom-property token for the channel colour. */
  tone: 'subject' | 'air' | 'vitals' | 'work' | 'sinq' | 'form' | 'arch' | 'open'
}

export const monitorChannels: MonitorChannel[] = [
  { id: 'subject', code: 'PROF', label: 'Profile', wave: 'ecg', tone: 'subject' },
  { id: 'air', code: 'CH·01', label: 'Air', wave: 'drift', tone: 'air' },
  { id: 'practice', code: 'CH·02', label: 'Practice', wave: 'square', tone: 'work' },
  { id: 'archive', code: 'CH·03', label: 'Archive', wave: 'ticks', tone: 'arch' },
  { id: 'sinq', code: 'CH·04', label: 'Sinq', wave: 'bead', tone: 'sinq' },
  { id: 'vitals', code: 'CH·05', label: 'Vitals', wave: 'pulse', tone: 'vitals' },
  { id: 'formation', code: 'CH·06', label: 'Formation', wave: 'sine', tone: 'form' },
  { id: 'open', code: 'CH·07', label: 'Signal', wave: 'flat', tone: 'open' },
]

export const monitorSubject = {
  tag: 'Portfolio — continuous recording',
  since: 'On record since 2022',
  readouts: [
    { key: 'Role', value: 'Software developer' },
    { key: 'Current', value: 'Lead Software Engineer (PT) · Addis Air Net' },
    { key: 'Location', value: 'Addis Ababa · 9.03°N 38.74°E' },
    { key: 'Uptime', value: '2+ yrs in industry' },
    { key: 'Signal', value: 'Open to remote roles', highlight: true, live: true },
  ],
} as const

/* ── Cover (used by the archived /old design) ──────────────────────────── */

export const cover = {
  overline: 'A working record',
  dateline: 'Addis Ababa, Ethiopia',
  nameLines: ['Natinael', 'Mequanent', 'Shebabaw'],
  standfirst:
    'Software developer in Addis Ababa. Two-plus years of APIs, backends, and web interfaces — and one live instrument that watches the air over the city.',
  facts: [
    { key: 'Role', value: 'Software developer' },
    { key: 'Location', value: 'Addis Ababa, Ethiopia' },
    { key: 'Focus', value: 'APIs · backend · web UI · system design' },
    { key: 'Stack', value: 'TypeScript · Python · React · Django · FastAPI · NestJS' },
    { key: 'Education', value: 'BSc biomedical engineering, AAU' },
    { key: 'Training', value: 'A2SV · ALX ProDev Backend' },
    { key: 'Experience', value: '2+ years in industry' },
    { key: 'Status', value: 'Open to remote roles', highlight: true },
  ],
} as const

/* ── Chapters (archived /old design) ───────────────────────────────────── */

export interface Chapter {
  id: string
  num: string
  navLabel: string
  runningTitle: string
}

export const chapters: Chapter[] = [
  { id: 'feature', num: '01', navLabel: 'Feature', runningTitle: 'The air over Addis' },
  { id: 'practice', num: '02', navLabel: 'Practice', runningTitle: 'Two years, three teams' },
  { id: 'formation', num: '03', navLabel: 'Formation', runningTitle: 'A biomedical route into software' },
  { id: 'archive', num: '04', navLabel: 'Archive', runningTitle: 'The backend notebooks' },
  { id: 'correspondence', num: '05', navLabel: 'Contact', runningTitle: 'Correspondence' },
]

/* ── Projects ──────────────────────────────────────────────────────────── */

export interface ProjectCodeLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github?: string
  githubRepos?: ProjectCodeLink[]
  demo?: string
  status?: 'live' | 'completed'
}

/** CH·01 — the feature story: the live network he now leads. */
export const featureProject: Project = {
  id: 'addis-air-net',
  title: 'Addis Air Net',
  description:
    'Air quality monitoring for Addis Ababa: IoT sensor stations, real-time map, and a public dashboard. Live on the public web.',
  tech: ['React', 'WebSockets', 'Recharts', 'FastAPI', 'PostgreSQL'],
  demo: 'https://addisairnet.et/',
  status: 'live',
}

export const feature = {
  kicker: 'Addis Air Net · addisairnet.et',
  titleTop: 'The air',
  titleBottom: 'over Addis.',
  dek: 'A live air-quality network for Addis Ababa — IoT sensor stations feeding a public real-time dashboard.',
  part: 'Lead engineer on a team of three — built the FastAPI backend, the Next.js dashboard, and the Docker/Caddy deploy. Full log below.',
  result: 'Live at addisairnet.et — 10K+ sensor readings ingested and served every day.',
  meta: [
    { key: 'Status', value: 'Live', live: true },
    { key: 'Role', value: 'Lead Software Engineer · team of 3' },
    { key: 'Ingest', value: 'FastAPI · PostgreSQL · 10K+ readings/day' },
    { key: 'Surface', value: 'Next.js · React · Recharts · Leaflet' },
    { key: 'Deploy', value: 'Docker · Caddy · GitHub Actions' },
    { key: 'Address', value: 'addisairnet.et' },
  ],
  cta: 'Open live network',
  /** Condensed build log — what was actually built, straight from the repo. */
  log: [
    {
      id: 'backend',
      area: 'Backend · API',
      stack: 'FastAPI · PostgreSQL · SQLAlchemy',
      points: [
        '70+ REST endpoints across 11 routers — auth, devices, readings, analytics, admin.',
        'JWT role guards, token blacklist, account lockout, per-IP rate limits; aggregation by device, location, hour, or day.',
      ],
      stat: { value: '70+', caption: 'endpoints · 13 models · 16 migrations' },
    },
    {
      id: 'frontend',
      area: 'Frontend · Dashboard',
      stack: 'Next.js · React 19 · Tailwind',
      points: [
        'Leaflet station map and Recharts time-series over live readings — Zustand state, Radix UI.',
      ],
      stat: { value: '10K+', caption: 'readings ingested per day' },
    },
    {
      id: 'ops',
      area: 'Ops · Deploy',
      stack: 'Docker · Caddy · CI/CD',
      points: [
        'Dockerized behind Caddy TLS with deploy, backup, and runbook scripts; security headers, throttling, request logging.',
      ],
      stat: { value: '7', caption: 'middleware in the request path' },
    },
  ],
} as const

/** CH·05 — the final-year project: literal vital signs. */
export const vitals = {
  period: 'Feb 2026 — Jun 2026',
  dek: 'AI-based multi-sensor hypertension monitoring — the final-year project where the degree and the day job meet in one instrument.',
  part: 'Built the full five-layer chain — ESP32 sensor firmware, edge preprocessing, a Python/scikit-learn prediction pipeline, and a React + Supabase dashboard.',
  result: 'Live sensor data streaming end-to-end at 250 Hz.',
  chain: [
    { code: 'L·01', name: 'Sensor firmware', detail: 'ESP32' },
    { code: 'L·02', name: 'Edge preprocessing', detail: '' },
    { code: 'L·03', name: 'Prediction pipeline', detail: 'Python · scikit-learn' },
    { code: 'L·04', name: 'Clinical dashboard', detail: 'React · Supabase · real-time' },
  ],
  rate: '250 Hz',
  rateCaption: 'sensor data streaming through the pipeline',
  github: 'https://github.com/natinael96/finalproj_ml',
} as const

/** CH·04 — the personal one. */
export const sinq = {
  latin: 'Sinq',
  geez: 'ስንቅ',
  gloss: '“provisions for the road”',
  dek: 'The Ethiopian Orthodox Book of Hours for Android — Amharic-first, fully offline.',
  period: 'Jul 2026 — Present',
  part: 'Designed and built solo in Kotlin & Jetpack Compose — the seven prayer hours plus the full Psalter, bookmarks, verse highlights, habit streaks, reminders, and a home-screen widget.',
  result: 'Fully offline — no account, no network, no analytics — with ባሕረ ሓሳብ, the Ethiopian computus, placing the church year’s movable feasts on-device.',
  stats: [
    { value: '7+1', caption: 'canonical hours plus the Veil, with a time-of-day suggestion' },
    { value: '150', caption: 'psalms — the full Psalter, with weekday reading divisions' },
  ],
  searchTitle: 'Homophone-tolerant Amharic search',
  searchNote: 'Ge’ez script spells one sound several ways. The search engine folds phonetically equivalent characters, so any spelling of a word finds the prayer.',
  folds: [
    ['ሀ', 'ሐ', 'ኀ'],
    ['ሰ', 'ሠ'],
    ['ጸ', 'ፀ'],
  ],
  github: 'https://github.com/natinael96/sinq',
} as const

/** CH·03 — the archive index (backend notebooks on GitHub). */
export const archiveProjects: Project[] = [
  {
    id: 'job-board-api',
    title: 'Job Board Platform Backend API',
    description:
      'Backend API for a job board platform — listings, applications, auth, and employer workflows.',
    tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'REST'],
    github: 'https://github.com/natinael96/Job-Board-Platform-Backend-API',
    status: 'completed',
  },
  {
    id: 'graphql-crm',
    title: 'GraphQL CRM backend',
    description:
      'Backend specialization project focused on GraphQL APIs and CRM-style domains (ALX backend track).',
    tech: ['Python', 'GraphQL', 'PostgreSQL'],
    github: 'https://github.com/natinael96/alx-backend-graphql_crm',
    status: 'completed',
  },
  {
    id: 'travel',
    title: 'Travel application',
    description:
      'Multi-milestone travel-app backend and services from the ALX backend curriculum.',
    tech: ['Python', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/natinael96/alx_travel_app_0x03',
    status: 'completed',
  },
  {
    id: 'security',
    title: 'Backend security',
    description:
      'Security-focused backend exercises: hardening patterns, safe defaults, and defensive design.',
    tech: ['Python', 'Node.js', 'Docker'],
    github: 'https://github.com/natinael96/alx-backend-security',
    status: 'completed',
  },
  {
    id: 'listings-cache',
    title: 'Cached property listings API',
    description:
      'Performance-oriented API work with caching for listing-heavy workloads (ALX backend).',
    tech: ['Python', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/natinael96/alx-backend-caching_property_listings',
    status: 'completed',
  },
]

export const archive = {
  dek: 'Backend work in public — a platform API and the notebooks from the ALX backend track. Unpolished on purpose: this is where the reps happened.',
} as const

/* ── Experience ────────────────────────────────────────────────────────── */

export interface Experience {
  id: string
  role: string
  company: string
  category?: 'professional' | 'education'
  companyUrl?: string
  period: string
  location?: string
  bullets?: string[]
  summary?: string
  /** One number worth pulling into the margin, with its caption. */
  stat?: { value: string; caption: string }
}

export const experiences: Experience[] = [
  {
    id: 'addisairnet',
    role: 'Lead Software Engineer (Part-Time)',
    company: 'Addis Air Net',
    category: 'professional',
    companyUrl: 'https://addisairnet.et/',
    period: 'Sep 2025 — Present',
    location: 'Addis Ababa, Ethiopia',
    bullets: [
      'Leads a team of three engineers — owning architecture decisions, code review, and sprint planning.',
      'Built a real-time air-quality monitoring dashboard (React, WebSockets, Recharts) visualizing live IoT sensor readings across multiple locations with sub-second update latency.',
      'Designed and deployed backend ingestion services (FastAPI, PostgreSQL) processing over 10K sensor readings per day, with automatic validation and anomaly flagging.',
      'Set up a CI/CD pipeline (GitHub Actions) deploying Dockerized services to a self-managed Ubuntu VPS — automated tests, zero-downtime releases via Docker Compose.',
    ],
    stat: { value: '10K+', caption: 'sensor readings ingested and validated per day' },
  },
  {
    id: 'amplitude',
    role: 'FullStack AI Developer',
    company: 'Amplitude Ventures',
    category: 'professional',
    companyUrl: 'https://www.amplitude.ventures/',
    period: 'Feb 2025 — Nov 2025',
    location: 'Remote · Norway',
    bullets: [
      'Developed and maintained production full-stack applications with Angular, Django REST Framework, and PostgreSQL.',
      'Reduced average API response time across projects with Redis caching, database indexing, and query optimization.',
      'Integrated OpenAI LLM APIs into an automated document-summarization feature — prompt design, streaming responses, and token-cost optimization.',
      'Shipped three production features per sprint while collaborating with designers and product managers across three time zones.',
    ],
  },
  {
    id: 'xyberlabs',
    role: 'Full-Stack Developer (Contract, Remote)',
    company: 'XyberLabs',
    category: 'professional',
    companyUrl: 'https://xyberlabs.et/',
    period: 'Dec 2024 — Sep 2025',
    location: 'Remote · Ethiopia',
    bullets: [
      'Built and deployed full-stack web applications with React, NestJS, PostgreSQL, and MongoDB.',
      'Designed RESTful APIs and JWT-based authentication and authorization, covering role-based access for client projects.',
    ],
  },
]

export const practice = {
  dek: 'Two-plus years of shipped work — a lead seat in Addis Ababa, remote roles for Norway and Ethiopia.',
} as const

/**
 * Practice, plotted on a shared time axis (Dec 2024 → present, 21 months).
 * Offsets are month indices from Dec 2024 — derived from the resume periods.
 */
export const practiceTimeline = {
  startLabel: 'Dec 2024',
  endLabel: 'Present',
  totalMonths: 21,
  sessions: [
    { expId: 'addisairnet', from: 9, to: 21, ongoing: true },
    { expId: 'amplitude', from: 2, to: 12, ongoing: false },
    { expId: 'xyberlabs', from: 0, to: 10, ongoing: false },
  ],
} as const

/* ── Formation — calibration ───────────────────────────────────────────── */

export const formation = {
  /** The essay. Every claim traces back to the resume entries below. */
  paragraphs: [
    'Since 2022, the degree in progress at Addis Ababa University is biomedical engineering. The coursework runs from data structures, object-oriented programming, and database systems into digital signal processing, medical imaging, and applied electronics.',
    'The software formation ran alongside it. Through 2024, A2SV — a Google-backed program — meant intensive training in data structures, algorithms, and system design, with more than nine hundred algorithm problems solved along the way. Then ALX Africa’s ProDev Backend programme: Python, SQL, API design, microservices, Docker, Kubernetes, CI/CD, and system security, through production-style projects.',
    'Instruments first, software second. The order explains the work.',
  ],
  coursework: {
    label: 'Relevant coursework — AAU, May 2022 — Jun 2026',
    items: [
      'Data structures & algorithms',
      'Object-oriented programming',
      'Database management systems',
      'Digital signal processing',
      'Medical imaging',
      'Applied electronics',
    ],
  },
  programs: [
    {
      id: 'a2sv',
      name: 'A2SV — Africa to Silicon Valley',
      role: 'Software engineering trainee · backed by Google',
      period: 'Feb 2024 — Nov 2024',
      url: 'https://a2sv.org/',
      note: 'Selected into a Google-backed program providing 12+ months of intensive DSA and software engineering training. 900+ algorithm problems solved (LeetCode/Codeforces).',
      certUrl: 'https://drive.google.com/file/d/1d9Z5bJooQ5Iu5bE57q0y7lkP3k9Zkv0I/view?usp=sharing',
    },
    {
      id: 'alx',
      name: 'ALX Africa',
      role: 'ProDev Backend · Software Engineering',
      period: 'Sep 2025 — Feb 2026',
      url: 'https://www.alxafrica.com/',
      note: 'Advanced backend curriculum: Python, SQL, API design, microservices, Docker, Kubernetes, CI/CD, and system security through production-style projects.',
      certUrl: 'https://savanna.alxafrica.com/certificates/EHB5RJ7Y3F',
    },
  ],
  leadership: {
    role: 'Student Council Member',
    org: 'College of Technology and Built Environment, AAU',
    period: 'Sep 2025 — Jun 2026',
  },
} as const

/* ── Toolkit — instrument inventory (resume skills) ────────────────────── */

export const toolkit = [
  { name: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Kotlin'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Vue 3', 'Angular'] },
  { name: 'Backend', items: ['Django', 'FastAPI', 'NestJS', 'Node.js', 'REST APIs', 'WebSockets', 'Redis'] },
  { name: 'Mobile', items: ['Kotlin', 'Jetpack Compose', 'Material 3'] },
  { name: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { name: 'DevOps & Cloud', items: ['Docker', 'Kubernetes', 'CI/CD (GitHub Actions)', 'AWS (EC2, S3)', 'Git'] },
  { name: 'AI/ML', items: ['scikit-learn', 'LLM API integration', 'pandas/NumPy'] },
] as const

/* ── Correspondence ────────────────────────────────────────────────────── */

export const correspondence = {
  dek: 'Hiring, collaboration, or technical questions — the inbox is open. Replies within 48 hours, from UTC+3.',
  channels: [
    { name: 'GitHub', url: site.social.github },
    { name: 'LinkedIn', url: site.social.linkedin },
    { name: 'LeetCode', url: site.social.leetcode },
    { name: 'Telegram', url: site.social.telegram },
  ].map((c) => ({ ...c, slug: c.url.replace(/^https?:\/\/(www\.)?/, '') })),
} as const
