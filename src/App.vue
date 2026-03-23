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
      class="section-y section-x border-t border-foreground/[0.08] bg-[oklch(0.99_0.01_85/0.65)]"
    >
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
        <p class="text-sm text-foreground-light">
          © {{ new Date().getFullYear() }} Natinael M.
        </p>
        <p class="text-sm text-foreground-light/80">
          Vue 3 · TypeScript · Tailwind CSS
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
