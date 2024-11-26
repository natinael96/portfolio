<template>
  <div id="app" class="min-h-screen">
    <AnimatedBackground />
    <Navigation />
    <main>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <TechStackSection />
      <ContactSection />
    </main>
    
    <footer class="py-12 px-6 sm:px-8 lg:px-12 border-t border-gray-200/50 bg-white/40">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-sm text-foreground-light">
          © {{ new Date().getFullYear() }} Portfolio. Built with Vue 3 & Tailwind CSS.
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
