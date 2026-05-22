<template>
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-18%,oklch(0.955_0.028_168)_0%,oklch(0.986_0.014_95)_46%,oklch(0.98_0.018_88)_100%)]"
    />

    <div class="grid-drift-wrap absolute inset-0 flex items-center justify-center overflow-hidden">
      <div class="grid-drift-plane" />
    </div>

    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: oklch(0.48 0.08 168); stop-opacity: 0.055" />
          <stop offset="50%" style="stop-color: oklch(0.40 0.09 168); stop-opacity: 0.075" />
          <stop offset="100%" style="stop-color: oklch(0.48 0.08 168); stop-opacity: 0" />
        </linearGradient>
        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: oklch(0.46 0.075 172); stop-opacity: 0.04" />
          <stop offset="50%" style="stop-color: oklch(0.38 0.085 166); stop-opacity: 0.06" />
          <stop offset="100%" style="stop-color: oklch(0.46 0.075 172); stop-opacity: 0" />
        </linearGradient>
      </defs>
      <path
        ref="line1"
        d="M 0,150 Q 400,80 800,150 T 1600,150"
        fill="none"
        stroke="url(#lineGradient1)"
        stroke-width="1.5"
      />
      <path
        ref="line2"
        d="M 0,350 Q 300,280 600,350 T 1200,350"
        fill="none"
        stroke="url(#lineGradient2)"
        stroke-width="1.5"
      />
      <path
        ref="line3"
        d="M 0,550 Q 500,480 1000,550 T 2000,550"
        fill="none"
        stroke="url(#lineGradient1)"
        stroke-width="1"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const line1 = ref<SVGPathElement | null>(null)
const line2 = ref<SVGPathElement | null>(null)
const line3 = ref<SVGPathElement | null>(null)

let reducedMotion = false
let gsapCtx: gsap.Context | null = null

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!reducedMotion) {
    gsapCtx = gsap.context(() => {
      const w = window.innerWidth
      if (line1.value) {
        gsap.fromTo(
          line1.value,
          { x: 0 },
          {
            x: w + 300,
            duration: 38,
            repeat: -1,
            ease: 'none',
          }
        )
      }
      if (line2.value) {
        gsap.fromTo(
          line2.value,
          { x: w + 280 },
          {
            x: -280,
            duration: 44,
            repeat: -1,
            ease: 'none',
          }
        )
      }
      if (line3.value) {
        gsap.fromTo(
          line3.value,
          { x: -200 },
          {
            x: w + 200,
            duration: 50,
            repeat: -1,
            ease: 'none',
            delay: 1.5,
          }
        )
      }
    })
  }
})

onUnmounted(() => {
  gsapCtx?.revert()
  gsapCtx = null
})
</script>

<style scoped>
.grid-drift-wrap {
  perspective: 1200px;
  perspective-origin: 50% 40%;
}

.grid-drift-plane {
  position: absolute;
  width: 220%;
  height: 180%;
  top: -20%;
  left: -60%;
  transform-origin: 50% 50%;
  transform: rotateX(72deg) translateZ(-120px);
  background-image:
    linear-gradient(oklch(0.42 0.08 168 / 0.045) 1px, transparent 1px),
    linear-gradient(90deg, oklch(0.42 0.08 168 / 0.045) 1px, transparent 1px);
  background-size: 72px 72px;
  animation: grid-drift 80s linear infinite;
  mask-image: radial-gradient(ellipse 48% 62% at 50% 45%, black 8%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 48% 62% at 50% 45%, black 8%, transparent 70%);
}

@keyframes grid-drift {
  from {
    transform: rotateX(72deg) translateZ(-120px) translate3d(0, 0, 0);
  }
  to {
    transform: rotateX(72deg) translateZ(-120px) translate3d(72px, 72px, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .grid-drift-plane {
    animation: none;
    opacity: 0.7;
  }
}
</style>
