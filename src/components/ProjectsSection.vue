<template>
  <section id="projects" class="section-y section-x">
    <div class="max-w-7xl mx-auto">
      <header class="mb-12 sm:mb-16 max-w-3xl">
        <h2 class="font-display text-4xl sm:text-5xl font-light text-foreground mb-4 tracking-tight">
          Featured projects
        </h2>
        <p class="text-foreground-light text-lg leading-relaxed max-w-2xl">
          Representative work across APIs, data layers, and UIs—framed the way I’d explain it in a technical interview.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          :ref="(el) => setProjectRef(el, index)"
          class="group flex flex-col border border-foreground/[0.09] rounded-2xl p-7 sm:p-8 bg-accent-fg/55 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/50 hover:shadow-[0_24px_48px_-28px_oklch(0.36_0.16_168/0.28)] hover:-translate-y-0.5"
          :class="[
            projectColClass(index),
            { 'animate-fade-in-up': visibleProjects[index] },
          ]"
          :style="{ transitionDelay: visibleProjects[index] ? `${index * 80}ms` : '0ms' }"
        >
          <div class="mb-5 flex-1">
            <h3 class="text-xl font-semibold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors">
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

          <div class="mt-auto flex flex-wrap items-center gap-6 pt-2 border-t border-foreground/[0.06]">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              <Github :size="16" stroke-width="2" aria-hidden="true" />
              Code
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
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Github, ExternalLink } from 'lucide-vue-next'

import { projects } from '../content/site'

const projectRefs = ref<(HTMLElement | null)[]>([])
const visibleProjects = ref<boolean[]>(projects.map(() => false))

let observer: IntersectionObserver | null = null

function setProjectRef(el: unknown, index: number) {
  projectRefs.value[index] = el instanceof HTMLElement ? el : null
}

function projectColClass(index: number): string {
  const map: Record<number, string> = {
    0: 'lg:col-span-7',
    1: 'lg:col-span-5',
    2: 'lg:col-span-5',
    3: 'lg:col-span-7',
    4: 'lg:col-span-6',
    5: 'lg:col-span-6',
  }
  return map[index] ?? 'lg:col-span-6'
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
