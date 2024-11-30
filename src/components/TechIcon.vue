<template>
  <!-- AWS S3 Icon -->
  <img
    v-if="props.name === 'AWS S3' && awsS3Icon"
    :src="awsS3Icon"
    :width="size"
    :height="size"
    alt="AWS S3"
    class="tech-icon"
  />
  <!-- AWS CodePipeline Icon -->
  <img
    v-else-if="props.name === 'AWS CodePipeline' && awsCodePipelineIcon"
    :src="awsCodePipelineIcon"
    :width="size"
    :height="size"
    alt="AWS CodePipeline"
    class="tech-icon"
  />
  <!-- Other icons from simple-icons -->
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
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as si from 'simple-icons'

// AWS Icons from aws-svg-icons
import awsS3Icon from 'aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Storage/64/Arch_Amazon-Simple-Storage-Service_64.svg'
import awsCodePipelineIcon from 'aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Developer-Tools/64/Arch_AWS-CodePipeline_64.svg'

interface Props {
  name: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
})

// Map tech names to simple-icons slugs (exact property names in simple-icons)
const iconSlugMap: Record<string, string> = {
  'Node.js': 'siNodedotjs',
  'NestJS': 'siNestjs',
  'Python': 'siPython',
  'FastAPI': 'siFastapi',
  'Express': 'siExpress',
  'GraphQL': 'siGraphql',
  'React': 'siReact',
  'Next.js': 'siNextdotjs',
  'Vue.js': 'siVuedotjs',
  'TypeScript': 'siTypescript',
  'Tailwind CSS': 'siTailwindcss',
  'PostgreSQL': 'siPostgresql',
  'MongoDB': 'siMongodb',
  'Redis': 'siRedis',
  'MySQL': 'siMysql',
  'Elasticsearch': 'siElasticsearch',
  'Docker': 'siDocker',
  'Kubernetes': 'siKubernetes',
  'AWS': 'siAmazonaws',
  'GitHub Actions': 'siGithubactions',
  'Terraform': 'siTerraform',
}

const iconData = computed(() => {
  const iconKey = iconSlugMap[props.name]
  if (!iconKey) return null

  try {
    const icon = (si as any)[iconKey]
    
    if (icon && icon.path) {
      return {
        path: icon.path,
        hex: icon.hex,
      }
    }
  } catch (error) {
    console.warn(`Icon not found for: ${props.name}`, error)
  }
  return null
})
</script>

<style scoped>
.tech-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>

