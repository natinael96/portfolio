<template>
  <header
    class="jnav"
    :class="{ 'is-scrolled': scrolled, 'is-inverted': inverted }"
  >
    <div class="jnav-inner">
      <a href="#cover" class="jnav-brand" @click.prevent="go('cover')">
        N.&thinsp;M.&thinsp;Shebabaw
      </a>

      <nav aria-label="Chapters">
        <ul class="jnav-chapters">
          <li v-for="chapter in chapters" :key="chapter.id">
            <a
              :href="`#${chapter.id}`"
              class="jnav-ch"
              :class="{ 'is-active': activeId === chapter.id }"
              :aria-current="activeId === chapter.id ? 'true' : undefined"
              @click.prevent="go(chapter.id)"
            >
              <span class="jnav-ch-num">{{ chapter.num }}</span>
              <span class="jnav-ch-label">{{ chapter.navLabel }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="jnav-progress" :style="{ '--progress': progress }" aria-hidden="true" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { chapters } from '../content/site'

const scrolled = ref(false)
const inverted = ref(false)
const progress = ref(0)
const activeId = ref('')

const go = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

let sectionObserver: IntersectionObserver | null = null
let ticking = false

const measure = () => {
  ticking = false
  scrolled.value = window.scrollY > 24

  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0

  // Invert the header while the dark feature plate sits underneath it.
  const feature = document.getElementById('feature')
  if (feature) {
    const rect = feature.getBoundingClientRect()
    const navHeight = 56
    inverted.value = rect.top < navHeight && rect.bottom > navHeight
  }
}

const onScroll = () => {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(measure)
  }
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })

  // Scroll-spy: the chapter crossing the vertical middle band is "active".
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (active) activeId.value = active.target.id
    },
    { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.2, 0.5, 1] }
  )

  chapters.forEach((chapter) => {
    const element = document.getElementById(chapter.id)
    if (element) sectionObserver?.observe(element)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  sectionObserver?.disconnect()
  sectionObserver = null
})
</script>
