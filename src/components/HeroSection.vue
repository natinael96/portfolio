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
              class="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/20 to-transparent blur-2xl opacity-90"
            />
            <div
              class="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-[2rem] bg-accent-fg/90 border border-accent/30 shadow-[0_22px_56px_-22px_oklch(0.36_0.16_168/0.45)] flex items-center justify-center"
            >
              <User :size="72" class="text-accent/40" stroke-width="1.25" />
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left lg:pb-2">
          <p
            class="text-sm font-semibold tracking-[0.12em] uppercase text-accent mb-4"
            v-motion-fade
          >
            {{ site.roleLabel }}
          </p>
          <h1
            class="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-light text-foreground tracking-tight text-balance mb-6"
            v-motion-slide-top
          >
            {{ site.name }}
          </h1>

          <p
            class="text-lg sm:text-xl text-foreground-light max-w-xl leading-relaxed mb-10"
            v-motion-slide-bottom
          >
            {{ site.bio }}
          </p>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-12"
            v-motion-fade
          >
            <button type="button" class="btn-primary" @click="scrollTo('projects')">
              View work
            </button>
            <button type="button" class="btn-secondary" @click="scrollTo('contact')">
              Get in touch
            </button>
          </div>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5"
            v-motion-fade
          >
            <span
              v-for="tech in heroTech"
              :key="tech"
              class="select-none rounded-full border border-accent/15 bg-accent-subtle/80 px-3.5 py-1.5 text-sm font-medium text-foreground-light"
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
import { heroTech, site } from '../content/site'

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
