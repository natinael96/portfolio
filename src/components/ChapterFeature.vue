<template>
  <section id="feature" class="ch-feature" aria-label="Feature — Air Qua">
    <div class="wrap">
      <div class="folio rv">
        <p class="folio-label"><b>01</b> — Feature</p>
        <p class="folio-label folio-label--right">{{ feature.kicker }}</p>
      </div>

      <h2 class="feature-title">
        <span class="feature-title-line rv">{{ feature.titleTop }}</span>
        <span class="feature-title-line is-italic rv" style="--rv-d: 130ms">
          {{ feature.titleBottom }}
        </span>
      </h2>

      <p class="feature-dek rv" style="--rv-d: 260ms">{{ feature.dek }}</p>

      <div class="feature-grid">
        <div class="rv" style="--rv-d: 120ms">
          <p class="feature-body">
            <strong>{{ featureProject.title }}</strong> is where the two halves of this
            record meet: a biomedical engineering student’s instinct for instruments
            and measurement, shipped as software. Sensors report, the map updates,
            and the city can look at its own air.
          </p>
          <a
            :href="featureProject.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="feature-cta"
          >
            {{ feature.cta }}
            <span class="arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <figure class="plate rv m-0" style="--rv-d: 240ms">
          <figcaption class="plate-caption">
            <span>Fig. 01 — station field, Addis Ababa</span>
            <span>abstracted</span>
          </figcaption>

          <svg
            class="plate-field"
            viewBox="0 0 420 250"
            role="img"
            aria-label="Abstract dot field suggesting air-quality monitoring stations across a city"
          >
            <circle
              v-for="(dot, i) in cityDots"
              :key="`c${i}`"
              class="plate-dot"
              :cx="dot.x"
              :cy="dot.y"
              :r="dot.r"
              :opacity="dot.o"
            />
            <g v-for="(station, i) in stations" :key="`s${i}`">
              <circle
                v-if="i % 2 === 0"
                class="plate-ring"
                :class="`plate-ring--d${(i / 2) % 3 + 1}`"
                :cx="station.x"
                :cy="station.y"
                r="7"
              />
              <circle class="plate-dot plate-dot--station" :cx="station.x" :cy="station.y" r="3" />
            </g>
          </svg>

          <div class="plate-meta">
            <div v-for="row in feature.meta" :key="row.key" class="plate-meta-row">
              <span class="plate-meta-key">{{ row.key }}</span>
              <span
                class="plate-meta-value"
                :class="{ 'plate-meta-value--live': 'live' in row && row.live }"
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

/**
 * Deterministic pseudo-random dot field (same composition every load).
 * Loosely evokes a settled valley: denser toward the middle band.
 */
function makeDots() {
  let seed = 20260522
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }

  const dots: { x: number; y: number; r: number; o: number }[] = []
  for (let i = 0; i < 130; i++) {
    const x = 14 + rand() * 392
    // Bias y toward the vertical center band.
    const y = 20 + ((rand() + rand()) / 2) * 210
    const r = 0.8 + rand() * 1.1
    const o = 0.25 + rand() * 0.5
    dots.push({ x, y, r, o })
  }
  return dots
}

const cityDots = makeDots()

/** Monitoring stations — fixed, hand-placed positions. */
const stations = [
  { x: 96, y: 88 },
  { x: 178, y: 150 },
  { x: 236, y: 74 },
  { x: 292, y: 168 },
  { x: 342, y: 104 },
  { x: 138, y: 196 },
  { x: 58, y: 152 },
]
</script>
