<template>
  <div class="min-h-screen">
    <Navigation />
    <main>
      <CoverMasthead />
      <ChapterFeature />
      <ChapterPractice />
      <ChapterFormation />
      <ChapterArchive />
      <ChapterCorrespondence @play="gameOpen = true" />
    </main>

    <EasterEggGame v-model:open="gameOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navigation from './components/Navigation.vue'
import CoverMasthead from './components/CoverMasthead.vue'
import ChapterFeature from './components/ChapterFeature.vue'
import ChapterPractice from './components/ChapterPractice.vue'
import ChapterFormation from './components/ChapterFormation.vue'
import ChapterArchive from './components/ChapterArchive.vue'
import ChapterCorrespondence from './components/ChapterCorrespondence.vue'
import EasterEggGame from './components/EasterEggGame.vue'
import { mountReveals, unmountReveals } from './reveal'

const gameOpen = ref(false)

onMounted(() => mountReveals())
onUnmounted(() => unmountReveals())
</script>
