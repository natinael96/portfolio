<template>
  <div id="app" class="min-h-screen">
    <AnimatedBackground />
    <Navigation />
    <main class="relative">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />
    </main>

    <footer class="site-footer section-x">
      <div class="site-footer-rule" aria-hidden="true" />

      <div class="site-footer-inner max-w-[90rem] mx-auto">
        <div class="site-footer-signoff">
          <p class="site-footer-eyebrow">Thanks for reading</p>
          <p class="site-footer-name">{{ site.name }}</p>
          <p class="site-footer-tagline">{{ site.roleLabel }} · Addis Ababa</p>
        </div>

        <nav class="site-footer-nav" aria-label="Footer">
          <a :href="`mailto:${site.email}`" class="site-footer-link">Email</a>
          <a
            :href="site.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="site-footer-link"
          >
            GitHub
          </a>
          <a
            :href="site.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="site-footer-link"
          >
            LinkedIn
          </a>
          <button type="button" class="site-footer-link" @click="scrollToTop">
            Back to top
          </button>
        </nav>

        <div class="site-footer-bottom">
          <p class="site-footer-copy">© {{ year }} {{ site.name }}</p>
          <button type="button" class="site-footer-easter" @click="gameOpen = true">
            Bored? Play snake
          </button>
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
const year = new Date().getFullYear()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>
#app {
  position: relative;
}
</style>
