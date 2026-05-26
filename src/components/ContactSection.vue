<template>
  <section id="contact" class="section-y section-x border-y border-accent/10">
    <div class="max-w-3xl mx-auto lg:max-w-[90rem]">
      <header
        class="mb-5 sm:mb-6 lg:mb-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6"
        v-motion="motionVisibleOnceUp(0)"
      >
        <div class="max-w-xl">
          <p class="font-mono text-xs font-medium tracking-[0.16em] uppercase text-accent/80 mb-2">
            Contact
          </p>
          <h2 class="font-display text-3xl sm:text-4xl font-medium text-foreground mb-1.5 tracking-tight">
            Get in touch
          </h2>
          <p class="font-mono text-sm text-foreground-light">
            <span class="text-accent/70">//</span> hiring, collaboration, or technical questions
          </p>
        </div>
        <p class="contact-meta font-mono text-xs sm:text-right">
          {{ profileLinks.length + 1 }} channels · inbox open
        </p>
      </header>

      <div class="dev-panel dev-panel--runtime contact-panel" v-motion="motionVisibleOnceUp(120)">
        <div class="dev-panel-tabs" aria-hidden="true">
          <span class="dev-panel-tab dev-panel-tab--active">
            <span class="dev-panel-tab-dot" />
            channels.json
          </span>
          <span class="dev-panel-tab dev-panel-tab--ghost">draft.md</span>
        </div>

        <div class="dev-panel-topbar">
          <div class="dev-panel-head mb-0">
            <span class="dev-dot dev-dot--close" aria-hidden="true" />
            <span class="dev-dot dev-dot--min" aria-hidden="true" />
            <span class="dev-dot dev-dot--max" aria-hidden="true" />
          </div>
          <span class="dev-panel-branch">open</span>
          <span class="dev-panel-path">contact/channels.json</span>
        </div>

        <div class="contact-manifest">
          <article class="contact-row contact-row--primary">
            <div class="contact-row-head">
              <span class="contact-index">01</span>
              <Mail :size="15" class="contact-row-icon" stroke-width="2" aria-hidden="true" />
              <span class="contact-cat">Email</span>
            </div>
            <a
              :href="`mailto:${EMAIL}`"
              class="contact-link contact-link--email"
            >
              <span class="contact-link-key">to</span>
              <span class="contact-link-value">{{ EMAIL }}</span>
              <ArrowUpRight :size="14" class="contact-link-arrow" aria-hidden="true" />
            </a>
          </article>

          <article
            v-for="(social, index) in profileLinks"
            :key="social.name"
            class="contact-row"
            v-motion="motionVisibleOnceUp(180 + index * 70)"
          >
            <div class="contact-row-head">
              <span class="contact-index">{{ String(index + 2).padStart(2, '0') }}</span>
              <component
                :is="social.icon"
                :size="15"
                class="contact-row-icon"
                stroke-width="2"
                aria-hidden="true"
              />
              <span class="contact-cat">{{ social.name }}</span>
            </div>
            <a
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link"
            >
              <span class="contact-link-key">url</span>
              <span class="contact-link-value">{{ social.slug }}</span>
              <ArrowUpRight :size="14" class="contact-link-arrow" aria-hidden="true" />
            </a>
          </article>
        </div>

        <div class="dev-panel-footer">
          <span class="dev-status-pill">
            <span class="dev-status-dot" aria-hidden="true" />
            accepting
          </span>
          <span class="dev-footer-meta">
            <span class="dev-footer-label">reply within 48h</span>
            <span class="dev-footer-build">tz Africa/Addis_Ababa</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { ArrowUpRight, Code2, Github, Linkedin, Mail, Send, Twitter } from 'lucide-vue-next'
import { site } from '../content/site'
import { motionVisibleOnceUp } from '../motion'

const EMAIL = site.email

interface ProfileLink {
  name: string
  url: string
  slug: string
  icon: Component
}

const profileLinks = computed<ProfileLink[]>(() => {
  const entries: Omit<ProfileLink, 'slug'>[] = [
    { name: 'GitHub', url: site.social.github, icon: Github },
    { name: 'LinkedIn', url: site.social.linkedin, icon: Linkedin },
    { name: 'Twitter / X', url: site.social.twitter, icon: Twitter },
    { name: 'LeetCode', url: site.social.leetcode, icon: Code2 },
    { name: 'Telegram', url: site.social.telegram, icon: Send },
  ]

  return entries
    .filter((entry) => typeof entry.url === 'string' && entry.url.length > 0 && entry.url.startsWith('http'))
    .map((entry) => ({
      ...entry,
      slug: entry.url.replace(/^https?:\/\/(www\.)?/, ''),
    }))
})
</script>
