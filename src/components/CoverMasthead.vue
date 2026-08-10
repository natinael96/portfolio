<template>
  <section id="cover" class="cover wrap" aria-label="Cover">
    <div>
      <div class="cover-top rv">
        <p class="folio-label">{{ cover.overline }}</p>
        <p class="folio-label folio-label--right">{{ cover.dateline }}</p>
      </div>

      <h1 class="cover-name">
        <span
          v-for="(line, i) in cover.nameLines"
          :key="line"
          class="cover-name-line rv"
          :class="{ 'is-italic': i === 1 }"
          :style="{ '--rv-d': `${i * 110}ms` }"
        >
          {{ line }}
        </span>
      </h1>

      <p class="cover-standfirst rv" style="--rv-d: 340ms">
        <strong>{{ site.roleLabel }} in Addis Ababa.</strong>
        Two-plus years of APIs, backends, and web interfaces — and one live
        instrument that watches the air over the city.
      </p>

      <div class="cover-grid">
        <div class="rv" style="--rv-d: 120ms">
          <p class="toc-label">In this record</p>
          <ol class="toc">
            <li v-for="chapter in chapters" :key="chapter.id" class="toc-item">
              <a
                :href="`#${chapter.id}`"
                class="toc-link"
                @click.prevent="go(chapter.id)"
              >
                <span class="toc-num">{{ chapter.num }}</span>
                <span class="toc-title">{{ chapter.runningTitle }}</span>
                <span class="toc-arrow" aria-hidden="true">↓</span>
              </a>
            </li>
          </ol>
        </div>

        <aside class="facts rv" style="--rv-d: 240ms" aria-label="Profile facts">
          <p class="facts-label">Specimen</p>
          <dl>
            <div
              v-for="fact in cover.facts"
              :key="fact.key"
              class="fact-row"
              :class="{ 'fact-row--highlight': 'highlight' in fact && fact.highlight }"
            >
              <dt class="fact-key">{{ fact.key }}</dt>
              <dd class="fact-value">{{ fact.value }}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <p class="cover-scrollcue rv" style="--rv-d: 420ms">Read on</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { chapters, cover, site } from '../content/site'

const go = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
