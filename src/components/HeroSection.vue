<template>
  <section
    id="hero"
    class="min-h-[92dvh] flex items-center section-x pt-24 pb-12 sm:pb-20"
  >
    <div class="w-full max-w-[90rem] mx-auto">
      <div
        class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] gap-10 lg:gap-12 xl:gap-14 items-end"
      >
        <div
          class="flex flex-col items-center lg:items-start text-center lg:text-left xl:pr-8 xl:pb-2 xl:border-r border-transparent xl:border-accent/10 max-w-4xl lg:max-w-none"
        >
          <div
            class="flex items-center gap-3 mb-5 w-full justify-center lg:justify-start"
            v-motion-fade
          >
            <span class="h-px w-8 sm:w-12 bg-accent/25 shrink-0" aria-hidden="true" />
            <p class="font-mono text-xs sm:text-sm font-medium tracking-[0.12em] uppercase text-accent">
              {{ heroIntro.greeting }}
              <span class="text-foreground-light normal-case tracking-normal font-normal">
                — {{ site.roleLabel }}
              </span>
            </p>
          </div>

          <h1
            class="font-display text-[clamp(2.35rem,5.2vw,3.9rem)] font-semibold tracking-[-0.04em] text-balance mb-5 max-w-[22ch] lg:max-w-[20ch] xl:max-w-none text-foreground"
            v-motion-slide-top
          >
            <span class="block">{{ heroIntro.displayName.primary }}</span>
            <span
              class="block text-[0.68em] sm:text-[0.72em] font-medium text-foreground-light tracking-[-0.03em] mt-1 sm:mt-1.5"
            >
              {{ heroIntro.displayName.secondary }}
            </span>
          </h1>

          <div
            class="hero-signal mb-9 lg:mb-10"
            v-motion-fade
          >
            <div class="hero-signal-accent" aria-hidden="true" />

            <div class="hero-signal-location">
              <span class="hero-signal-dot" aria-hidden="true" />
              <span>{{ heroIntro.manifesto.location }}</span>
            </div>

            <ol class="hero-signal-steps">
              <li
                v-for="(step, index) in heroIntro.manifesto.steps"
                :key="step.label"
                class="hero-signal-step"
              >
                <div class="hero-signal-step-inner">
                  <span class="hero-signal-index">{{ step.index }}</span>
                  <div class="hero-signal-step-copy">
                    <span class="hero-signal-label">{{ step.label }}</span>
                    <span class="hero-signal-detail">{{ step.detail }}</span>
                  </div>
                </div>

                <span
                  v-if="index < heroIntro.manifesto.steps.length - 1"
                  class="hero-signal-connector"
                  aria-hidden="true"
                >
                  <span class="hero-signal-connector-line" />
                  <span class="hero-signal-connector-arrow">→</span>
                </span>
              </li>
            </ol>

            <p class="hero-signal-footnote">{{ heroIntro.footnote }}</p>
          </div>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-9"
            v-motion-fade
          >
            <button type="button" class="btn-primary" @click="scrollTo('projects')">
              View work
            </button>
            <button type="button" class="btn-secondary" @click="scrollTo('contact')">
              Get in touch
            </button>
          </div>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-2.5 max-w-xl lg:max-w-2xl"
            v-motion-fade
          >
            <span
              v-for="tech in heroTech"
              :key="tech"
              class="select-none rounded-md border border-accent/10 bg-accent-fg/65 px-3 py-1.5 font-mono text-[0.8125rem] font-medium text-foreground-light"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <aside
          class="flex w-full justify-center lg:justify-start pb-2"
          v-motion-fade
          aria-label="Developer profile summary"
        >
          <div class="dev-panel dev-panel--runtime w-full max-w-[24rem]">
            <div class="dev-panel-topbar">
              <div class="dev-panel-head mb-0">
                <span class="dev-dot dev-dot--close" aria-hidden="true" />
                <span class="dev-dot dev-dot--min" aria-hidden="true" />
                <span class="dev-dot dev-dot--max" aria-hidden="true" />
              </div>
              <span class="dev-panel-path">{{ devProfile.path }}</span>
              <span class="dev-panel-version">v{{ devProfile.version }}</span>
            </div>

            <div class="dev-code-block">
              <p class="dev-code-comment">// runtime snapshot</p>
              <p class="dev-code-line">
                <span class="dev-line-num">01</span>
                <span class="dev-syntax-keyword">const</span>
                <span class="dev-syntax-name"> profile</span>
                <span class="dev-syntax-punct"> = {</span>
              </p>

              <template v-for="(field, i) in devProfile.fields" :key="field.key">
                <p
                  class="dev-code-line"
                  :class="{ 'dev-code-line--highlight': 'highlight' in field && field.highlight }"
                >
                  <span class="dev-line-num">{{ String(i + 2).padStart(2, '0') }}</span>
                  <span class="dev-syntax-key">{{ field.key }}</span>
                  <span class="dev-syntax-punct">:</span>
                  <template v-if="'values' in field && field.values">
                    <span class="dev-syntax-punct"> [</span>
                    <span
                      v-for="(item, j) in field.values"
                      :key="item"
                      class="dev-syntax-string"
                    >
                      "{{ item }}"<span v-if="j < field.values.length - 1" class="dev-syntax-punct">, </span>
                    </span>
                    <span class="dev-syntax-punct">]</span>
                  </template>
                  <template v-else-if="'value' in field">
                    <span
                      class="dev-syntax-string"
                      :class="{ 'dev-syntax-string--live': 'highlight' in field && field.highlight }"
                    >
                      "{{ field.value }}"
                    </span>
                  </template>
                  <span class="dev-syntax-punct">,</span>
                </p>
              </template>

              <p class="dev-code-line">
                <span class="dev-line-num">{{ String(devProfile.fields.length + 2).padStart(2, '0') }}</span>
                <span class="dev-syntax-punct">};</span>
              </p>
              <p class="dev-code-line dev-code-line--cursor">
                <span class="dev-line-num">{{ String(devProfile.fields.length + 3).padStart(2, '0') }}</span>
                <span class="dev-syntax-keyword">export default</span>
                <span class="dev-syntax-name"> profile</span>
                <span class="dev-syntax-punct">;</span>
                <span class="dev-cursor" aria-hidden="true" />
              </p>
            </div>

            <div class="dev-panel-footer">
              <span class="dev-status-pill">
                <span class="dev-status-dot" aria-hidden="true" />
                {{ devProfile.status }}
              </span>
              <span class="dev-footer-label">{{ devProfile.statusLabel }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { devProfile, heroIntro, heroTech, site } from '../content/site'

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
