<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="flex items-center justify-between h-16">
        <div class="text-xl font-semibold text-foreground">
          Portfolio
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="text-sm font-medium text-foreground-light hover:text-foreground transition-colors"
            @click="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </div>
        <button
          class="md:hidden p-2 text-foreground"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu :size="24" />
        </button>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50"
    >
      <div class="px-6 py-4 space-y-4">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="block text-sm font-medium text-foreground-light hover:text-foreground transition-colors"
          @click="scrollTo(item.id); mobileMenuOpen = false"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'contact', label: 'Contact' },
]

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

