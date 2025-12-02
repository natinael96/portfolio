<template>
  <section id="projects" class="py-24 px-6 sm:px-8 lg:px-12">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl sm:text-5xl font-light text-foreground mb-4 text-center">
        Featured Projects
      </h2>
      <p class="text-foreground-light text-center mb-16 max-w-2xl mx-auto">
        A selection of backend systems, full-stack applications, and APIs I've built.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :ref="el => projectRefs[index] = el as HTMLElement"
          class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1"
          :class="{ 'animate-fade-in-up': visibleProjects[index] }"
          :style="{ transitionDelay: visibleProjects[index] ? `${index * 100}ms` : '0ms' }"
        >
          <div class="mb-4">
            <h3 class="text-xl font-semibold text-foreground mb-2">
              {{ project.title }}
            </h3>
            <p class="text-sm text-foreground-light leading-relaxed">
              {{ project.description }}
            </p>
          </div>
          
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="px-3 py-1 bg-gray-100/50 text-xs text-foreground-light rounded-full"
            >
              {{ tech }}
            </span>
          </div>

          <div class="flex items-center gap-4">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              class="text-sm font-medium text-foreground hover:text-foreground-light transition-colors flex items-center gap-2"
            >
              <Github :size="16" />
              Code
            </a>
            <a
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              class="text-sm font-medium text-foreground hover:text-foreground-light transition-colors flex items-center gap-2"
            >
              <ExternalLink :size="16" />
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Github, ExternalLink } from 'lucide-vue-next'

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

const projectRefs = ref<(HTMLElement | null)[]>([])
const visibleProjects = ref<boolean[]>(new Array(6).fill(false))

const observeProjects = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.value.findIndex((ref) => ref === entry.target)
          if (index !== -1) {
            visibleProjects.value[index] = true
            observer.unobserve(entry.target)
          }
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  projectRefs.value.forEach((ref) => {
    if (ref) {
      observer.observe(ref)
    }
  })

  return observer
}

onMounted(() => {
  setTimeout(() => {
    observeProjects()
  }, 100)
})

const projects: Project[] = [
  {
    id: '1',
    title: 'Microservices Architecture',
    description: 'Scalable backend system with API gateway, service discovery, and distributed tracing.',
    tech: ['Node.js', 'NestJS', 'Docker', 'Kubernetes'],
    github: '#',
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Full-stack application with payment integration, inventory management, and admin dashboard.',
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    github: '#',
    demo: '#',
  },
  {
    id: '3',
    title: 'RESTful API Service',
    description: 'High-performance API with authentication, rate limiting, and comprehensive documentation.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    github: '#',
  },
  {
    id: '4',
    title: 'Real-time Dashboard',
    description: 'Interactive dashboard with live data visualization and WebSocket connections.',
    tech: ['React', 'TypeScript', 'WebSocket', 'Chart.js'],
    github: '#',
    demo: '#',
  },
  {
    id: '5',
    title: 'Cloud Infrastructure',
    description: 'Automated deployment pipeline with CI/CD, monitoring, and auto-scaling capabilities.',
    tech: ['AWS', 'Terraform', 'GitHub Actions', 'Docker'],
    github: '#',
  },
  {
    id: '6',
    title: 'Authentication Service',
    description: 'Secure authentication system with JWT, OAuth2, and multi-factor authentication support.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    github: '#',
  },
]
</script>

