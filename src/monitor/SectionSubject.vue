<template>
  <section id="subject" class="m-subject m-wrap" aria-label="Subject — Natinael Mequanent Shebabaw">
    <div>
      <div class="m-subject-top rv">
        <span>{{ monitorSubject.tag }}</span>
        <span class="m-live" style="--m-tone: var(--mc-open)">Rec</span>
      </div>

      <h1 class="m-display m-subject-name">
        <span class="rv">Natinael</span>
        <span class="l2 rv" style="--rv-d: 100ms">Mequanent</span>
        <span class="rv" style="--rv-d: 200ms">Shebabaw</span>
      </h1>

      <div class="m-heartline rv" style="--rv-d: 300ms" aria-hidden="true">
        <svg viewBox="0 0 1200 56" preserveAspectRatio="none">
          <g class="m-heartline-move">
            <path class="m-heartline-path" :d="ecgPath" />
          </g>
        </svg>
        <span class="m-heartline-meta">{{ monitorSubject.since }} · sinus rhythm</span>
      </div>

      <div class="m-subject-foot">
        <p class="m-subject-brief rv" style="--rv-d: 380ms">
          <strong>Software developer in Addis Ababa.</strong>
          Trained on the human body — signal processing, medical imaging,
          applied electronics — now leading a three-engineer team that
          instruments the air over his own city.
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
import { monitorSubject } from '../content/site'

/** One heartbeat every 200 units; two identical halves make the sweep seamless. */
const unit = 'h56 l8,-5 l8,5 h24 l6,-22 l8,42 l6,-24 l4,4 h52 l8,-6 l8,6 h12'
const ecgPath = `M0,32 ${unit} ${unit} ${unit} ${unit} ${unit} ${unit}`
</script>
