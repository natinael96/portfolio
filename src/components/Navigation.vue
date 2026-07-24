<template>
  <header class="site-nav" :class="{ 'is-scrolled': scrolled }">
    <div class="site-nav-inner">
      <nav class="site-nav-bar" aria-label="Primary">
        <a href="#hero" class="site-nav-brand" @click.prevent="go('hero')">
          <span class="relative z-[1]">NMS</span>
          <span class="site-nav-brand-dot" aria-hidden="true" />
        </a>

        <ul class="site-nav-links">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="site-nav-link"
              :class="{ 'is-active': activeId === item.id }"
              :aria-current="activeId === item.id ? 'true' : undefined"
              @click.prevent="go(item.id)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <button
          type="button"
          class="site-nav-toggle"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu v-if="!mobileMenuOpen" :size="20" class="relative z-[1]" />
          <X v-else :size="20" class="relative z-[1]" />
        </button>
      </nav>

      <Transition
        enter-active-class="transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        leave-active-class="transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        enter-from-class="opacity-0 -translate-y-2 scale-[0.97]"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-1 scale-[0.98]"
      >
        <div v-if="mobileMenuOpen" id="mobile-menu" class="site-nav-menu">
          <a
            v-for="(item, index) in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="site-nav-menu-link"
            :class="{ 'is-active': activeId === item.id }"
            :aria-current="activeId === item.id ? 'true' : undefined"
            @click.prevent="go(item.id)"
          >
            <span class="site-nav-menu-index" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            {{ item.label }}
          </a>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const activeId = ref('hero')

const go = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  mobileMenuOpen.value = false
}

let sectionObserver: IntersectionObserver | null = null

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') mobileMenuOpen.value = false
}

const onResize = () => {
  // Collapse the mobile sheet once the inline links are visible again.
  if (window.innerWidth >= 768) mobileMenuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)

  // Scroll-spy: the section crossing the vertical middle band is "active".
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (active) activeId.value = active.target.id
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
  )

  navItems.forEach((item) => {
    const element = document.getElementById(item.id)
    if (element) sectionObserver?.observe(element)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  sectionObserver?.disconnect()
  sectionObserver = null
})
</script>
