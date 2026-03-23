<template>
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    <!-- Warm base wash (tinted neutrals, not pure gray) -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,oklch(0.96_0.02_75)_0%,oklch(0.97_0.01_85)_45%,oklch(0.96_0.015_70)_100%)]"
    />

    <!-- Animated perspective grid (transform-only drift) -->
    <div class="grid-drift-wrap absolute inset-0 flex items-center justify-center overflow-hidden">
      <div class="grid-drift-plane" />
    </div>

    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full opacity-90" />

    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: oklch(0.35 0.02 60); stop-opacity: 0.07" />
          <stop offset="50%" style="stop-color: oklch(0.32 0.025 55); stop-opacity: 0.1" />
          <stop offset="100%" style="stop-color: oklch(0.35 0.02 60); stop-opacity: 0" />
        </linearGradient>
        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: oklch(0.38 0.018 65); stop-opacity: 0.05" />
          <stop offset="50%" style="stop-color: oklch(0.34 0.02 58); stop-opacity: 0.08" />
          <stop offset="100%" style="stop-color: oklch(0.38 0.018 65); stop-opacity: 0" />
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

const canvasRef = ref<HTMLCanvasElement | null>(null)
const line1 = ref<SVGPathElement | null>(null)
const line2 = ref<SVGPathElement | null>(null)
const line3 = ref<SVGPathElement | null>(null)

let animationFrameId: number | null = null
let mouseX = 0
let mouseY = 0
let time = 0
let reducedMotion = false
let gsapCtx: gsap.Context | null = null

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  baseOpacity: number
  originalX: number
  originalY: number
}

let particles: Particle[] = []

function stopAnimationLoop() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const initParticles = () => {
  stopAnimationLoop()

  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const count = reducedMotion ? 36 : 100
  particles = Array.from({ length: count }, () => {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    return {
      x,
      y,
      size: Math.random() * 3 + 1.2,
      speedX: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.65),
      speedY: (Math.random() - 0.5) * (reducedMotion ? 0 : 0.65),
      baseOpacity: Math.random() * 0.2 + 0.12,
      opacity: 0,
      originalX: x,
      originalY: y,
    }
  })

  const connectParticles = (ctx: CanvasRenderingContext2D, p1: Particle, p2: Particle) => {
    if (reducedMotion) return
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 130

    if (distance < maxDistance) {
      const opacity = (1 - distance / maxDistance) * 0.12
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.strokeStyle = `oklch(0.35 0.02 60 / ${opacity})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }

  const drawFrame = () => {
    if (!ctx || !canvas) return

    time += reducedMotion ? 0 : 0.012

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, i) => {
      if (!reducedMotion) {
        particles.slice(i + 1).forEach((otherParticle) => {
          connectParticles(ctx, particle, otherParticle)
        })
      }
    })

    particles.forEach((particle) => {
      if (!reducedMotion) {
        particle.x += particle.speedX + Math.sin(time + particle.originalX * 0.01) * 0.25
        particle.y += particle.speedY + Math.cos(time + particle.originalY * 0.01) * 0.25

        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 180) {
          const force = ((180 - distance) / 180) * 0.08
          particle.x += dx * force * 0.01
          particle.y += dy * force * 0.01
        }

        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50
      }

      particle.opacity =
        particle.baseOpacity + (reducedMotion ? 0 : Math.sin(time * 2 + particle.originalX) * 0.08)

      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 2
      )
      gradient.addColorStop(0, `oklch(0.32 0.02 55 / ${particle.opacity})`)
      gradient.addColorStop(0.5, `oklch(0.35 0.018 60 / ${particle.opacity * 0.45})`)
      gradient.addColorStop(1, 'oklch(0.35 0.02 60 / 0)')

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    })
  }

  if (reducedMotion) {
    drawFrame()
    return
  }

  const animate = () => {
    drawFrame()
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const handleResize = () => {
  initParticles()
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  initParticles()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)

  if (!reducedMotion) {
    gsapCtx = gsap.context(() => {
      const w = window.innerWidth
      if (line1.value) {
        gsap.fromTo(
          line1.value,
          { x: 0 },
          {
            x: w + 300,
            duration: 22,
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
            duration: 26,
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
            duration: 30,
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
  stopAnimationLoop()
  gsapCtx?.revert()
  gsapCtx = null
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
canvas {
  display: block;
}

/* Perspective grid: structural motion, GPU-friendly transforms */
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
    linear-gradient(oklch(0.4 0.03 58 / 0.055) 1px, transparent 1px),
    linear-gradient(90deg, oklch(0.4 0.03 58 / 0.055) 1px, transparent 1px);
  background-size: 56px 56px;
  animation: grid-drift 48s linear infinite;
  mask-image: radial-gradient(ellipse 55% 70% at 50% 45%, black 20%, transparent 72%);
  -webkit-mask-image: radial-gradient(ellipse 55% 70% at 50% 45%, black 20%, transparent 72%);
}

@keyframes grid-drift {
  from {
    transform: rotateX(72deg) translateZ(-120px) translate3d(0, 0, 0);
  }
  to {
    transform: rotateX(72deg) translateZ(-120px) translate3d(56px, 56px, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .grid-drift-plane {
    animation: none;
    opacity: 0.65;
  }
}
</style>
