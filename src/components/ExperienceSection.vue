<template>
  <section id="experience" class="py-24 px-6 sm:px-8 lg:px-12 bg-white/40">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl sm:text-5xl font-light text-foreground mb-4 text-center">
        Experience & Skills
      </h2>
      <p class="text-foreground-light text-center mb-16 max-w-2xl mx-auto">
        Years of building scalable systems and modern applications.
      </p>

      <!-- Timeline -->
      <div class="relative">
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200/50"></div>
        
        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="relative pl-20 pb-12 last:pb-0"
          v-motion-slide-visible-once-left
          :delay="index * 100"
        >
          <div class="absolute left-6 w-4 h-4 bg-foreground rounded-full border-4 border-white"></div>
          
          <div class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
              <h3 class="text-xl font-semibold text-foreground">
                {{ exp.role }}
              </h3>
              <span class="text-sm text-foreground-light font-medium">
                {{ exp.period }}
              </span>
            </div>
            <p class="text-foreground-light font-medium mb-3">
              {{ exp.company }}
            </p>
            <p class="text-foreground-light leading-relaxed">
              {{ exp.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
}

const experiences: Experience[] = [
  {
    id: '1',
    role: 'Senior Backend Engineer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading development of microservices architecture, optimizing API performance, and mentoring junior developers.',
  },
  {
    id: '2',
    role: 'Full-Stack Developer',
    company: 'Startup Inc.',
    period: '2020 - 2022',
    description: 'Built end-to-end features for web applications, implemented CI/CD pipelines, and improved system reliability.',
  },
  {
    id: '3',
    role: 'Backend Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: 'Developed RESTful APIs, integrated third-party services, and maintained database systems.',
  },
]
</script>

