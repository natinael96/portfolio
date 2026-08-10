<template>
  <section id="archive" class="ch" aria-label="Archive — public backend work">
    <div class="wrap">
      <div class="folio rv">
        <p class="folio-label"><b>04</b> — Archive</p>
        <p class="folio-label folio-label--right">github.com/natinael96</p>
      </div>

      <h2 class="ch-title rv">The backend <em>notebooks</em>.</h2>
      <p class="ch-dek rv" style="--rv-d: 120ms">{{ archive.dek }}</p>

      <div class="mt-12 sm:mt-14">
        <article
          v-for="(project, index) in archiveProjects"
          :key="project.id"
          class="arch-row rv"
          :style="{ '--rv-d': `${index * 70}ms` }"
        >
          <span class="arch-num">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="arch-title">{{ project.title }}</h3>
          <div class="arch-main">
            <p class="arch-desc">{{ project.description }}</p>
            <p class="arch-stack">{{ project.tech.join(' · ') }}</p>
          </div>
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="arch-link"
            :aria-label="`${project.title} source code on GitHub`"
          >
            source ↗
          </a>
        </article>
      </div>

      <div class="toolkit rv">
        <p class="toolkit-label">Toolkit — production tools, not exhaustive</p>
        <p v-for="group in toolkit" :key="group.name" class="toolkit-line">
          <span class="toolkit-cat">{{ group.name }}</span>
          {{ group.items.join(' · ') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { archive, archiveProjects, toolkit } from '../content/site'
</script>
