<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="egg-game-title"
      >
        <button
          type="button"
          class="absolute inset-0 bg-foreground/40 backdrop-blur-[2px] cursor-default"
          aria-label="Close game overlay"
          @click="close"
        />
        <div
          class="relative z-[101] w-full max-w-md rounded-2xl border border-accent/25 bg-accent-fg shadow-[0_24px_64px_-20px_oklch(0.2_0.08_168/0.35)] p-5 sm:p-6"
          @keydown.stop
        >
          <div class="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2
                id="egg-game-title"
                class="font-display text-xl font-bold text-foreground tracking-tight"
              >
                Snake break
              </h2>
              <p class="text-xs text-foreground-light mt-1">
                Arrows or WASD · eat the dot · don’t bite yourself
              </p>
            </div>
            <button
              type="button"
              class="icon-btn -mr-1 -mt-1 text-foreground-light hover:text-foreground"
              aria-label="Close"
              @click="close"
            >
              <span class="text-xl leading-none" aria-hidden="true">×</span>
            </button>
          </div>

          <div class="flex items-center justify-between text-sm font-semibold text-foreground mb-3">
            <span class="tabular-nums">Score {{ score }}</span>
            <span v-if="gameOver" class="text-accent">Game over</span>
            <span v-else-if="!running && score === 0" class="text-foreground-light font-medium"
              >Press an arrow to start</span
            >
          </div>

          <canvas
            ref="canvasRef"
            :width="canvasPx.w"
            :height="canvasPx.h"
            class="w-full max-h-[min(50vh,320px)] rounded-xl border border-foreground/[0.08] bg-background mx-auto block"
            role="img"
            :aria-label="`Snake game canvas, score ${score}`"
          />

          <div
            class="mt-4 grid grid-cols-3 grid-rows-2 gap-2 max-w-[200px] mx-auto sm:hidden"
            aria-hidden="true"
          >
            <span />
            <button type="button" class="btn-pad" @click="queueDir(0, -1)">↑</button>
            <span />
            <button type="button" class="btn-pad" @click="queueDir(-1, 0)">←</button>
            <button type="button" class="btn-pad" @click="queueDir(0, 1)">↓</button>
            <button type="button" class="btn-pad" @click="queueDir(1, 0)">→</button>
          </div>

          <div class="mt-5 flex flex-wrap gap-2 justify-center">
            <button v-if="gameOver" type="button" class="btn-primary text-sm px-5 min-h-10" @click="resetGame">
              Play again
            </button>
            <button type="button" class="btn-secondary text-sm px-5 min-h-10" @click="close">Back to site</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'

const COLS = 16
const ROWS = 12
const CELL = 20

const canvasPx = { w: COLS * CELL, h: ROWS * CELL }

const open = defineModel<boolean>('open', { required: true })

const canvasRef = ref<HTMLCanvasElement | null>(null)
const score = ref(0)
const running = ref(false)
const gameOver = ref(false)

type Pt = { x: number; y: number }
let snake: Pt[] = []
let food: Pt = { x: 0, y: 0 }
let dir: Pt = { x: 1, y: 0 }
let pendingDir: Pt = { x: 1, y: 0 }
let tickId: ReturnType<typeof setInterval> | null = null

function close() {
  open.value = false
}

function randomFood(): Pt {
  const taken = new Set(snake.map((s) => `${s.x},${s.y}`))
  let x = 0
  let y = 0
  for (let i = 0; i < 400; i++) {
    x = Math.floor(Math.random() * COLS)
    y = Math.floor(Math.random() * ROWS)
    if (!taken.has(`${x},${y}`)) return { x, y }
  }
  return { x: 0, y: 0 }
}

function resetGame() {
  snake = [
    { x: 4, y: 6 },
    { x: 3, y: 6 },
    { x: 2, y: 6 },
  ]
  food = randomFood()
  dir = { x: 1, y: 0 }
  pendingDir = { x: 1, y: 0 }
  score.value = 0
  gameOver.value = false
  running.value = false
  draw()
}

function stopLoop() {
  if (tickId != null) {
    clearInterval(tickId)
    tickId = null
  }
}

function startLoop() {
  stopLoop()
  tickId = setInterval(tick, 130)
}

function tick() {
  if (!running.value || gameOver.value) return
  dir = { ...pendingDir }
  const head = snake[0]
  if (!head) return
  const next = { x: head.x + dir.x, y: head.y + dir.y }

  if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
    endGame()
    return
  }
  if (snake.some((s) => s.x === next.x && s.y === next.y)) {
    endGame()
    return
  }

  snake.unshift(next)
  if (next.x === food.x && next.y === food.y) {
    score.value += 1
    food = randomFood()
  } else {
    snake.pop()
  }
  draw()
}

function endGame() {
  gameOver.value = true
  running.value = false
  stopLoop()
  draw()
}

function draw() {
  const c = canvasRef.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = 'oklch(0.985 0.022 95)'
  ctx.fillRect(0, 0, canvasPx.w, canvasPx.h)

  ctx.strokeStyle = 'oklch(0.9 0.04 168 / 0.35)'
  ctx.lineWidth = 1
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath()
    ctx.moveTo(x * CELL, 0)
    ctx.lineTo(x * CELL, canvasPx.h)
    ctx.stroke()
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * CELL)
    ctx.lineTo(canvasPx.w, y * CELL)
    ctx.stroke()
  }

  ctx.fillStyle = 'oklch(0.36 0.17 168)'
  for (const s of snake) {
    const pad = 1
    ctx.fillRect(s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2)
  }

  ctx.fillStyle = 'oklch(0.55 0.14 35)'
  ctx.beginPath()
  ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2)
  ctx.fill()
}

function queueDir(dx: number, dy: number) {
  if (gameOver.value) return
  if (-dx === dir.x && -dy === dir.y) return
  pendingDir = { x: dx, y: dy }
  if (!running.value && !gameOver.value) {
    running.value = true
    startLoop()
  }
}

function onKey(e: KeyboardEvent) {
  if (!open.value) return
  const k = e.key.toLowerCase()
  if (k === 'arrowup' || k === 'w') {
    e.preventDefault()
    queueDir(0, -1)
  } else if (k === 'arrowdown' || k === 's') {
    e.preventDefault()
    queueDir(0, 1)
  } else if (k === 'arrowleft' || k === 'a') {
    e.preventDefault()
    queueDir(-1, 0)
  } else if (k === 'arrowright' || k === 'd') {
    e.preventDefault()
    queueDir(1, 0)
  } else if (k === 'escape') {
    e.preventDefault()
    close()
  }
}

watch(
  open,
  async (isOpen) => {
    if (isOpen) {
      stopLoop()
      document.body.style.overflow = 'hidden'
      await nextTick()
      resetGame()
      window.addEventListener('keydown', onKey)
    } else {
      stopLoop()
      running.value = false
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }
)

onUnmounted(() => {
  stopLoop()
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})

</script>

<style scoped>
/* @apply cannot use /opacity on hyphenated theme colors (accent-subtle, etc.) */
.btn-pad {
  @apply flex items-center justify-center min-h-11 rounded-lg border border-solid text-lg font-semibold text-foreground transition-colors;
  background-color: color-mix(in oklch, var(--accent-subtle) 80%, transparent);
  border-color: color-mix(in oklch, var(--accent) 20%, transparent);
}
.btn-pad:active {
  background-color: color-mix(in oklch, var(--accent-muted) 50%, transparent);
}
</style>
