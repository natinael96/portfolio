<template>
  <section id="tech" class="section-y section-x">
    <div class="max-w-3xl mx-auto lg:max-w-[90rem]">
      <header
        class="mb-5 sm:mb-6 lg:mb-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6"
        v-motion="motionVisibleOnceUp(0)"
      >
        <div class="max-w-xl">
          <p class="font-mono text-xs font-medium tracking-[0.16em] uppercase text-accent/80 mb-2">
            Toolkit
          </p>
          <h2 class="font-display text-3xl sm:text-4xl font-medium text-foreground mb-1.5 tracking-tight">
            Tech stack
          </h2>
          <p class="font-mono text-sm text-foreground-light">
            <span class="text-accent/70">//</span> production tools — not exhaustive
          </p>
        </div>
        <p class="tech-manifest-count font-mono text-xs sm:text-right">
          {{ totalTools }} packages · {{ categories.length }} groups
        </p>
      </header>

      <div class="dev-panel dev-panel--runtime tech-panel" v-motion="motionVisibleOnceUp(120)">
        <div class="dev-panel-tabs" aria-hidden="true">
          <span class="dev-panel-tab dev-panel-tab--active">
            <span class="dev-panel-tab-dot" />
            manifest.json
          </span>
          <span class="dev-panel-tab dev-panel-tab--ghost">lockfile</span>
        </div>

        <div class="dev-panel-topbar">
          <div class="dev-panel-head mb-0">
            <span class="dev-dot dev-dot--close" aria-hidden="true" />
            <span class="dev-dot dev-dot--min" aria-hidden="true" />
            <span class="dev-dot dev-dot--max" aria-hidden="true" />
          </div>
          <span class="dev-panel-branch">deps</span>
          <span class="dev-panel-path">tech/manifest.json</span>
        </div>

        <div class="tech-manifest">
          <article
            v-for="(category, index) in categories"
            :key="category.name"
            class="tech-row"
            v-motion="motionVisibleOnceUp(180 + index * 80)"
          >
            <div class="tech-row-head">
              <span class="tech-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <component
                :is="category.icon"
                :size="15"
                class="tech-row-icon"
                stroke-width="2"
                aria-hidden="true"
              />
              <span class="tech-cat">{{ category.name }}</span>
            </div>

            <ul class="tech-chips" :aria-label="`${category.name} technologies`">
              <li v-for="tech in category.items" :key="tech" class="tech-chip">
                <TechIcon :name="tech" :size="14" class="tech-chip-icon" />
                <span class="tech-chip-label">{{ tech }}</span>
              </li>
            </ul>
          </article>
        </div>

        <div class="dev-panel-footer">
          <span class="dev-status-pill">
            <span class="dev-status-dot" aria-hidden="true" />
            resolved
          </span>
          <span class="dev-footer-meta">
            <span class="dev-footer-label">peer deps optional</span>
            <span class="dev-footer-build">lock {{ manifestLock }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { Server, Code, Database, Settings } from 'lucide-vue-next'
import TechIcon from './TechIcon.vue'
import { motionVisibleOnceUp } from '../motion'

interface TechCategory {
  name: string
  icon: Component
  items: string[]
}

const backend: TechCategory = {
  name: 'Backend',
  icon: Server,
  items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'Express', 'GraphQL'],
}
const frontend: TechCategory = {
  name: 'Frontend',
  icon: Code,
  items: ['Vue.js', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
}
const database: TechCategory = {
  name: 'Database',
  icon: Database,
  items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
}
const devops: TechCategory = {
  name: 'DevOps & CI',
  icon: Settings,
  items: ['Docker', 'GitHub Actions'],
}

const categories: TechCategory[] = [backend, frontend, database, devops]
const totalTools = computed(() => categories.reduce((sum, cat) => sum + cat.items.length, 0))
const manifestLock = '2026.05.22'
</script>
