<template>
  <section
    id="experience"
    class="section-y-tight section-x bg-accent-muted/35 border-y border-accent/12"
  >
    <div
      class="max-w-3xl mx-auto lg:max-w-[88rem] lg:mx-auto lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)] lg:gap-x-12 xl:gap-x-20 2xl:gap-x-28 items-start"
    >
      <header class="mb-14 lg:mb-0 lg:sticky lg:top-28 lg:pt-2 lg:pr-8 xl:pr-12">
        <p class="text-xs font-semibold tracking-[0.18em] uppercase text-accent/80 mb-3">
          Timeline
        </p>
        <h2 class="font-display text-4xl sm:text-5xl font-light text-foreground mb-5 tracking-tight">
          Experience
        </h2>
        <p class="text-foreground-light text-base sm:text-lg leading-relaxed max-w-sm xl:max-w-xs">
          Venture studios, product work, internships—then A2SV and university.
        </p>
      </header>

      <div class="relative pl-8 sm:pl-10 lg:pl-6">
        <div
          class="absolute left-[0.55rem] sm:left-[0.65rem] lg:left-[0.85rem] top-2 bottom-2 w-px bg-gradient-to-b from-accent/35 via-accent/15 to-transparent"
          aria-hidden="true"
        />

        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          :ref="(el) => setExpRef(el, index)"
          class="relative pb-12 sm:pb-16 last:pb-3 pl-6 sm:pl-8"
          :class="{ 'animate-fade-in-left': visibleExps[index] }"
          :style="{ transitionDelay: visibleExps[index] ? `${index * 90}ms` : '0ms' }"
        >
          <div
            class="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-[3px] border-accent-fg shadow-[0_0_0_1px_oklch(0.36_0.15_168/0.4)]"
            aria-hidden="true"
          />

          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <h3 class="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                {{ exp.role }}
              </h3>
              <span class="text-sm font-medium text-foreground-light tabular-nums shrink-0">
                {{ exp.period }}
              </span>
            </div>
            <p class="text-sm font-semibold text-foreground/80">
              <a
                v-if="exp.companyUrl"
                :href="exp.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="link-inline underline-offset-4 hover:text-accent hover:underline"
              >
                {{ exp.company }}
              </a>
              <template v-else>{{ exp.company }}</template>
            </p>
            <p
              v-if="exp.location"
              class="text-xs text-foreground-light/90 -mt-1"
            >
              {{ exp.location }}
            </p>
            <ul
              v-if="exp.bullets?.length"
              class="mt-2 space-y-2 text-foreground-light leading-relaxed max-w-prose list-disc pl-4 marker:text-accent/60"
            >
              <li v-for="(item, i) in exp.bullets" :key="i" class="pl-0.5">
                {{ item }}
              </li>
            </ul>
            <p
              v-else-if="exp.summary"
              class="text-foreground-light leading-relaxed max-w-prose mt-1"
            >
              {{ exp.summary }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import { experiences } from '../content/site'

const expRefs = ref<(HTMLElement | null)[]>([])
const visibleExps = ref<boolean[]>(experiences.map(() => false))

let observer: IntersectionObserver | null = null

function setExpRef(el: unknown, index: number) {
  expRefs.value[index] = el instanceof HTMLElement ? el : null
}

const observeExperiences = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = expRefs.value.findIndex((r) => r === entry.target)
          if (index !== -1) {
            visibleExps.value[index] = true
            observer?.unobserve(entry.target)
          }
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  )

  expRefs.value.forEach((r) => {
    if (r) observer?.observe(r)
  })
}

onMounted(() => {
  requestAnimationFrame(() => observeExperiences())
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>
