<template>
  <section id="experience" class="section-y section-x bg-[oklch(0.985_0.01_88/0.5)] border-y border-foreground/[0.06]">
    <div class="max-w-3xl mx-auto lg:max-w-6xl lg:mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-24 items-start">
      <header class="mb-14 lg:mb-0 lg:sticky lg:top-28">
        <h2 class="font-display text-4xl sm:text-5xl font-light text-foreground mb-4 tracking-tight">
          Experience
        </h2>
        <p class="text-foreground-light text-lg leading-relaxed max-w-md">
          Roles where I owned backend architecture, delivery, and mentoring.
        </p>
      </header>

      <div class="relative pl-8 sm:pl-10">
        <div
          class="absolute left-[0.55rem] sm:left-[0.65rem] top-2 bottom-2 w-px bg-gradient-to-b from-foreground/15 via-foreground/10 to-transparent"
          aria-hidden="true"
        />

        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          :ref="(el) => setExpRef(el, index)"
          class="relative pb-14 last:pb-2 pl-6 sm:pl-8"
          :class="{ 'animate-fade-in-left': visibleExps[index] }"
          :style="{ transitionDelay: visibleExps[index] ? `${index * 90}ms` : '0ms' }"
        >
          <div
            class="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-foreground border-[3px] border-[oklch(0.99_0.01_90)] shadow-sm"
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
              {{ exp.company }}
            </p>
            <p class="text-foreground-light leading-relaxed max-w-prose">
              {{ exp.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
    period: '2022 — Present',
    description:
      'Microservices, API performance, and mentoring—shipping reliable systems without sacrificing clarity.',
  },
  {
    id: '2',
    role: 'Full-Stack Developer',
    company: 'Startup Inc.',
    period: '2020 — 2022',
    description: 'End-to-end features, CI/CD, and keeping production calm under growth.',
  },
  {
    id: '3',
    role: 'Backend Developer',
    company: 'Digital Agency',
    period: '2018 — 2020',
    description: 'REST integrations, third-party APIs, and data layers that stayed maintainable.',
  },
]

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
