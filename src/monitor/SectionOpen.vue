<template>
  <section id="open" class="m-open m-section" aria-label="Channel 07 — signal open, contact">
    <div class="m-wrap">
      <div class="m-kicker rv" :style="{ '--m-tone': 'var(--mc-open)' }">
        <span><b>CH·07</b> — Signal · correspondence</span>
        <span class="m-kicker-right">tz Africa/Addis_Ababa</span>
      </div>

      <h2 class="m-display m-open-title">
        <span class="rv">The signal</span>
        <span class="is-tone rv" style="--m-tone: var(--mc-open); --rv-d: 100ms"> stays open.</span>
      </h2>

      <a :href="`mailto:${site.email}`" class="m-open-email rv" style="--rv-d: 180ms">
        {{ site.email }}
      </a>

      <div class="m-open-grid">
        <p class="m-open-note rv" style="--rv-d: 120ms">{{ correspondence.dek }}</p>

        <ul class="m-chan rv" style="--rv-d: 200ms">
          <li v-for="channel in correspondence.channels" :key="channel.name">
            <a :href="channel.url" target="_blank" rel="noopener noreferrer">
              <span class="m-chan-name">{{ channel.name }}</span>
              <span class="m-chan-slug">{{ channel.slug }}</span>
              <span class="m-chan-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>

      <footer class="m-colophon rv">
        <p>
          © {{ year }} {{ site.name }} — instrument assembled with Vue in Addis
          Ababa. Set in Anton, Archivo &amp; IBM Plex Mono.
        </p>
        <div class="m-colophon-actions">
          <button type="button" @click="$emit('play')">Bored? Play snake</button>
          <a href="/old">Previous edition</a>
          <button type="button" @click="scrollToTop">Back to top ↑</button>
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { correspondence, site } from '../content/site'

defineEmits<{ play: [] }>()

const year = new Date().getFullYear()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
