<template>
  <section id="projects" class="section-y section-x">
    <div class="max-w-3xl mx-auto lg:max-w-[90rem]">
      <header class="mb-6 sm:mb-7 lg:mb-8 max-w-2xl" v-motion="motionVisibleOnceUp(0)">
        <p class="font-mono text-xs font-medium tracking-[0.16em] uppercase text-accent/80 mb-2">
          Selected work
        </p>
        <h2 class="font-display text-3xl sm:text-4xl font-medium text-foreground mb-2 tracking-tight">
          Projects
        </h2>
        <p class="font-mono text-sm sm:text-[0.9375rem] text-foreground-light leading-relaxed">
          <span class="text-accent/70">$</span> ls ~/portfolio/projects
          <span class="text-foreground-light ml-2 opacity-60">· {{ projects.length }} repos</span>
        </p>
      </header>

      <div class="proj-list">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          :ref="(el) => setProjectRef(el, index)"
          class="proj-entry"
          :class="{ 'animate-fade-in-up': visibleProjects[index] }"
          :style="{
            transitionDelay: visibleProjects[index] ? `${index * 120}ms` : '0ms',
          }"
        >
          <div class="proj-entry-meta">
            <span class="proj-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="proj-path">projects/{{ project.id }}.ts</span>
            <span v-if="index === 0" class="proj-tag">featured</span>
            <span v-if="project.demo || project.status === 'live'" class="proj-tag proj-tag--live">
              live
            </span>
          </div>

          <h3 class="proj-title">{{ project.title }}</h3>

          <p class="proj-desc">{{ project.description }}</p>

          <p class="proj-stack" aria-label="Technologies">
            <span class="proj-stack-label">stack:</span>
            {{ project.tech.join(' · ') }}
          </p>

          <div v-if="projectLinks(project).length" class="proj-links">
            <a
              v-for="link in projectLinks(project)"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="proj-link"
              :class="{ 'proj-link--primary': link.primary }"
            >
              <component :is="link.icon" :size="15" stroke-width="2" aria-hidden="true" />
              {{ link.label }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Component } from 'vue'
import { Github, ExternalLink } from 'lucide-vue-next'

import { projects, type Project } from '../content/site'
import { motionVisibleOnceUp } from '../motion'

interface ProjectLink {
  label: string
  href: string
  icon: Component
  primary?: boolean
}

function projectLinks(project: Project): ProjectLink[] {
  const links: ProjectLink[] = []

  if (project.demo) {
    links.push({
      label: 'demo →',
      href: project.demo,
      icon: ExternalLink,
      primary: true,
    })
  }

  if (project.githubRepos?.length) {
    for (const repo of project.githubRepos) {
      links.push({ label: `${repo.label.toLowerCase()} →`, href: repo.href, icon: Github })
    }
  } else if (project.github) {
    links.push({ label: 'code →', href: project.github, icon: Github })
  }

  return links
}

const projectRefs = ref<(HTMLElement | null)[]>([])
const visibleProjects = ref<boolean[]>(projects.map(() => false))

let observer: IntersectionObserver | null = null

function setProjectRef(el: unknown, index: number) {
  projectRefs.value[index] = el instanceof HTMLElement ? el : null
}

const observeProjects = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.value.findIndex((r) => r === entry.target)
          if (index !== -1) {
            visibleProjects.value[index] = true
            observer?.unobserve(entry.target)
          }
        }
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    }
  )

  projectRefs.value.forEach((r) => {
    if (r) observer?.observe(r)
  })
}

onMounted(() => {
  requestAnimationFrame(() => observeProjects())
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>
