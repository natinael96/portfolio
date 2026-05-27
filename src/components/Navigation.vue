<template>
  <nav class="nav-float" aria-label="Primary">
    <div class="nav-float-shell">
      <div class="nav-float-bar">
        <a
          href="#hero"
          class="nav-float-pill nav-float-brand"
          @click.prevent="scrollTo('hero')"
        >
          <span class="relative z-[1]">NMS</span>
        </a>

        <div class="hidden md:flex nav-float-cluster" role="menubar">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="nav-float-btn"
            role="menuitem"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </div>

        <button
          type="button"
          class="nav-float-pill nav-float-menu md:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu v-if="!mobileMenuOpen" :size="18" class="relative z-[1]" />
          <X v-else :size="18" class="relative z-[1]" />
        </button>
      </div>

      <Transition
        enter-active-class="transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        leave-active-class="transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        enter-from-class="opacity-0 -translate-y-2 scale-[0.97]"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-1 scale-[0.98]"
      >
        <div v-if="mobileMenuOpen" class="nav-float-dropdown md:hidden">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="nav-float-dropdown-link"
            @click.prevent="onNavClick(item.id)"
          >
            {{ item.label }}
          </a>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech', label: 'Stack' },
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
