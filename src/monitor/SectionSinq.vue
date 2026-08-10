<template>
  <section id="sinq" class="m-sinq m-section" aria-label="Channel 04 — Sinq, offline prayer book app">
    <div class="m-wrap">
      <div class="m-kicker rv" :style="{ '--m-tone': 'var(--mc-sinq)' }">
        <span><b>CH·04</b> — Personal · Android</span>
        <span class="m-kicker-right">{{ sinq.period }}</span>
      </div>

      <div class="m-sinq-mast">
        <h2 class="m-sinq-geez rv" lang="am">{{ sinq.geez }}</h2>
        <span class="m-sinq-latin rv" style="--rv-d: 110ms" aria-hidden="true">{{ sinq.latin }}</span>
      </div>
      <p class="m-sinq-gloss rv" style="--rv-d: 180ms">{{ sinq.gloss }}</p>

      <div class="m-sinq-grid">
        <div>
          <p class="m-sinq-dek rv">{{ sinq.dek }}</p>
          <p class="m-sinq-body rv" style="--rv-d: 90ms">{{ sinq.body }}</p>
          <a
            :href="sinq.github"
            target="_blank"
            rel="noopener noreferrer"
            class="m-sinq-link rv"
            style="--rv-d: 170ms"
          >
            source ↗
          </a>
        </div>

        <figure class="m-folds rv m-0" style="--rv-d: 140ms">
          <figcaption class="m-folds-head">{{ sinq.searchTitle }}</figcaption>
          <div v-for="(fold, i) in sinq.folds" :key="i" class="m-fold-row" lang="am">
            <template v-for="(glyph, j) in fold" :key="glyph">
              <span v-if="j > 0" class="m-fold-eq" aria-hidden="true">≡</span>
              <span class="m-fold-glyph">{{ glyph }}</span>
            </template>
          </div>
          <p class="m-folds-note">{{ sinq.searchNote }}</p>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { sinq } from '../content/site'
</script>
