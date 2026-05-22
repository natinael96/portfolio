<template>
  <section id="projects" class="section-y-loose section-x">
    <div class="max-w-[90rem] mx-auto">
      <header
        class="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-8 lg:gap-12"
      >
        <div class="max-w-xl" v-motion="motionVisibleOnceUp(0)">
          <p class="font-mono text-xs font-medium tracking-[0.16em] uppercase text-accent/80 mb-3">
            Selected work
          </p>
          <h2 class="font-display text-4xl sm:text-5xl font-medium text-foreground mb-3 tracking-tight">
            Featured projects
          </h2>
          <p class="text-foreground-light text-base sm:text-lg leading-relaxed">
            APIs, data layers, and UIs—how I’d walk through them in a technical interview.
          </p>
        </div>

        <aside
          class="project-workspace lg:max-w-md xl:max-w-lg w-full shrink-0"
          aria-label="Project workspace"
          v-motion="motionVisibleOnceUp(160)"
        >
          <div class="project-workspace-topbar">
            <div class="dev-panel-head mb-0">
              <span class="dev-dot dev-dot--close" aria-hidden="true" />
              <span class="dev-dot dev-dot--min" aria-hidden="true" />
              <span class="dev-dot dev-dot--max" aria-hidden="true" />
            </div>
            <span class="project-workspace-path">~/portfolio/projects</span>
          </div>

          <div class="project-workspace-body">
            <p class="project-workspace-cmd">
              <span class="project-workspace-prompt">$</span>
              ls ~/portfolio/projects
            </p>

            <ul class="project-workspace-graph">
              <li
                v-for="(project, index) in projects"
                :key="project.id"
                class="project-workspace-graph-row"
              >
                <span class="project-workspace-graph-line" aria-hidden="true">
                  {{ index === projects.length - 1 ? '└─' : '├─' }}
                </span>
                <span class="project-workspace-id">{{ project.id }}</span>
                <span
                  v-if="project.status === 'live'"
                  class="project-workspace-tag project-workspace-tag--live"
                >
                  live
                </span>
              </li>
            </ul>

            <div class="project-workspace-stats">
              <span>{{ projects.length }} repos</span>
              <span>{{ liveProjectCount }} deployed</span>
            </div>
          </div>
        </aside>
      </header>

      <!-- Featured (first project with demo) -->
      <article
        v-if="featuredProject"
        :ref="(el) => setProjectRef(el, 0)"
        class="project-card project-card--featured"
        :class="{ 'animate-fade-in-up': visibleProjects[0] }"
        :style="{ transitionDelay: visibleProjects[0] ? '0ms' : '0ms' }"
      >
        <div class="project-card-accent-bar" aria-hidden="true" />

        <div
          class="relative flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 xl:gap-16"
        >
          <div class="min-w-0">
            <div class="project-terminal-head mb-6">
              <div class="dev-panel-head mb-0">
                <span class="dev-dot" aria-hidden="true" />
                <span class="dev-dot" aria-hidden="true" />
                <span class="dev-dot" aria-hidden="true" />
              </div>
              <span class="project-terminal-label">{{ `projects/${featuredProject.id}.ts` }}</span>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 mb-5">
              <span class="project-badge">Featured</span>
              <span v-if="featuredProject.demo" class="project-badge project-badge--live">
                Live demo
              </span>
            </div>

            <h3
              class="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-medium text-foreground tracking-tight mb-4"
            >
              {{ featuredProject.title }}
            </h3>

            <p class="text-base text-foreground-light leading-relaxed max-w-2xl mb-6">
              {{ featuredProject.description }}
            </p>

            <ul class="flex flex-wrap gap-2" aria-label="Technologies">
              <li v-for="tech in featuredProject.tech" :key="tech">
                <span class="project-chip">{{ tech }}</span>
              </li>
            </ul>
          </div>

          <div
            class="mt-8 lg:mt-0 flex flex-col gap-4 lg:items-stretch lg:justify-center lg:min-w-[14rem] xl:min-w-[16rem] pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-foreground/[0.08] lg:pl-10 xl:pl-12"
          >
            <a
              v-if="featuredProject.demo"
              :href="featuredProject.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary w-full sm:w-auto xl:w-full justify-center"
            >
              <ExternalLink :size="18" stroke-width="2" aria-hidden="true" />
              View live demo
            </a>

            <div v-if="projectCodeLinks(featuredProject).length" class="flex flex-col gap-2">
              <a
                v-for="link in projectCodeLinks(featuredProject)"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link-row"
              >
                <Github :size="18" stroke-width="2" aria-hidden="true" />
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- Rest of projects -->
      <div
        v-if="otherProjects.length > 0"
        class="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5"
      >
        <article
          v-for="(project, i) in otherProjects"
          :key="project.id"
          :ref="(el) => setProjectRef(el, i + 1)"
          class="project-card group"
          :class="{ 'animate-fade-in-up': visibleProjects[i + 1] }"
          :style="{
            transitionDelay: visibleProjects[i + 1] ? `${(i + 1) * 130}ms` : '0ms',
          }"
        >
          <div class="project-terminal-head mb-4">
            <div class="dev-panel-head mb-0">
              <span class="dev-dot" aria-hidden="true" />
              <span class="dev-dot" aria-hidden="true" />
              <span class="dev-dot" aria-hidden="true" />
            </div>
            <span class="project-terminal-label">{{ `projects/${project.id}.ts` }}</span>
          </div>

          <h3
            class="font-display text-lg sm:text-xl font-medium text-foreground tracking-tight mb-2 group-hover:text-accent transition-colors"
          >
            {{ project.title }}
          </h3>

          <p class="text-sm text-foreground-light leading-relaxed mb-5 flex-1">
            {{ project.description }}
          </p>

          <ul class="flex flex-wrap gap-1.5 mb-5" aria-label="Technologies">
            <li v-for="tech in project.tech" :key="tech">
              <span class="project-chip project-chip--sm">{{ tech }}</span>
            </li>
          </ul>

          <div class="mt-auto flex flex-wrap items-center gap-3 pt-5 border-t border-foreground/[0.06]">
            <a
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link-row project-link-row--primary"
            >
              <ExternalLink :size="16" stroke-width="2" aria-hidden="true" />
              Demo
            </a>
            <a
              v-for="link in projectCodeLinks(project)"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link-row"
            >
              <Github :size="16" stroke-width="2" aria-hidden="true" />
              {{ link.label }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { Github, ExternalLink } from 'lucide-vue-next'

import { projects, type Project } from '../content/site'
import { motionVisibleOnceUp } from '../motion'

const featuredProject = computed(() => projects[0] ?? null)
const otherProjects = computed(() => projects.slice(1))

const liveProjectCount = computed(
  () => projects.filter((project) => project.status === 'live' || project.demo).length
)

function projectCodeLinks(project: Project): { label: string; href: string }[] {
  if (project.githubRepos?.length) return project.githubRepos
  if (project.github) return [{ label: 'Code', href: project.github }]
  return []
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
