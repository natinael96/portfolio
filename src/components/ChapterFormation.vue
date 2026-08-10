<template>
  <section id="formation" class="ch" aria-label="Formation — education and training">
    <div class="wrap">
      <div class="folio rv">
        <p class="folio-label"><b>03</b> — Formation</p>
        <p class="folio-label folio-label--right">2022 — 2026</p>
      </div>

      <h2 class="ch-title rv">A biomedical route <em>into software</em>.</h2>

      <div class="form-grid mt-12 sm:mt-16">
        <div class="form-essay rv" style="--rv-d: 100ms">
          <p v-for="(paragraph, i) in formation.paragraphs" :key="i">{{ paragraph }}</p>
        </div>

        <aside class="form-margin">
          <div class="form-margin-block rv" style="--rv-d: 180ms">
            <p class="form-margin-label">{{ formation.coursework.label }}</p>
            <ol class="form-course-list">
              <li v-for="item in formation.coursework.items" :key="item">{{ item }}</li>
            </ol>
          </div>

          <div class="rv" style="--rv-d: 260ms">
            <p class="form-margin-label mb-3">Alongside the degree</p>
            <article
              v-for="program in formation.programs"
              :key="program.id"
              class="form-program"
            >
              <div class="form-program-head">
                <h3 class="form-program-name">
                  <a
                    :href="program.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-quiet"
                  >
                    {{ program.name }}
                  </a>
                </h3>
                <span class="form-program-period">{{ program.period }}</span>
              </div>
              <p class="form-program-role">{{ program.role }}</p>
              <p class="form-program-note">{{ program.note }}</p>
            </article>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formation } from '../content/site'
</script>
