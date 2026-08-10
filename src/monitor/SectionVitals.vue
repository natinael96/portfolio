<template>
  <section id="vitals" class="m-vitals m-section" aria-label="Channel 02 — hypertension monitoring, final-year project">
    <div class="m-wrap">
      <div class="m-kicker rv" :style="{ '--m-tone': 'var(--mc-vitals)' }">
        <span><b>CH·02</b> — Biomedical · final-year project</span>
        <span class="m-kicker-right">{{ vitals.period }}</span>
      </div>

      <h2 class="m-display m-vitals-title" style="--m-tone: var(--mc-vitals)">
        <span class="is-tone rv">Vital signs,</span>
        <span class="is-outline rv" style="--rv-d: 100ms"> literally.</span>
      </h2>

      <div class="m-vitals-grid">
        <div>
          <p class="m-vitals-dek rv">{{ vitals.dek }}</p>
          <p class="m-vitals-body rv" style="--rv-d: 90ms">{{ vitals.body }}</p>

          <div class="m-vitals-grade rv" style="--rv-d: 170ms">
            <span class="m-vitals-grade-badge">{{ vitals.grade }}</span>
            <span class="m-vitals-grade-note">{{ vitals.gradeNote }}</span>
          </div>

          <a
            :href="vitals.github"
            target="_blank"
            rel="noopener noreferrer"
            class="m-vitals-link rv"
            style="--rv-d: 240ms"
          >
            source ↗
          </a>
        </div>

        <figure class="m-chainpanel rv m-0" style="--rv-d: 140ms">
          <figcaption class="m-chainpanel-head">
            <span>Signal chain — five-layer system</span>
            <span class="m-live" style="--m-tone: var(--mc-vitals)">Streaming</span>
          </figcaption>

          <div v-for="layer in vitals.chain" :key="layer.code" class="m-chain-row">
            <span class="m-chain-code">{{ layer.code }}</span>
            <span class="m-chain-name">{{ layer.name }}</span>
            <span v-if="layer.detail" class="m-chain-detail">{{ layer.detail }}</span>
          </div>

          <div class="m-chainpanel-foot">
            <span class="m-rate">{{ vitals.rate }}</span>
            <span class="m-rate-caption">{{ vitals.rateCaption }}</span>
          </div>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { vitals } from '../content/site'
</script>
