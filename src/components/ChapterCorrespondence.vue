<template>
  <section id="correspondence" class="ch" aria-label="Correspondence — contact">
    <div class="wrap">
      <div class="folio rv">
        <p class="folio-label"><b>05</b> — Correspondence</p>
        <p class="folio-label folio-label--right">tz Africa/Addis_Ababa</p>
      </div>

      <h2 class="corr-write rv">Write.</h2>
      <a :href="`mailto:${site.email}`" class="corr-email rv" style="--rv-d: 130ms">
        {{ site.email }}
      </a>

      <div class="corr-grid">
        <p class="corr-note rv" style="--rv-d: 100ms">{{ correspondence.dek }}</p>

        <ul class="chan-list rv" style="--rv-d: 200ms">
          <li v-for="channel in correspondence.channels" :key="channel.name" class="chan-item">
            <a
              :href="channel.url"
              target="_blank"
              rel="noopener noreferrer"
              class="chan-link"
            >
              <span class="chan-name">{{ channel.name }}</span>
              <span class="chan-slug">{{ channel.slug }}</span>
              <span class="chan-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>

      <footer class="colophon rv">
        <p class="colophon-note">
          © {{ year }} {{ site.name }} — set in Fraunces, Geist &amp; Geist Mono.
          Written and built with Vue in Addis Ababa.
        </p>
        <div class="colophon-actions">
          <button type="button" class="colophon-link" @click="$emit('play')">
            Bored? Play snake
          </button>
          <button type="button" class="colophon-link" @click="scrollToTop">
            Back to top ↑
          </button>
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
