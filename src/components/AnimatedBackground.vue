<template>
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div class="absolute inset-0 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#fafafa]"></div>
    
    <!-- Canvas for particles -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"></canvas>

    <!-- Flowing lines with GSAP -->
    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2d2d2d;stop-opacity:0.08" />
          <stop offset="50%" style="stop-color:#2d2d2d;stop-opacity:0.12" />
          <stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:0" />
        </linearGradient>
        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2d2d2d;stop-opacity:0.06" />
          <stop offset="50%" style="stop-color:#2d2d2d;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#2d2d2d;stop-opacity:0" />
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

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  baseOpacity: number
  pulseSpeed: number
  originalX: number
  originalY: number
}

let particles: Particle[] = []

const initParticles = () => {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Create more particles with varied properties
  particles = Array.from({ length: 120 }, () => {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    return {
      x,
      y,
      size: Math.random() * 4 + 1.5,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      baseOpacity: Math.random() * 0.25 + 0.15,
      opacity: 0,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      originalX: x,
      originalY: y,
    }
  })

  const connectParticles = (ctx: CanvasRenderingContext2D, p1: Particle, p2: Particle) => {
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 150

    if (distance < maxDistance) {
      const opacity = (1 - distance / maxDistance) * 0.15
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.strokeStyle = `rgba(45, 45, 45, ${opacity})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }

  const animate = () => {
    if (!ctx || !canvas) return

    time += 0.01

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections first (behind particles)
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach((otherParticle) => {
        connectParticles(ctx, particle, otherParticle)
      })
    })

    // Update and draw particles
    particles.forEach((particle) => {
      // Add subtle wave motion
      particle.x += particle.speedX + Math.sin(time + particle.originalX * 0.01) * 0.3
      particle.y += particle.speedY + Math.cos(time + particle.originalY * 0.01) * 0.3

      // Mouse interaction (subtle attraction)
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 200) {
        const force = (200 - distance) / 200 * 0.1
        particle.x += dx * force * 0.01
        particle.y += dy * force * 0.01
      }

      // Pulsing opacity
      particle.opacity = particle.baseOpacity + Math.sin(time * 2 + particle.originalX) * 0.1

      // Wrap around edges
      if (particle.x < -50) particle.x = canvas.width + 50
      if (particle.x > canvas.width + 50) particle.x = -50
      if (particle.y < -50) particle.y = canvas.height + 50
      if (particle.y > canvas.height + 50) particle.y = -50

      // Draw particle with glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      )
      gradient.addColorStop(0, `rgba(45, 45, 45, ${particle.opacity})`)
      gradient.addColorStop(0.5, `rgba(45, 45, 45, ${particle.opacity * 0.5})`)
      gradient.addColorStop(1, `rgba(45, 45, 45, 0)`)

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Outer glow
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(45, 45, 45, ${particle.opacity * 0.2})`
      ctx.fill()
    })

    animationFrameId = requestAnimationFrame(animate)
  }

  animate()
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const handleResize = () => {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  
  // Regenerate particles on resize
  initParticles()
}

onMounted(() => {
  initParticles()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)

  // Animate flowing lines with GSAP
  setTimeout(() => {
    if (line1.value) {
      gsap.to(line1.value, {
        x: window.innerWidth + 300,
        duration: 18,
        repeat: -1,
        ease: 'none',
      })
    }

    if (line2.value) {
      gsap.fromTo(
        line2.value,
        { x: window.innerWidth + 300 },
        {
          x: -300,
          duration: 22,
          repeat: -1,
          ease: 'none',
        }
      )
    }

    if (line3.value) {
      gsap.to(line3.value, {
        x: window.innerWidth + 300,
        duration: 25,
        repeat: -1,
        ease: 'none',
        delay: 2,
      })
    }
  }, 100)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
canvas {
  display: block;
}
</style>
