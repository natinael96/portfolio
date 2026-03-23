/**
 * Site copy and links — sourced from resume (FlowCV PDF) + public GitHub.
 */

export const site = {
  name: 'Natinael Mequanent Shebabaw',
  roleLabel: 'Full-stack software engineer',
  bio: 'I build APIs, backends, and web UIs with TypeScript, Python, and Node—plus React, Next.js, or Vue. Based in Addis Ababa, Ethiopia. Full-stack experience at Amplitude Ventures and XyberLabs; front-end engineering internship at Eskalate.io; A2SV alumnus; biomedical engineering student at Addis Ababa University.',
  email: 'natinael.96@gmail.com',
  meta: {
    title: 'Natinael Mequanent Shebabaw · Full-stack engineer',
    description:
      'Full-stack engineer in Addis Ababa. Amplitude Ventures, XyberLabs, Eskalate.io; A2SV alumnus; AAU biomedical engineering. TypeScript, Python, Node.js, React, Next.js, Vue.',
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
}

const projectsUnordered: Project[] = [
  {
    id: 'air-qua',
    title: 'Air Qua',
    description:
      'Air quality monitoring for Addis Ababa: real-time map, stations, and dashboard. Live demo on Vercel; API and web repos on GitHub.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    githubRepos: [
      { label: 'API', href: 'https://github.com/natinael96/air-qua-monitor-back' },
      { label: 'Web', href: 'https://github.com/natinael96/air-qua-monitor-front' },
    ],
    demo: 'https://air-qua-monitor-front.vercel.app',
  },
  {
    id: 'nexus',
    title: 'ALX Project Nexus',
    description:
      'Full-stack product work across a dedicated API/backend repo and a separate frontend app—end-to-end features, integration, and delivery.',
    tech: ['Node.js', 'TypeScript', 'React', 'GraphQL'],
    github: 'https://github.com/natinael96/alx-project-nexus',
  },
  {
    id: 'graphql-crm',
    title: 'GraphQL CRM backend',
    description:
      'Backend specialization project focused on GraphQL APIs and CRM-style domains (ALX backend track).',
    tech: ['Python', 'GraphQL', 'PostgreSQL'],
    github: 'https://github.com/natinael96/alx-backend-graphql_crm',
  },
  {
    id: 'travel',
    title: 'Travel application (ALX)',
    description:
      'Multi-milestone travel-app backend and services from the ALX backend curriculum.',
    tech: ['Python', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/natinael96/alx_travel_app_0x03',
  },
  {
    id: 'security',
    title: 'Backend security',
    description:
      'Security-focused backend exercises: hardening patterns, safe defaults, and defensive design.',
    tech: ['Python', 'Node.js', 'Docker'],
    github: 'https://github.com/natinael96/alx-backend-security',
  },
  {
    id: 'listings-cache',
    title: 'Cached property listings API',
    description:
      'Performance-oriented API work with caching for listing-heavy workloads (ALX backend).',
    tech: ['Python', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/natinael96/alx-backend-caching_property_listings',
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
    role: 'Full-stack developer',
    company: 'Amplitude Ventures',
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
    role: 'Full-stack developer',
    company: 'XyberLabs',
    companyUrl: 'https://xyberlabs.et/',
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
    id: 'a2sv',
    role: 'Software engineering trainee',
    company: 'A2SV (Africa to Silicon Valley)',
    companyUrl: 'https://a2sv.org/',
    period: 'Feb 2024 — Nov 2024',
    summary:
      'Intensive training in data structures & algorithms, system design, and collaborative engineering with industry-style code review.',
  },
  {
    id: 'aau',
    role: 'BSc, Biomedical engineering (in progress)',
    company: 'Addis Ababa University',
    companyUrl: 'https://www.aau.edu.et/',
    period: '2022 — Present',
    summary:
      'Undergraduate biomedical engineering—engineering and life-science fundamentals, instrumentation, and quantitative methods; software and product work through A2SV and industry roles.',
  },
]

export const heroTech = ['TypeScript', 'Python', 'Node.js', 'GraphQL', 'React', 'Vue.js'] as const
