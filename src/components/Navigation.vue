<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 border-b border-accent/10 bg-accent-fg/70 backdrop-blur-md supports-[backdrop-filter]:bg-accent-fg/55"
  >
    <div class="max-w-7xl mx-auto section-x">
      <div class="flex items-center justify-between h-16">
        <a
          href="#hero"
          class="brand-mark -ml-2"
          @click.prevent="scrollTo('hero')"
        >
          NMS
        </a>
        <div class="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="nav-link"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </div>
        <button
          type="button"
          class="icon-btn md:hidden -mr-1"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu v-if="!mobileMenuOpen" :size="22" />
          <X v-else :size="22" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
      leave-active-class="transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-accent/10 bg-accent-fg/95 backdrop-blur-md"
      >
        <div class="section-x flex flex-col gap-0.5 py-4">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="nav-link-mobile"
            @click.prevent="onNavClick(item.id)"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'tech', label: 'Tech stack' },
  { id: 'contact', label: 'Contact' },
]

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const onNavClick = (id: string) => {
  scrollTo(id)
  mobileMenuOpen.value = false
}
</script>
