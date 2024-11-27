<template>
  <section id="hero" class="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-16">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
        <!-- Photo Section -->
        <div
          class="flex-shrink-0"
          v-motion-slide-right
        >
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-foreground/20 to-foreground/5 rounded-full blur-2xl transform scale-110"></div>
            <div class="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-white/80 border-4 border-white/80 shadow-2xl flex items-center justify-center">
              <User :size="80" class="text-foreground/40" />
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="flex-1 text-center lg:text-left max-w-2xl">
          <h1
            class="text-5xl sm:text-6xl lg:text-7xl font-light text-foreground mb-6 tracking-tight"
            v-motion-slide-top
          >
            Natinael M.
          </h1>
          
          <p
            class="text-lg sm:text-xl text-foreground-light mb-8 leading-relaxed"
            v-motion-slide-bottom
          >
            Backend Engineer & React Developer
            <br />
            Crafting scalable backend systems and elegant frontend experiences.
            Building robust APIs, microservices, and modern web applications.
          </p>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            v-motion-fade
          >
            <button
              class="px-8 py-3 bg-foreground text-white rounded-lg font-medium hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              @click="scrollTo('projects')"
            >
              View Work
            </button>
            <button
              class="px-8 py-3 border-2 border-foreground/20 text-foreground rounded-lg font-medium hover:border-foreground/40 transition-all duration-300 hover:shadow-md"
              @click="scrollTo('contact')"
            >
              Get in Touch
            </button>
          </div>

          <!-- Tech badges -->
          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            v-motion-fade
          >
            <span
              v-for="tech in techStack"
              :key="tech"
              class="px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full text-sm text-foreground-light font-medium hover:border-foreground/30 transition-all duration-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { User } from 'lucide-vue-next'

const techStack = ['Node.js', 'NestJS', 'Python', 'React', 'Next.js', 'TypeScript']

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

