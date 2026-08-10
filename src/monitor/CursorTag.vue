<template>
  <div
    v-if="enabled"
    ref="tag"
    class="m-cursor"
    :class="{ 'is-on': on }"
    :style="{ '--m-tone': `var(--mc-${channel.tone})` }"
    aria-hidden="true"
  >
    {{ channel.code }} · y:{{ depth }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { MonitorChannel } from '../content/site'

const props = defineProps<{ channel: MonitorChannel }>()
void props

const enabled = ref(false)
const on = ref(false)
const depth = ref(0)
const tag = ref<HTMLElement | null>(null)

let raf = 0
let mx = 0
let my = 0
let cx = 0
let cy = 0

const loop = () => {
  cx += (mx - cx) * 0.22
  cy += (my - cy) * 0.22
  if (tag.value) {
    tag.value.style.left = `${cx}px`
    tag.value.style.top = `${cy}px`
  }
  raf = requestAnimationFrame(loop)
}

const onMove = (event: PointerEvent) => {
  mx = event.clientX
  my = event.clientY
  depth.value = Math.round(window.scrollY + event.clientY)
  if (!on.value) {
    cx = mx
    cy = my
    on.value = true
  }
}

const onLeave = () => {
  on.value = false
}

onMounted(() => {
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!finePointer || reduced) return
  enabled.value = true
  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onMove)
  document.documentElement.removeEventListener('pointerleave', onLeave)
  cancelAnimationFrame(raf)
})
</script>
