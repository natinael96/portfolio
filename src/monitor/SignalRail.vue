<template>
  <nav class="m-rail" aria-label="Channels">
    <svg
      class="m-rail-svg"
      :viewBox="`0 0 48 ${channels.length * 100}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g v-for="(channel, i) in channels" :key="channel.id" :transform="`translate(0 ${i * 100})`">
        <path class="m-rail-base" :d="wavePath(channel.wave)" />
        <path
          class="m-rail-lit"
          :d="wavePath(channel.wave)"
          pathLength="100"
          stroke-dasharray="100"
          :stroke-dashoffset="100 - (segProgress[i] ?? 0) * 100"
          :style="{ stroke: `var(--mc-${channel.tone})`, color: `var(--mc-${channel.tone})` }"
        />
      </g>
    </svg>

    <ol class="m-rail-stops">
      <li
        v-for="(channel, i) in channels"
        :key="channel.id"
        class="m-rail-stop"
        :class="{ 'is-active': i === activeIdx }"
        :style="{ '--m-tone': `var(--mc-${channel.tone})` }"
      >
        <button
          type="button"
          class="m-rail-btn"
          :aria-current="i === activeIdx ? 'true' : undefined"
          @click="go(channel.id)"
        >
          <span class="m-rail-code">{{ channel.code }}</span>
          <span class="m-rail-label">{{ channel.label }}</span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { MonitorChannel } from '../content/site'

defineProps<{
  channels: MonitorChannel[]
  activeIdx: number
  segProgress: number[]
}>()

const go = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Each channel's trace character, drawn top-to-bottom in a 48×100 cell. */
const paths: Record<MonitorChannel['wave'], string> = {
  ecg: 'M24,0 L24,12 L16,16 L34,24 L24,30 L24,42 L20,45 L29,48 L24,51 L24,64 L14,70 L36,79 L24,85 L24,100',
  drift: 'M24,0 C10,10 38,20 24,32 C12,42 36,54 24,66 C14,76 34,90 24,100',
  pulse:
    'M24,0 L24,8 L18,11 L30,17 L24,20 L24,28 L18,31 L30,37 L24,40 L24,48 L18,51 L30,57 L24,60 L24,68 L18,71 L30,77 L24,80 L24,88 L18,91 L30,97 L24,100',
  square: 'M24,0 L24,8 L12,8 L12,24 L36,24 L36,40 L16,40 L16,56 L32,56 L32,72 L20,72 L20,88 L24,88 L24,100',
  bead: 'M24,0 A8,8 0 0 1 24,16 A8,8 0 0 0 24,32 A8,8 0 0 1 24,48 A8,8 0 0 0 24,64 A8,8 0 0 1 24,80 A8,8 0 0 0 24,96 L24,100',
  sine: 'M24,0 C36,12 36,22 24,32 C12,42 12,52 24,62 C36,72 36,84 24,94 L24,100',
  ticks:
    'M24,0 L24,12 L32,12 L32,20 L16,20 L16,28 L24,28 L24,44 L34,44 L34,52 L14,52 L14,60 L24,60 L24,76 L30,76 L30,84 L18,84 L18,92 L24,92 L24,100',
  flat: 'M24,0 L24,36 L18,40 L31,46 L24,50 L24,100',
}

const wavePath = (wave: MonitorChannel['wave']) => paths[wave]
</script>
