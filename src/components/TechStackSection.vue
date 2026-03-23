<template>
  <section id="tech" class="section-y section-x">
    <div class="max-w-7xl mx-auto">
      <header class="mb-12 sm:mb-16 max-w-3xl">
        <h2 class="font-display text-4xl sm:text-5xl font-light text-foreground mb-4 tracking-tight">
          Tech stack
        </h2>
        <p class="text-foreground-light text-lg leading-relaxed max-w-2xl">
          Tools I reach for most often—grouped by how I think about the stack.
        </p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
        <div
          v-for="(category, index) in techCategories"
          :key="category.name"
          class="flex flex-col border border-foreground/[0.09] rounded-2xl p-7 bg-[oklch(0.99_0.008_90/0.45)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/18 hover:shadow-[0_20px_40px_-24px_oklch(0.25_0.02_55/0.15)]"
          v-motion-slide-visible-once-bottom
          :delay="index * 90"
        >
          <h3 class="text-base font-semibold text-foreground mb-6 flex items-center gap-2.5">
            <component :is="category.icon" :size="20" class="text-foreground/55" stroke-width="2" />
            {{ category.name }}
          </h3>
          <ul class="space-y-3 flex-1">
            <li
              v-for="tech in category.items"
              :key="tech"
              class="flex items-center gap-3 text-foreground-light hover:text-foreground transition-colors duration-200"
            >
              <TechIcon :name="tech" :size="20" class="flex-shrink-0 opacity-90" />
              <span class="text-sm font-medium">{{ tech }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { Server, Code, Database, Settings } from 'lucide-vue-next'
import TechIcon from './TechIcon.vue'

interface TechCategory {
  name: string
  icon: Component
  items: string[]
}

const techCategories: TechCategory[] = [
  {
    name: 'Backend',
    icon: Server,
    items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'Express', 'GraphQL'],
  },
  {
    name: 'Frontend',
    icon: Code,
    items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Database',
    icon: Database,
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch'],
  },
  {
    name: 'DevOps',
    icon: Settings,
    items: ['Docker', 'Kubernetes', 'AWS S3', 'AWS CodePipeline', 'GitHub Actions', 'Terraform'],
  },
]
</script>
