<template>
  <section id="subject" class="m-subject m-wrap" aria-label="Profile — Natinael Mequanent Shebabaw">
    <div>
      <div class="m-subject-top rv">
        <span>{{ monitorSubject.tag }}</span>
        <span class="m-live" style="--m-tone: var(--mc-work)">Open to work</span>
      </div>

      <h1 class="m-display m-subject-name">
        <span class="rv">Natinael</span>
        <span class="l2 rv" style="--rv-d: 100ms">Mequanent</span>
        <span class="rv" style="--rv-d: 200ms">Shebabaw</span>
      </h1>

      <p class="m-subject-role rv" style="--rv-d: 260ms">
        <span class="m-subject-role-title">Software developer</span>
        <span class="m-subject-role-what">backend &amp; real-time web systems</span>
        <span class="m-subject-role-meta">Addis Ababa · remote-ready</span>
      </p>

      <div class="m-heartline rv" style="--rv-d: 300ms" aria-hidden="true">
        <svg viewBox="0 0 1200 56" preserveAspectRatio="none">
          <g class="m-heartline-move">
            <path class="m-heartline-path" :d="ecgPath" />
          </g>
        </svg>
        <span class="m-heartline-meta">{{ monitorSubject.since }} · signal steady</span>
      </div>

      <p class="m-display m-subject-pitch rv" style="--m-tone: var(--mc-work); --rv-d: 340ms">
        <span class="is-tone">Real-time dashboards, resilient APIs&nbsp;</span>
        <span class="is-outline">— built, shipped, led.</span>
      </p>

      <div class="m-subject-ctas rv" style="--rv-d: 420ms">
        <a class="m-cta-primary" :href="`mailto:${site.email}`">Start a project ✉</a>
        <button type="button" class="m-cta-ghost" @click="seeWork">See it live ↓</button>
      </div>

      <div class="m-subject-foot">
        <p class="m-subject-brief rv" style="--rv-d: 380ms">
          <strong>Software developer in Addis Ababa.</strong>
          Two-plus years shipping for clients in Norway, Ethiopia, and the
          open web — currently leading the three-engineer team behind a live,
          city-wide air-quality network.
        </p>

        <dl class="m-readouts rv" style="--rv-d: 460ms">
          <div
            v-for="readout in monitorSubject.readouts"
            :key="readout.key"
            class="m-readout"
            :class="{ 'is-live': 'live' in readout && readout.live }"
          >
            <dt>{{ readout.key }}</dt>
            <dd>{{ readout.value }}</dd>
          </div>
        </dl>
      </div>

      <p class="m-scrollcue rv" style="--rv-d: 540ms">Scroll to review record</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { monitorSubject, site } from '../content/site'

const seeWork = () => {
  document.getElementById('air')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** One heartbeat every 200 units; two identical halves make the sweep seamless. */
const unit = 'h56 l8,-5 l8,5 h24 l6,-22 l8,42 l6,-24 l4,4 h52 l8,-6 l8,6 h12'
const ecgPath = `M0,32 ${unit} ${unit} ${unit} ${unit} ${unit} ${unit}`
</script>
