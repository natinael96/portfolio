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
      <div
        class="max-w-[90rem] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 text-center sm:text-left"
      >
        <p class="text-sm text-foreground-light">
          © {{ new Date().getFullYear() }} {{ site.name }}
        </p>
        <p class="text-sm text-foreground-light/80">
          Vue 3 · TypeScript · Tailwind CSS
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { site } from './content/site'
import AnimatedBackground from './components/AnimatedBackground.vue'
import Navigation from './components/Navigation.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import TechStackSection from './components/TechStackSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<style>
#app {
  position: relative;
}
</style>
