<template>
  <div id="app" class="min-h-screen">
    <AnimatedBackground />
    <Navigation />
    <main class="relative">
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <TechStackSection />
      <ContactSection />
    </main>

    <footer
      class="section-y-tight section-x border-t border-accent/10 bg-accent-subtle/50"
    >
      <div class="max-w-[90rem] mx-auto flex flex-col gap-6 sm:gap-5">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left"
        >
          <p class="text-sm text-foreground-light">
            © {{ new Date().getFullYear() }} {{ site.name }}
          </p>
          <p class="text-sm text-foreground-light/80">
            Vue 3 · TypeScript · Tailwind CSS
          </p>
        </div>
        <div
          class="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 pt-4 border-t border-accent/10"
        >
          <button
            type="button"
            class="btn-secondary inline-flex items-center gap-2.5 text-sm font-semibold w-full sm:w-auto justify-center"
            @click="gameOpen = true"
          >
            <span class="text-lg leading-none" aria-hidden="true">🎮</span>
            Play mini game
          </button>
          <p class="text-xs sm:text-sm font-medium text-foreground-light text-center sm:text-right max-w-md">
            Take a break — quick Snake in your browser (arrows or WASD).
          </p>
        </div>
      </div>
    </footer>

    <EasterEggGame v-model:open="gameOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { site } from './content/site'
import AnimatedBackground from './components/AnimatedBackground.vue'
import Navigation from './components/Navigation.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import TechStackSection from './components/TechStackSection.vue'
import ContactSection from './components/ContactSection.vue'
import EasterEggGame from './components/EasterEggGame.vue'

const gameOpen = ref(false)
</script>

<style>
#app {
  position: relative;
}
</style>
