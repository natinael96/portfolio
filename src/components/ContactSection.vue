<template>
  <section id="contact" class="section-y-loose section-x bg-accent-subtle/35">
    <div class="max-w-[90rem] mx-auto">
      <header class="mb-12 sm:mb-16 lg:mb-20 max-w-2xl">
        <p class="font-mono text-xs font-medium tracking-[0.16em] uppercase text-accent/80 mb-3">
          Contact
        </p>
        <h2 class="font-display text-4xl sm:text-5xl font-medium text-foreground mb-4 tracking-tight">
          Get in touch
        </h2>
        <p class="text-foreground-light text-base sm:text-lg leading-relaxed">
          Hiring, collaboration, or a technical question—reach out by email or on the profiles below.
        </p>
      </header>

      <div class="max-w-xl flex flex-col gap-10">
        <div>
          <h3 class="text-xs font-semibold tracking-[0.14em] uppercase text-foreground-light mb-2">
            Direct email
          </h3>
          <a
            :href="`mailto:${EMAIL}`"
            class="link-inline break-all py-1 text-lg font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            {{ EMAIL }}
          </a>
        </div>

        <div v-if="profileLinks.length > 0">
          <h3 class="text-xs font-semibold tracking-[0.14em] uppercase text-foreground-light mb-5">
            Profiles
          </h3>
          <ul class="flex flex-col gap-2">
            <li v-for="social in profileLinks" :key="social.name">
              <a
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="profile-link-card"
              >
                <component :is="social.icon" :size="22" class="text-accent/55" />
                <span class="font-medium text-foreground">{{ social.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Code2, Github, Linkedin, Send, Twitter } from 'lucide-vue-next'
import { site } from '../content/site'

const EMAIL = site.email

const profileLinks = computed(() => {
  const entries = [
    { name: 'GitHub', url: site.social.github, icon: Github },
    { name: 'LinkedIn', url: site.social.linkedin, icon: Linkedin },
    { name: 'Twitter / X', url: site.social.twitter, icon: Twitter },
    { name: 'LeetCode', url: site.social.leetcode, icon: Code2 },
    { name: 'Telegram', url: site.social.telegram, icon: Send },
  ]
  return entries.filter(
    (e) => typeof e.url === 'string' && e.url.length > 0 && e.url.startsWith('http')
  )
})
</script>
