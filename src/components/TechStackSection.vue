<template>
  <section id="tech" class="py-24 px-6 sm:px-8 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl sm:text-5xl font-light text-foreground mb-4 text-center">
        Tech Stack
      </h2>
      <p class="text-foreground-light text-center mb-16 max-w-2xl mx-auto">
        Technologies and tools I work with to build robust applications.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(category, index) in techCategories"
          :key="category.name"
          class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:border-foreground/20 transition-all duration-300"
          v-motion-slide-visible-once-bottom
          :delay="index * 100"
        >
          <h3 class="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <component :is="category.icon" :size="20" />
            {{ category.name }}
          </h3>
          <div class="space-y-3">
            <div
              v-for="tech in category.items"
              :key="tech"
              class="flex items-center gap-3 text-foreground-light hover:text-foreground transition-colors"
            >
              <TechIcon :name="tech" :size="20" class="flex-shrink-0" />
              <span class="text-sm font-medium">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Server, Code, Database, Settings } from 'lucide-vue-next'
import TechIcon from './TechIcon.vue'

interface TechCategory {
  name: string
  icon: any
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

