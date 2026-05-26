<template>
  <section
    id="hero"
    class="min-h-[80dvh] flex items-center section-x pt-16 pb-8 sm:pb-10"
  >
    <div class="w-full max-w-[90rem] mx-auto">
      <div
        class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] gap-6 lg:gap-8 xl:gap-9 items-end"
      >
        <div
          class="flex flex-col items-center lg:items-start text-center lg:text-left xl:pr-8 xl:pb-2 xl:border-r border-transparent xl:border-accent/10 max-w-4xl lg:max-w-none"
        >
          <div
            class="flex items-center gap-3 mb-3 w-full justify-center lg:justify-start"
            v-motion="motionEnterUp(0)"
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
            class="font-display text-[clamp(2.1rem,4.8vw,3.5rem)] font-semibold tracking-[-0.04em] text-balance mb-3 text-foreground"
            v-motion="motionEnterDown(120)"
          >
            {{ site.name }}
          </h1>

          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-5"
            v-motion="motionEnterUp(260)"
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
            v-motion="motionEnterUp(400)"
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
          v-motion="motionEnterRight(180)"
          aria-label="Developer profile summary"
        >
          <div class="dev-panel dev-panel--runtime w-full max-w-[24rem]">
            <div class="dev-panel-tabs" aria-hidden="true">
              <span class="dev-panel-tab dev-panel-tab--active">
                <span class="dev-panel-tab-dot" />
                {{ devProfile.tab }}
              </span>
              <span class="dev-panel-tab dev-panel-tab--ghost">readme.md</span>
            </div>

            <div class="dev-panel-topbar">
              <div class="dev-panel-head mb-0">
                <span class="dev-dot dev-dot--close" aria-hidden="true" />
                <span class="dev-dot dev-dot--min" aria-hidden="true" />
                <span class="dev-dot dev-dot--max" aria-hidden="true" />
              </div>
              <span class="dev-panel-branch">{{ devProfile.branch }}</span>
              <span class="dev-panel-path">{{ devProfile.path }}</span>
              <span class="dev-panel-version">v{{ devProfile.version }}</span>
            </div>

            <div class="dev-code-block">
              <p class="dev-code-comment">// runtime snapshot · {{ devProfile.lang }}</p>
              <p class="dev-code-line dev-code-line--dim">
                <span class="dev-line-num">01</span>
                <span class="dev-syntax-keyword">import type</span>
                <span class="dev-syntax-punct"> { </span>
                <span class="dev-syntax-type">DevProfile</span>
                <span class="dev-syntax-punct"> }</span>
                <span class="dev-syntax-keyword"> from</span>
                <span class="dev-syntax-string"> '@/types'</span>
                <span class="dev-syntax-punct">;</span>
              </p>
              <p class="dev-code-line">
                <span class="dev-line-num">02</span>
                <span class="dev-syntax-keyword">const</span>
                <span class="dev-syntax-name"> profile</span>
                <span class="dev-syntax-type">: DevProfile</span>
                <span class="dev-syntax-punct"> = {</span>
              </p>

              <template v-for="(field, i) in devProfile.fields" :key="field.key">
                <p
                  class="dev-code-line"
                  :class="{ 'dev-code-line--highlight': 'highlight' in field && field.highlight }"
                >
                  <span class="dev-line-num">{{ String(i + 3).padStart(2, '0') }}</span>
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
                <span class="dev-line-num">{{ String(devProfile.fields.length + 3).padStart(2, '0') }}</span>
                <span class="dev-syntax-punct">} satisfies DevProfile;</span>
              </p>
              <p class="dev-code-line dev-code-line--cursor">
                <span class="dev-line-num">{{ String(devProfile.fields.length + 4).padStart(2, '0') }}</span>
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
              <span class="dev-footer-meta">
                <span class="dev-footer-label">{{ devProfile.statusLabel }}</span>
                <span class="dev-footer-build">build {{ devProfile.build }}</span>
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { devProfile, heroIntro, heroTech, site } from '../content/site'
import { motionEnterDown, motionEnterRight, motionEnterUp } from '../motion'

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
