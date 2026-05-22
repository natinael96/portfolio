<template>
  <section
    id="experience"
    class="relative overflow-hidden section-y-loose section-x border-y border-accent/10"
  >
    <div
      class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.987_0.012_95),oklch(0.966_0.022_168))]"
      aria-hidden="true"
    />
    <div
      class="absolute left-[var(--section-x)] top-0 -z-10 h-full w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent hidden lg:block"
      aria-hidden="true"
    />

    <div class="max-w-3xl mx-auto lg:max-w-4xl xl:max-w-5xl">
      <header class="mb-10 sm:mb-12 lg:mb-14">
        <div class="experience-panel max-w-2xl">
          <p class="font-mono text-xs font-medium tracking-[0.16em] uppercase text-accent/80 mb-3">
            Career signal
          </p>
          <h2
            class="font-display text-4xl sm:text-5xl lg:text-[3.2rem] font-medium text-foreground mb-5 tracking-tight"
          >
            Experience
          </h2>
          <p class="text-foreground-light text-base sm:text-lg leading-relaxed max-w-md">
            Education and training come first, then professional roles—so the timeline reads clearly
            from foundation to industry work.
          </p>

          <div class="mt-8 grid grid-cols-2 gap-3 max-w-md">
            <div class="experience-metric">
              <span class="text-2xl font-medium text-foreground">{{ educationExperiences.length }}</span>
              <span class="font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground-light">
                Education
              </span>
            </div>
            <div class="experience-metric">
              <span class="text-2xl font-medium text-foreground">{{ professionalExperiences.length }}</span>
              <span class="font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground-light">
                Roles
              </span>
            </div>
          </div>
        </div>
      </header>

      <div class="relative pl-8 sm:pl-10 max-w-3xl">
        <div
          class="absolute left-[0.6rem] sm:left-[0.7rem] top-3 bottom-3 w-px bg-gradient-to-b from-accent/30 via-accent/12 to-transparent"
          aria-hidden="true"
        />

        <div
          v-for="group in experienceGroups"
          :key="group.label"
          class="mb-10 last:mb-0"
        >
          <p class="mb-5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-foreground-light">
            {{ group.label }}
          </p>

          <div
            v-for="entry in group.items"
            :key="entry.exp.id"
            :ref="(el) => setExpRef(el, entry.index)"
            class="relative pb-7 sm:pb-8 last:pb-0 pl-6 sm:pl-8"
            :class="{ 'animate-fade-in-left': visibleExps[entry.index] }"
            :style="{ transitionDelay: visibleExps[entry.index] ? `${entry.index * 90}ms` : '0ms' }"
          >
            <div
              class="experience-node"
              aria-hidden="true"
            >
              {{ String(entry.index + 1).padStart(2, '0') }}
            </div>

            <div class="experience-card group">
              <div class="experience-card-glow" aria-hidden="true" />
              <div class="relative">
                <div
                  class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-6 mb-4"
                >
                  <div>
                    <p class="experience-kicker">
                      <a
                        v-if="entry.exp.companyUrl"
                        :href="entry.exp.companyUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link-inline underline-offset-4 hover:text-accent hover:underline"
                      >
                        {{ entry.exp.company }}
                      </a>
                      <template v-else>{{ entry.exp.company }}</template>
                    </p>
                    <h3
                      class="font-display text-xl sm:text-2xl font-medium text-foreground tracking-tight mt-1 group-hover:text-accent transition-colors"
                    >
                      {{ entry.exp.role }}
                    </h3>
                  </div>

                  <div class="flex sm:flex-col gap-2 sm:items-end shrink-0">
                    <span class="experience-pill">
                      {{ entry.exp.period }}
                    </span>
                    <span v-if="entry.exp.location" class="experience-pill experience-pill--muted">
                      {{ entry.exp.location }}
                    </span>
                  </div>
                </div>

                <ul
                  v-if="entry.exp.bullets?.length"
                  class="space-y-3 text-foreground-light leading-relaxed max-w-2xl"
                >
                  <li v-for="(item, i) in entry.exp.bullets" :key="i" class="experience-bullet">
                    {{ item }}
                  </li>
                </ul>
                <p
                  v-else-if="entry.exp.summary"
                  class="text-foreground-light leading-relaxed max-w-2xl"
                >
                  {{ entry.exp.summary }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

import { experiences } from '../content/site'

const professionalExperiences = computed(() =>
  experiences.filter((exp) => exp.category !== 'education')
)
const educationExperiences = computed(() =>
  experiences.filter((exp) => exp.category === 'education')
)
const experienceGroups = computed(() => {
  const educationItems = educationExperiences.value.map((exp, index) => ({
    exp,
    index,
  }))
  const professionalItems = professionalExperiences.value.map((exp, index) => ({
    exp,
    index: educationItems.length + index,
  }))

  return [
    { label: 'Education & training', items: educationItems },
    { label: 'Professional experience', items: professionalItems },
  ].filter((group) => group.items.length > 0)
})

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
