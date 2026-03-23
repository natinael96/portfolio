<template>
  <section
    id="hero"
    class="min-h-[100dvh] flex items-center section-x pt-24 pb-16 sm:pb-24"
  >
    <div class="w-full max-w-7xl mx-auto">
      <div
        class="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-16 xl:gap-24"
      >
        <div class="flex-shrink-0 lg:w-[42%] flex justify-center lg:justify-start" v-motion-slide-right>
          <div class="relative">
            <div
              class="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-foreground/[0.07] to-transparent blur-2xl opacity-80"
            />
            <div
              class="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-[2rem] bg-[oklch(0.99_0.01_90/0.85)] border border-foreground/[0.08] shadow-[0_20px_50px_-20px_oklch(0.25_0.02_55/0.2)] flex items-center justify-center"
            >
              <User :size="72" class="text-foreground/35" stroke-width="1.25" />
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left lg:pb-2">
          <p
            class="text-sm font-medium tracking-[0.12em] uppercase text-foreground-light mb-4"
            v-motion-fade
          >
            Backend & full-stack
          </p>
          <h1
            class="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-light text-foreground tracking-tight text-balance mb-6"
            v-motion-slide-top
          >
            Natinael M.
          </h1>

          <p
            class="text-lg sm:text-xl text-foreground-light max-w-xl leading-relaxed mb-10"
            v-motion-slide-bottom
          >
            Backend engineer and React developer building scalable APIs, services, and interfaces that stay maintainable as they grow.
          </p>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-12"
            v-motion-fade
          >
            <button
              type="button"
              class="px-7 py-3 bg-foreground text-[oklch(0.99_0.01_90)] rounded-lg font-medium shadow-sm transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-foreground/92 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              @click="scrollTo('projects')"
            >
              View work
            </button>
            <button
              type="button"
              class="px-7 py-3 border border-foreground/15 text-foreground rounded-lg font-medium transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/30 hover:bg-foreground/[0.03] hover:-translate-y-0.5 active:translate-y-0"
              @click="scrollTo('contact')"
            >
              Get in touch
            </button>
          </div>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5"
            v-motion-fade
          >
            <span
              v-for="tech in techStack"
              :key="tech"
              class="px-3.5 py-1.5 text-sm text-foreground-light font-medium rounded-full border border-foreground/[0.1] bg-[oklch(0.99_0.008_90/0.6)] transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-foreground/25"
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
