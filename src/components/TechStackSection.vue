<template>
  <section id="tech" class="section-y section-x">
    <div class="max-w-[90rem] mx-auto">
      <header
        class="mb-12 sm:mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12"
      >
        <div class="max-w-xl" v-motion="motionVisibleOnceUp(0)">
          <p class="font-mono text-xs font-medium tracking-[0.16em] uppercase text-accent/80 mb-3">
            Toolkit
          </p>
          <h2 class="font-display text-4xl sm:text-5xl font-medium text-foreground mb-4 tracking-tight">
            Tech stack
          </h2>
        </div>
        <p
          class="text-foreground-light text-base sm:text-lg leading-relaxed max-w-md lg:max-w-sm lg:text-right lg:pb-1"
        >
          Production-style work—not exhaustive, but what I actually reach for.
        </p>
      </header>

      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 lg:items-start"
      >
        <div class="flex flex-col gap-6 lg:gap-7 min-w-0">
          <div
            v-for="(category, index) in leftColumn"
            :key="category.name"
            class="flex flex-col border border-accent/10 rounded-2xl p-6 sm:p-7 bg-accent-fg/70 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/20 hover:bg-accent-fg/85 motion-safe:hover:-translate-y-1"
            v-motion="motionVisibleOnceUp(index * 160)"
            :class="index === 0 ? 'lg:rounded-3xl' : ''"
          >
            <h3 class="text-base font-semibold text-foreground mb-5 flex items-center gap-2.5">
              <component :is="category.icon" :size="20" class="text-accent" stroke-width="2" />
              {{ category.name }}
            </h3>
            <ul class="space-y-3 flex-1">
              <li
                v-for="tech in category.items"
                :key="tech"
                class="flex items-center gap-3 text-foreground-light hover:text-foreground transition-colors duration-200"
              >
                <TechIcon :name="tech" :size="20" class="flex-shrink-0 opacity-75" />
                <span class="text-sm font-medium">{{ tech }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="flex flex-col gap-6 lg:gap-7 min-w-0 lg:mt-12 xl:mt-[4.5rem]"
        >
          <div
            v-for="(category, index) in rightColumn"
            :key="category.name"
            class="flex flex-col border border-accent/10 rounded-2xl p-6 sm:p-7 bg-accent-fg/70 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/20 hover:bg-accent-fg/85 motion-safe:hover:-translate-y-1"
            v-motion="motionVisibleOnceUp((index + 2) * 160)"
            :class="index === 1 ? 'lg:rounded-3xl' : ''"
          >
            <h3 class="text-base font-semibold text-foreground mb-5 flex items-center gap-2.5">
              <component :is="category.icon" :size="20" class="text-accent" stroke-width="2" />
              {{ category.name }}
            </h3>
            <ul class="space-y-3 flex-1">
              <li
                v-for="tech in category.items"
                :key="tech"
                class="flex items-center gap-3 text-foreground-light hover:text-foreground transition-colors duration-200"
              >
                <TechIcon :name="tech" :size="20" class="flex-shrink-0 opacity-75" />
                <span class="text-sm font-medium">{{ tech }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
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

const leftColumn: TechCategory[] = [backend, database]
const rightColumn: TechCategory[] = [frontend, devops]
</script>
