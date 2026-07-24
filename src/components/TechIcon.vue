<template>
  <svg
    v-if="iconData"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="tech-icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="iconData.path" :fill="iconData.hex ? `#${iconData.hex}` : 'currentColor'" />
  </svg>
  <div
    v-else
    :style="{ width: size + 'px', height: size + 'px' }"
    class="rounded bg-foreground/10"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SimpleIcon } from 'simple-icons'
import {
  siNodedotjs,
  siNestjs,
  siPython,
  siFastapi,
  siExpress,
  siGraphql,
  siApachekafka,
  siReact,
  siNextdotjs,
  siVuedotjs,
  siTypescript,
  siTailwindcss,
  siPostgresql,
  siMongodb,
  siRedis,
  siMysql,
  siDocker,
  siGithubactions,
} from 'simple-icons'

interface Props {
  name: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
})

const iconMap: Record<string, SimpleIcon> = {
  'Node.js': siNodedotjs,
  NestJS: siNestjs,
  Python: siPython,
  FastAPI: siFastapi,
  Express: siExpress,
  GraphQL: siGraphql,
  Kafka: siApachekafka,
  React: siReact,
  'Next.js': siNextdotjs,
  'Vue.js': siVuedotjs,
  TypeScript: siTypescript,
  'Tailwind CSS': siTailwindcss,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Redis: siRedis,
  MySQL: siMysql,
  Docker: siDocker,
  'GitHub Actions': siGithubactions,
}

const iconData = computed(() => {
  const icon = iconMap[props.name]
  if (!icon?.path) return null
  return { path: icon.path, hex: icon.hex }
})
</script>

<style scoped>
.tech-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
