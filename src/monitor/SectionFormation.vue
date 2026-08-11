<template>
  <section id="formation" class="m-formation m-section" aria-label="Channel 06 — formation, education and training">
    <div class="m-wrap">
      <div class="m-kicker rv" :style="{ '--m-tone': 'var(--mc-form)' }">
        <span><b>CH·06</b> — Formation · study &amp; training</span>
        <span class="m-kicker-right">2022 — 2026</span>
      </div>

      <h2 class="m-display m-formation-title" style="--m-tone: var(--mc-form)">
        <span class="rv">Engineering,</span>
        <span class="is-tone rv" style="--rv-d: 100ms"> twice over.</span>
      </h2>

      <div class="m-cal-grid">
        <div class="m-cal-paper rv" style="--rv-d: 120ms">
          <p v-for="(paragraph, i) in formation.paragraphs" :key="i">{{ paragraph }}</p>
        </div>

        <aside>
          <div class="rv" style="--rv-d: 200ms">
            <p class="m-cal-margin-label">{{ formation.coursework.label }}</p>
            <ul class="m-cal-list">
              <li v-for="item in formation.coursework.items" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="rv" style="--rv-d: 280ms">
            <p class="m-cal-subhead">Alongside the degree</p>
            <article
              v-for="program in formation.programs"
              :key="program.id"
              class="m-cal-cert"
            >
              <div class="m-cal-cert-head">
                <h3 class="m-cal-cert-name">
                  <a :href="program.url" target="_blank" rel="noopener noreferrer">
                    {{ program.name }}
                  </a>
                </h3>
                <span class="m-cal-cert-period">{{ program.period }}</span>
              </div>
              <p class="m-cal-cert-role">{{ program.role }}</p>
              <p class="m-cal-cert-note">{{ program.note }}</p>
              <a
                v-if="program.certUrl"
                :href="program.certUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="m-cal-cert-link"
              >
                certificate ↗
              </a>
            </article>

            <article class="m-cal-cert">
              <div class="m-cal-cert-head">
                <h3 class="m-cal-cert-name">{{ formation.leadership.role }}</h3>
                <span class="m-cal-cert-period">{{ formation.leadership.period }}</span>
              </div>
              <p class="m-cal-cert-note">{{ formation.leadership.org }}</p>
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
