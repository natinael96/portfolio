<template>
  <section
    id="experience"
    class="section-y section-x border-y border-accent/10"
  >
    <div class="max-w-3xl mx-auto lg:max-w-[90rem]">
      <header class="mb-6 sm:mb-7 lg:mb-8 max-w-2xl" v-motion="motionVisibleOnceUp(0)">
        <p class="font-mono text-xs font-medium tracking-[0.16em] uppercase text-accent/80 mb-2">
          Career signal
        </p>
        <h2
          class="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-foreground mb-2 tracking-tight"
        >
          Experience
        </h2>
        <p class="font-mono text-sm sm:text-[0.9375rem] text-foreground-light leading-relaxed">
          <span class="text-accent/70">//</span> education &amp; professional roles
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-7 xl:gap-8 items-start">
        <div
          v-for="group in experienceGroups"
          :key="group.label"
          class="exp-column min-w-0"
        >
          <p class="exp-column-label">{{ group.label }}</p>

          <div class="exp-list">
            <article
              v-for="(entry, localIndex) in group.items"
              :key="entry.exp.id"
              :ref="(el) => setExpRef(el, entry.index)"
              class="exp-entry"
              :class="{ 'animate-fade-in-left': visibleExps[entry.index] }"
              :style="{
                transitionDelay: visibleExps[entry.index] ? `${entry.index * 120}ms` : '0ms',
              }"
            >
              <div class="exp-entry-meta">
                <span class="exp-index">{{ String(localIndex + 1).padStart(2, '0') }}</span>
                <span class="exp-period">{{ entry.exp.period }}</span>
                <span v-if="entry.exp.location" class="exp-location">{{ entry.exp.location }}</span>
              </div>

              <h3 class="exp-role">{{ entry.exp.role }}</h3>

              <p class="exp-org">
                <span class="exp-org-at">@</span>
                <a
                  v-if="entry.exp.companyUrl"
                  :href="entry.exp.companyUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-inline hover:text-accent transition-colors"
                >
                  {{ entry.exp.company }}
                </a>
                <template v-else>{{ entry.exp.company }}</template>
              </p>

              <ul v-if="entry.exp.bullets?.length" class="exp-bullets">
                <li v-for="(item, i) in entry.exp.bullets" :key="i">{{ item }}</li>
              </ul>
              <p v-else-if="entry.exp.summary" class="exp-summary">
                {{ entry.exp.summary }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

import { experiences } from '../content/site'
import { motionVisibleOnceUp } from '../motion'

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
    { label: 'education & training', items: educationItems },
    { label: 'professional experience', items: professionalItems },
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
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
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
