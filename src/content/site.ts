/**
 * Site copy and links — sourced from resume (FlowCV PDF) + public GitHub.
 */

export const site = {
  name: 'Natinael Mequanent Shebabaw',
  roleLabel: 'Software developer',
  email: 'natinael.96@gmail.com',
  meta: {
    title: 'Natinael Mequanent Shebabaw · Software developer',
    description:
      'Software developer in Addis Ababa—APIs, backends, and web interfaces with TypeScript, Python, Node.js, React, Next.js, and Vue. Amplitude Ventures, XyberLabs, Eskalate.io, A2SV, biomedical engineering.',
  },
  social: {
    github: 'https://github.com/natinael96',
    linkedin: 'https://www.linkedin.com/in/natinael-mequanent-b861492a5/',
    twitter: '',
    leetcode: 'https://leetcode.com/natinael96',
    telegram: 'https://t.me/natinael96',
  },
} as const

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
  /** Multiple repos (e.g. API + web). When set, used instead of `github` for links. */
  githubRepos?: ProjectCodeLink[]
  demo?: string
  status?: 'live' | 'completed'
}

const projectsUnordered: Project[] = [
  {
    id: 'air-qua',
    title: 'Air Qua',
    description:
      'Air quality monitoring for Addis Ababa: real-time map, stations, and dashboard. Live demo on Vercel.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    demo: 'https://air-qua-monitor-front.vercel.app',
    status: 'live',
  },
  {
    id: 'job-board-api',
    title: 'Job Board Platform Backend API',
    description:
      'Backend API for a job board platform—listings, applications, auth, and employer workflows.',
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
    title: 'Travel application (ALX)',
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

/** Demos first, then the rest in stable order */
export const projects: Project[] = [
  ...projectsUnordered.filter((p) => p.demo),
  ...projectsUnordered.filter((p) => !p.demo),
]

export interface Experience {
  id: string
  role: string
  company: string
  category?: 'professional' | 'education'
  /** Official site (e.g. company homepage) */
  companyUrl?: string
  period: string
  location?: string
  /** Resume-style bullets; preferred over `summary` when present */
  bullets?: string[]
  /** Short paragraph (e.g. education / program blurbs) */
  summary?: string
}

export const experiences: Experience[] = [
  {
    id: 'amplitude',
    role: 'Software developer',
    company: 'Amplitude Ventures',
    category: 'professional',
    companyUrl: 'https://www.amplitude.ventures/',
    period: 'Feb 2025 — Nov 2025',
    location: 'Remote · Norway',
    bullets: [
      'Developed and optimized backend and frontend applications to improve performance across multiple projects.',
      'Delivered fully functional products to clients with new features and ongoing improvements.',
      'Collaborated with cross-functional teams for smooth development and deployment.',
    ],
  },
  {
    id: 'xyberlabs',
    role: 'Software developer',
    company: 'Xyber Labs Technology Solutions',
    category: 'professional',
    companyUrl: 'https://www.linkedin.com/company/xyber-labs-et/',
    period: 'Dec 2024 — Sep 2025',
    location: 'Remote · Ethiopia',
    bullets: [
      'Built and deployed web apps with React, Node.js, and databases.',
      'Developed APIs, authentication flows, and responsive UIs.',
      'Delivered scalable solutions on cloud platforms.',
    ],
  },
  {
    id: 'eskalate',
    role: 'Front-end engineering intern',
    company: 'Eskalate.io',
    category: 'professional',
    companyUrl: 'https://eskalate.io/',
    period: 'Jun 2024 — Sep 2024',
    location: 'Addis Ababa, Ethiopia',
    bullets: [
      'Built a banking dashboard (Bank Dash) with Next.js, OAuth, and Redux for auth and state.',
      'Cut authentication-related errors by about 25% by tightening OAuth implementation.',
      'Worked in Agile rituals that improved collaboration and delivery pace (~20%).',
    ],
  },
  {
    id: 'aau',
    role: 'BSc, Biomedical engineering',
    company: 'Addis Ababa University',
    category: 'education',
    companyUrl: 'https://www.aau.edu.et/',
    period: '2022 — 2026',
    bullets: [
      'BSc in biomedical engineering — medical devices, instrumentation, and quantitative methods for health technology',
      'Biomedical instrumentation and biosensors',
      'Signal processing and data acquisition',
      'Biomechanics and human physiology for engineers',
      'Medical device design and applied engineering labs',
    ],
  },
  {
    id: 'alx-pro-backend',
    role: 'Pro Backend Dev · Software Engineering (completed)',
    company: 'ALX Africa',
    category: 'education',
    companyUrl: 'https://www.alx.africa/',
    period: 'Completed',
    summary:
      'Completed ALX Africa’s Pro Backend Dev software engineering program—backend APIs, databases, system design, and production-ready delivery.',
  },
  {
    id: 'a2sv',
    role: 'Software engineering trainee',
    company: 'A2SV (Africa to Silicon Valley)',
    category: 'education',
    companyUrl: 'https://a2sv.org/',
    period: 'Feb 2024 — Nov 2024',
    summary:
      'Intensive training in data structures & algorithms, system design, and collaborative engineering with industry-style code review.',
  },
]

export const heroIntro = {
  greeting: 'Hello, I\'m',
} as const

export const heroTech = ['TypeScript', 'Python', 'Node.js', 'GraphQL', 'React', 'Vue.js'] as const

export const devProfile = {
  path: 'dev/profile.runtime.ts',
  tab: 'profile.runtime.ts',
  branch: 'main',
  version: '1.0.0',
  lang: 'typescript',
  status: 'online',
  statusLabel: 'open_to_remote_roles',
  build: '2026.05.22',
  fields: [
    { key: 'role', value: 'software_developer' },
    { key: 'location', value: 'addis_ababa_ethiopia' },
    { key: 'focus', values: ['apis', 'backend', 'web_ui', 'system_design'] },
    { key: 'stack', values: ['typescript', 'python', 'node.js', 'react', 'next.js', 'vue'] },
    { key: 'education', value: 'bsc_biomedical_engineering' },
    { key: 'training', values: ['alx_pro_backend', 'a2sv'] },
    { key: 'experience', value: '3_years_industry' },
    { key: 'status', value: 'open_to_remote_roles', highlight: true },
  ],
} as const
