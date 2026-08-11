<template>
  <div class="m-root" :class="{ 'is-light': theme === 'light' }">
    <SignalRail :channels="monitorChannels" :active-idx="activeIdx" :seg-progress="segProgress" />

    <ThemeToggle />

    <div class="m-strip" :style="toneStyle" aria-hidden="true">
      <span class="m-strip-code">{{ activeChannel.code }}</span>
      <span class="m-strip-track"><span class="m-strip-fill" :style="{ '--progress': progress }" /></span>
      <span class="m-strip-name">{{ activeChannel.label }}</span>
    </div>

    <CursorTag :channel="activeChannel" />

    <main>
      <SectionSubject />
      <SectionAir />
      <SectionPractice />
      <SectionArchive />
      <SectionSinq />
      <SectionVitals />
      <SectionFormation />
      <SectionOpen @play="gameOpen = true" />
    </main>

    <EasterEggGame v-model:open="gameOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { monitorChannels } from '../content/site'
import SignalRail from './SignalRail.vue'
import ThemeToggle from './ThemeToggle.vue'
import { theme, initTheme } from './useTheme'
import CursorTag from './CursorTag.vue'
import SectionSubject from './SectionSubject.vue'
import SectionAir from './SectionAir.vue'
import SectionVitals from './SectionVitals.vue'
import SectionSinq from './SectionSinq.vue'
import SectionPractice from './SectionPractice.vue'
import SectionFormation from './SectionFormation.vue'
import SectionArchive from './SectionArchive.vue'
import SectionOpen from './SectionOpen.vue'
import EasterEggGame from '../components/EasterEggGame.vue'
import { mountReveals, unmountReveals } from '../reveal'

initTheme()

const gameOpen = ref(false)

const progress = ref(0)
const activeIdx = ref(0)
const segProgress = ref<number[]>(monitorChannels.map(() => 0))

const activeChannel = computed(() => monitorChannels[activeIdx.value] ?? monitorChannels[0]!)
const toneStyle = computed(() => ({ '--m-tone': `var(--mc-${activeChannel.value.tone})` }))

let bounds: { top: number; height: number }[] = []
let ticking = false

const measureBounds = () => {
  bounds = monitorChannels.map((channel) => {
    const el = document.getElementById(channel.id)
    if (!el) return { top: 0, height: 1 }
    const rect = el.getBoundingClientRect()
    return { top: rect.top + window.scrollY, height: rect.height }
  })
}

const measure = () => {
  ticking = false

  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0

  // The reading line sits at the vertical middle of the viewport.
  const midline = window.scrollY + window.innerHeight * 0.5

  let active = 0
  segProgress.value = bounds.map(({ top, height }, i) => {
    const p = Math.min(1, Math.max(0, (midline - top) / height))
    if (p > 0 && p < 1) active = i
    else if (p >= 1) active = Math.max(active, Math.min(i + 1, monitorChannels.length - 1))
    return p
  })
  activeIdx.value = active
}

const onScroll = () => {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(measure)
  }
}

const onResize = () => {
  measureBounds()
  onScroll()
}

onMounted(() => {
  mountReveals()
  measureBounds()
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  // Re-measure once webfonts settle (metrics shift section heights).
  document.fonts?.ready.then(() => onResize()).catch(() => {})
})

onUnmounted(() => {
  unmountReveals()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>
