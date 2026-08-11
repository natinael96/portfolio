<template>
  <section id="practice" class="m-practice m-section" aria-label="Channel 02 — recorded sessions">
    <div class="m-wrap">
      <div class="m-kicker rv" :style="{ '--m-tone': 'var(--mc-work)' }">
        <span><b>CH·02</b> — Practice · recorded sessions</span>
        <span class="m-kicker-right">2024 — present</span>
      </div>

      <h2 class="m-display m-practice-title" style="--m-tone: var(--mc-work)">
        <span class="rv">Recorded</span>
        <span class="is-tone rv" style="--rv-d: 100ms"> sessions.</span>
      </h2>

      <figure class="m-gantt rv m-0" style="--rv-d: 180ms" role="img" :aria-label="ganttAlt">
        <figcaption class="m-gantt-head">
          <span>{{ practiceTimeline.startLabel }}</span>
          <span>Session plot — {{ practiceTimeline.totalMonths }} months</span>
          <span>{{ practiceTimeline.endLabel }}</span>
        </figcaption>
        <div class="m-gantt-body" :style="{ '--m-cols': practiceTimeline.totalMonths }">
          <div v-for="session in plotted" :key="session.expId" class="m-gantt-row">
            <span
              class="m-gantt-bar"
              :class="{ 'is-ongoing': session.ongoing }"
              :style="{ left: session.left, width: session.width }"
            >
              {{ session.company }}<template v-if="session.ongoing"> →</template>
            </span>
          </div>
        </div>
      </figure>

      <div class="m-sessions">
        <article
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="m-session rv"
          :style="{ '--rv-d': `${index * 80}ms` }"
        >
          <div>
            <p class="m-session-period">{{ exp.period }}</p>
            <p v-if="exp.location" class="m-session-loc">{{ exp.location }}</p>
          </div>

          <div>
            <h3 class="m-session-role">{{ exp.role }}</h3>
            <p class="m-session-org">
              <a
                v-if="exp.companyUrl"
                :href="exp.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ exp.company }}
              </a>
              <template v-else>{{ exp.company }}</template>
            </p>
            <ul v-if="exp.bullets?.length" class="m-loglines">
              <li v-for="(item, i) in exp.bullets" :key="i">{{ item }}</li>
            </ul>
          </div>

          <aside v-if="exp.stat" class="m-session-stat" aria-label="Highlight">
            <span class="m-session-stat-value">{{ exp.stat.value }}</span>
            <span class="m-session-stat-caption">{{ exp.stat.caption }}</span>
          </aside>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { experiences, practiceTimeline } from '../content/site'

const byId = new Map(experiences.map((exp) => [exp.id, exp]))

const plotted = practiceTimeline.sessions.map((session) => ({
  ...session,
  company: byId.get(session.expId)?.company ?? session.expId,
  left: `${(session.from / practiceTimeline.totalMonths) * 100}%`,
  width: `${((session.to - session.from) / practiceTimeline.totalMonths) * 100}%`,
}))

const ganttAlt = `Timeline of roles from ${practiceTimeline.startLabel} to ${practiceTimeline.endLabel}: ${plotted
  .map((s) => byId.get(s.expId)?.company)
  .join(', ')}`
</script>
