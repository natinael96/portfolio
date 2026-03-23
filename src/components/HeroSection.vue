<template>
  <section
    id="hero"
    class="min-h-[100dvh] flex items-center section-x pt-24 pb-12 sm:pb-20"
  >
    <div class="w-full max-w-[90rem] mx-auto">
      <div
        class="grid grid-cols-1 xl:grid-cols-[minmax(3.5rem,6.5rem)_minmax(0,1fr)_minmax(0,12rem)] gap-10 lg:gap-12 xl:gap-0 xl:items-end"
      >
        <!-- Left rail: editorial year (xl+) -->
        <div
          class="hidden xl:flex flex-col justify-end pb-2 pr-6 border-r border-accent/15 min-h-[10rem]"
          aria-hidden="true"
        >
          <span
            class="font-display text-[clamp(2.75rem,4.5vw,4.25rem)] font-light leading-none text-accent/20 select-none tabular-nums"
          >
            {{ yearLabel }}
          </span>
        </div>

        <div
          class="flex flex-col items-center lg:items-start text-center lg:text-left xl:px-8 xl:pb-2 xl:border-r border-transparent xl:border-accent/10 max-w-4xl xl:max-w-none"
        >
          <div
            class="flex items-center gap-3 mb-5 w-full justify-center lg:justify-start"
            v-motion-fade
          >
            <span class="h-px w-8 sm:w-12 bg-accent/35 shrink-0" aria-hidden="true" />
            <p class="text-sm font-semibold tracking-[0.12em] uppercase text-accent">
              {{ site.roleLabel }}
            </p>
          </div>
          <h1
            class="font-display text-[clamp(2.35rem,5.5vw,4rem)] font-light text-foreground tracking-tight text-balance mb-6 max-w-[22ch] lg:max-w-[20ch] xl:max-w-none"
            v-motion-slide-top
          >
            {{ site.name }}
          </h1>

          <p
            class="text-lg sm:text-xl text-foreground-light max-w-xl leading-relaxed mb-10 lg:mb-12"
            v-motion-slide-bottom
          >
            {{ site.bio }}
          </p>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10"
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
            class="flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-2.5 max-w-xl lg:max-w-2xl"
            v-motion-fade
          >
            <span
              v-for="(tech, i) in heroTech"
              :key="tech"
              class="select-none rounded-md border border-accent/12 bg-accent-subtle/60 px-3 py-1.5 text-sm font-medium text-foreground-light"
              :class="i % 3 === 1 ? 'lg:translate-y-1' : ''"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Right column: breathing room + micro-label (xl) -->
        <div
          class="hidden xl:flex flex-col justify-end items-start pl-6 pb-3 text-left"
        >
          <p
            class="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-foreground-light/65 max-w-[11rem] leading-relaxed"
          >
            Addis Ababa · Full-stack · Open to remote
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { heroTech, site } from '../content/site'

const yearLabel = computed(() => String(new Date().getFullYear()))

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
