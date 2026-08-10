<template>
  <section id="air" class="m-air m-section" aria-label="Channel 01 — Air Qua, featured recording">
    <div class="m-wrap">
      <div class="m-kicker rv" :style="{ '--m-tone': 'var(--mc-air)' }">
        <span><b>CH·01</b> — Environmental · featured recording</span>
        <span class="m-kicker-right m-live" style="--m-tone: var(--mc-air)">Live</span>
      </div>

      <h2 class="m-display m-air-title" style="--m-tone: var(--mc-air)">
        <span class="is-tone rv">{{ feature.titleTop }}</span>
        <span class="is-outline rv" style="--rv-d: 110ms"> {{ feature.titleBottom }}</span>
      </h2>

      <div class="m-air-grid">
        <div class="m-air-left">
          <p class="m-air-dek rv">{{ feature.dek }}</p>
          <p class="m-air-body rv" style="--rv-d: 90ms">
            This is where the record's two halves meet: a biomedical engineering
            student's instinct for instruments and measurement, shipped as
            software — and since September 2025, his job. He leads the
            three-engineer team behind it: architecture, code review, sprint
            planning, and an ingestion pipeline that validates and flags
            anomalies in more than ten thousand readings a day.
          </p>
          <a
            :href="featureProject.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="m-air-cta rv"
            style="--rv-d: 180ms"
          >
            Open live network <span class="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <figure class="m-airfield rv m-0" style="--rv-d: 140ms">
          <figcaption class="m-airfield-head">
            <span>Particulate field — Addis Ababa</span>
            <span>abstracted</span>
          </figcaption>

          <div class="m-airfield-canvas" aria-hidden="true">
            <span
              v-for="(mote, i) in motes"
              :key="`m${i}`"
              class="m-mote"
              :style="mote"
            />
            <span
              v-for="(station, i) in stations"
              :key="`s${i}`"
              class="m-station"
              :style="station"
            />
          </div>

          <div class="m-airfield-meta">
            <div v-for="row in feature.meta" :key="row.key" class="m-airfield-row">
              <span class="m-airfield-key">{{ row.key }}</span>
              <span
                class="m-airfield-value"
                :class="{ 'm-live': 'live' in row && row.live }"
                style="--m-tone: var(--mc-air)"
              >
                {{ row.value }}
              </span>
            </div>
          </div>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { feature, featureProject } from '../content/site'

/** Deterministic particulate field — identical composition every load. */
function makeMotes() {
  let seed = 90338741
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }

  return Array.from({ length: 26 }, () => {
    const size = 2 + rand() * 3.5
    return {
      left: `${4 + rand() * 92}%`,
      top: `${6 + rand() * 86}%`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: String(0.25 + rand() * 0.55),
      '--dx': `${-18 + rand() * 36}px`,
      '--dy': `${-16 + rand() * 32}px`,
      '--dur': `${10 + rand() * 12}s`,
      '--del': `${-rand() * 12}s`,
    }
  })
}

const motes = makeMotes()

/** Monitoring stations — fixed, hand-placed crosses. */
const stations = [
  { left: '18%', top: '30%' },
  { left: '42%', top: '58%' },
  { left: '56%', top: '24%' },
  { left: '70%', top: '66%' },
  { left: '84%', top: '38%' },
  { left: '30%', top: '78%' },
  { left: '10%', top: '60%' },
].map((s) => ({ ...s, color: 'var(--mc-air)' }))
</script>
