<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 border-b border-foreground/[0.07] bg-[oklch(0.99_0.008_90/0.72)] backdrop-blur-md supports-[backdrop-filter]:bg-[oklch(0.99_0.008_90/0.55)]"
  >
    <div class="max-w-7xl mx-auto section-x">
      <div class="flex items-center justify-between h-16">
        <a
          href="#hero"
          class="font-display text-lg font-medium text-foreground tracking-tight transition-opacity duration-200 hover:opacity-80"
          @click.prevent="scrollTo('hero')"
        >
          NM
        </a>
        <div class="hidden md:flex items-center gap-10">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="text-sm font-medium text-foreground-light hover:text-foreground transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </div>
        <button
          type="button"
          class="md:hidden p-2 -mr-2 rounded-lg text-foreground hover:bg-foreground/[0.05] transition-colors duration-200"
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
        class="md:hidden border-t border-foreground/[0.07] bg-[oklch(0.99_0.008_90/0.95)] backdrop-blur-md"
      >
        <div class="section-x py-5 flex flex-col gap-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="py-3 text-sm font-medium text-foreground-light hover:text-foreground transition-colors"
            @click.prevent="
              scrollTo(item.id)
              mobileMenuOpen = false
            "
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
</script>
