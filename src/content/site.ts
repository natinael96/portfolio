/**
 * Site copy and links — edit here to update the portfolio.
 * Leave social URLs empty until you add your real profiles (links stay hidden).
 */

export const site = {
  name: 'Natinael M.',
  roleLabel: 'Backend & full-stack engineer',
  /** One or two sentences under your name */
  bio: 'I design and ship APIs, background services, and the web UIs that sit on top of them—mostly with Node, Python, and TypeScript, plus React or Vue when the product calls for it. I care about observability, sensible boundaries, and code the next person can actually change.',
  email: 'natinael.96@gmail.com',
  meta: {
    title: 'Natinael M. · Backend & full-stack engineer',
    description:
      'Backend and full-stack engineer building APIs, distributed services, and modern web apps with Node.js, Python, TypeScript, React, and Vue.',
  },
  /** Set to full URLs when ready; empty string hides the row */
  social: {
    github: '',
    linkedin: '',
    twitter: '',
  },
} as const

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'API platform behind multiple products',
    description:
      'Shared gateway, authentication, and request tracing across NestJS services. Standardized errors, versioning, and OpenAPI so web and mobile clients stay in sync with minimal back-and-forth.',
    tech: ['Node.js', 'NestJS', 'Docker', 'Kubernetes'],
  },
  {
    id: '2',
    title: 'Operations & commerce web app',
    description:
      'Full-stack app for internal teams: role-based admin, inventory and order flows, and payment hooks. Next.js and Node with PostgreSQL; focus on predictable transactions and audit-friendly logs.',
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    id: '3',
    title: 'High-throughput public API',
    description:
      'Python service with strict latency goals: Redis-backed rate limits, structured logging, and auto-generated docs. PostgreSQL as source of truth with migrations and health checks wired for k8s.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
  },
  {
    id: '4',
    title: 'Live operations dashboard',
    description:
      'React dashboard fed by WebSocket streams and REST fallbacks—alerts, filters, and role-aware views so on-call can see state without digging through logs.',
    tech: ['React', 'TypeScript', 'WebSocket', 'Chart.js'],
  },
  {
    id: '5',
    title: 'Cloud delivery & environments',
    description:
      'Terraform modules and CI pipelines for repeatable deploys: staged rollouts, secrets handling, and basic cost guardrails. Docker images built in GitHub Actions and promoted through environments.',
    tech: ['AWS', 'Terraform', 'GitHub Actions', 'Docker'],
  },
  {
    id: '6',
    title: 'Centralized authentication service',
    description:
      'JWT issuance, refresh rotation, and OAuth2 provider integration with optional MFA. Clear separation between resource servers and the auth boundary; MongoDB for session and token metadata where it fit.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
]

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
}

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Senior Backend Engineer',
    company: 'B2B SaaS · platform team',
    period: '2022 — Present',
    description:
      'Owning services around core APIs: performance tuning, incident response, and design reviews. Introduced patterns for tracing and idempotent jobs; mentored mid-level engineers on NestJS and Postgres.',
  },
  {
    id: '2',
    role: 'Full-Stack Developer',
    company: 'Product company · growth stage',
    period: '2020 — 2022',
    description:
      'Shipped end-to-end features from schema changes to React screens. Owned pieces of CI/CD, staging parity, and on-call rotation so releases stayed boring in a good way.',
  },
  {
    id: '3',
    role: 'Backend Developer',
    company: 'Agency & product builds',
    period: '2018 — 2020',
    description:
      'REST integrations, third-party webhooks, and PostgreSQL modeling for client projects. Left handover docs and runbooks so maintainers were not starting from zero.',
  },
]

export const heroTech = ['Node.js', 'NestJS', 'Python', 'Vue', 'React', 'TypeScript'] as const
