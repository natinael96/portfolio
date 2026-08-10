<template>
  <section id="archive" class="m-archive m-section" aria-label="Channel 04 — archive">
    <div class="m-wrap">
      <div class="m-kicker rv" :style="{ '--m-tone': 'var(--mc-arch)' }">
        <span><b>CH·06</b> — Archive · public repositories</span>
        <span class="m-kicker-right">github.com/natinael96</span>
      </div>

      <h2 class="m-display m-archive-title" style="--m-tone: var(--mc-arch)">
        <span class="rv">The channel</span>
        <span class="is-tone rv" style="--rv-d: 100ms"> bank.</span>
      </h2>
      <p class="m-archive-dek rv" style="--rv-d: 160ms">{{ archive.dek }}</p>

      <div class="m-rack rv" style="--rv-d: 220ms">
        <article
          v-for="(project, index) in archiveProjects"
          :key="project.id"
          class="m-rack-row"
        >
          <span class="m-rack-led">R·{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="m-rack-name">{{ project.title }}</h3>
          <div class="m-rack-main">
            <p class="m-rack-desc">{{ project.description }}</p>
            <p class="m-rack-stack">{{ project.tech.join(' · ') }}</p>
          </div>
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="m-rack-link"
            :aria-label="`${project.title} source code on GitHub`"
          >
            source ↗
          </a>
        </article>
      </div>

      <div class="m-inventory rv">
        <p class="m-inventory-label">Instrument inventory — production tools, not exhaustive</p>
        <p v-for="group in toolkit" :key="group.name" class="m-inventory-line">
          <span class="m-inventory-cat">{{ group.name }}</span>
          {{ group.items.join(' · ') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { archive, archiveProjects, toolkit } from '../content/site'
</script>
