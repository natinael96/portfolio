<template>
  <section id="practice" class="ch" aria-label="Practice — professional work">
    <div class="wrap">
      <div class="folio rv">
        <p class="folio-label"><b>02</b> — Practice</p>
        <p class="folio-label folio-label--right">2024 — present</p>
      </div>

      <h2 class="ch-title rv">The <em>practice</em>.</h2>
      <p class="ch-dek rv" style="--rv-d: 120ms">{{ practice.dek }}</p>

      <div class="mt-12 sm:mt-16">
        <article
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="prac-row rv"
          :style="{ '--rv-d': `${index * 90}ms` }"
        >
          <div>
            <p class="prac-period">{{ exp.period }}</p>
            <p v-if="exp.location" class="prac-location">{{ exp.location }}</p>
          </div>

          <div>
            <h3 class="prac-role">{{ exp.role }}</h3>
            <p class="prac-org">
              <a
                v-if="exp.companyUrl"
                :href="exp.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="link-quiet"
              >
                {{ exp.company }}
              </a>
              <template v-else>{{ exp.company }}</template>
            </p>
            <ul v-if="exp.bullets?.length" class="prac-bullets">
              <li v-for="(item, i) in exp.bullets" :key="i">{{ item }}</li>
            </ul>
            <p v-else-if="exp.summary" class="prac-bullets">{{ exp.summary }}</p>
          </div>

          <aside v-if="exp.stat" class="prac-stat" aria-label="Highlight">
            <span class="prac-stat-value">{{ exp.stat.value }}</span>
            <span class="prac-stat-caption">{{ exp.stat.caption }}</span>
          </aside>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { experiences, practice } from '../content/site'
</script>
