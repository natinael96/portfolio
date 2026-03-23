<template>
  <section id="projects" class="section-y-loose section-x">
    <div class="max-w-[90rem] mx-auto">
      <header
        class="mb-14 sm:mb-20 lg:mb-24 max-w-2xl lg:max-w-none lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12 xl:gap-20 items-end"
      >
        <div>
          <p class="text-xs font-semibold tracking-[0.18em] uppercase text-accent/80 mb-3">
            Selected work
          </p>
          <h2 class="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-light text-foreground mb-4 tracking-tight">
            Featured projects
          </h2>
        </div>
        <p class="text-foreground-light text-base sm:text-lg leading-relaxed lg:text-right lg:pb-1">
          APIs, data layers, and UIs—how I’d walk through them in a technical interview.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6 lg:gap-7">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          :ref="(el) => setProjectRef(el, index)"
          class="group flex flex-col border border-foreground/[0.09] border-l-[6px] border-l-accent bg-accent-fg/55 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/40 hover:border-l-accent hover:shadow-[0_24px_48px_-28px_oklch(0.36_0.16_168/0.28)] hover:-translate-y-0.5"
          :class="[
            projectColClass(index),
            projectCardShape(index),
            { 'animate-fade-in-up': visibleProjects[index] },
          ]"
          :style="{ transitionDelay: visibleProjects[index] ? `${index * 80}ms` : '0ms' }"
        >
          <template v-if="index === 0">
            <div
              class="flex flex-col lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16 w-full"
            >
              <div class="flex-1 min-w-0 lg:pr-4">
                <h3
                  class="font-display text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-accent transition-colors"
                >
                  {{ project.title }}
                </h3>
                <p class="text-sm sm:text-base text-foreground-light leading-relaxed max-w-3xl">
                  {{ project.description }}
                </p>
              </div>
              <div
                class="flex flex-col justify-end gap-8 mt-8 lg:mt-0 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-foreground/[0.08] lg:pl-10 lg:w-[min(18rem,100%)] shrink-0"
              >
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="px-2.5 py-1 text-xs font-medium text-foreground rounded-md bg-accent-muted/45 border border-accent/10 group-hover:border-accent/25 transition-colors"
                  >
                    {{ tech }}
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-4 sm:gap-6">
                  <a
                    v-for="link in projectCodeLinks(project)"
                    :key="link.href"
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                  >
                    <Github :size="16" stroke-width="2" aria-hidden="true" />
                    {{ link.label }}
                  </a>
                  <a
                    v-if="project.demo"
                    :href="project.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                  >
                    <ExternalLink :size="16" stroke-width="2" />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="mb-5 flex-1">
              <h3
                class="font-display text-xl font-bold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors"
              >
                {{ project.title }}
              </h3>
              <p class="text-sm sm:text-[0.9375rem] text-foreground-light leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-2.5 py-1 text-xs font-medium text-foreground rounded-md bg-accent-muted/45 border border-accent/10 group-hover:border-accent/25 transition-colors"
              >
                {{ tech }}
              </span>
            </div>

            <div
              class="mt-auto flex flex-wrap items-center gap-4 sm:gap-6 pt-2 border-t border-foreground/[0.06]"
            >
              <a
                v-for="link in projectCodeLinks(project)"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link"
              >
                <Github :size="16" stroke-width="2" aria-hidden="true" />
                {{ link.label }}
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="project-link"
              >
                <ExternalLink :size="16" stroke-width="2" />
                Demo
              </a>
            </div>
          </template>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Github, ExternalLink } from 'lucide-vue-next'

import { projects, type Project } from '../content/site'

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

/** Bento-style spans: lead project full width; pairs stagger */
function projectColClass(index: number): string {
  const map: Record<number, string> = {
    0: 'lg:col-span-12',
    1: 'lg:col-span-5',
    2: 'lg:col-span-7',
    3: 'lg:col-span-7',
    4: 'lg:col-span-5',
    5: 'lg:col-span-12',
  }
  return map[index] ?? 'lg:col-span-6'
}

function projectCardShape(index: number): string {
  if (index === 0) {
    return 'rounded-2xl p-7 sm:p-8 lg:p-10'
  }
  if (index === 5) {
    return 'rounded-2xl p-7 sm:p-8 lg:rounded-3xl lg:p-9'
  }
  return 'rounded-2xl p-7 sm:p-8'
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
