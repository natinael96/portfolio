<template>
  <img
    v-if="props.name === 'AWS S3' && awsS3Icon"
    :src="awsS3Icon"
    :width="size"
    :height="size"
    alt="AWS S3"
    class="tech-icon"
  />
  <img
    v-else-if="props.name === 'AWS CodePipeline' && awsCodePipelineIcon"
    :src="awsCodePipelineIcon"
    :width="size"
    :height="size"
    alt="AWS CodePipeline"
    class="tech-icon"
  />
  <img
    v-else-if="props.name === 'AWS' && awsEc2Icon"
    :src="awsEc2Icon"
    :width="size"
    :height="size"
    alt="AWS"
    class="tech-icon"
  />
  <svg
    v-else-if="iconData"
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
  siKubernetes,
  siGithubactions,
  siTerraform,
} from 'simple-icons'

import awsS3Icon from 'aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Storage/64/Arch_Amazon-Simple-Storage-Service_64.svg'
import awsCodePipelineIcon from 'aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Developer-Tools/64/Arch_AWS-CodePipeline_64.svg'
import awsEc2Icon from 'aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/64/Arch_Amazon-EC2_64.svg'

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
  Kubernetes: siKubernetes,
  'GitHub Actions': siGithubactions,
  Terraform: siTerraform,
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
