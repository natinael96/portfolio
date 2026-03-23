<template>
  <section id="contact" class="section-y-loose section-x bg-accent-muted/30">
    <div class="max-w-[90rem] mx-auto">
      <header
        class="mb-12 sm:mb-16 lg:mb-20 lg:grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-16 items-end"
      >
        <div>
          <p class="text-xs font-semibold tracking-[0.18em] uppercase text-accent/80 mb-3">
            Contact
          </p>
          <h2 class="font-display text-4xl sm:text-5xl font-normal text-foreground mb-4 tracking-display">
            Get in touch
          </h2>
          <p class="text-foreground-light text-base sm:text-lg leading-relaxed max-w-xl">
            Hiring, collaboration, or a technical question—send a note and I’ll reply when I can.
          </p>
        </div>
      </header>

      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start"
      >
        <aside
          class="lg:col-span-4 lg:col-start-1 lg:row-start-1 flex flex-col gap-10 order-2 lg:order-1"
        >
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
                  <component :is="social.icon" :size="22" class="text-accent/70" />
                  <span class="font-medium text-foreground">{{ social.name }}</span>
                </a>
              </li>
            </ul>
          </div>

          <div :class="profileLinks.length > 0 ? 'pt-8 border-t border-accent/12' : ''">
            <h3 class="text-xs font-semibold tracking-[0.14em] uppercase text-foreground-light mb-2">
              Direct email
            </h3>
            <a
              :href="`mailto:${EMAIL}`"
              class="link-inline break-all py-1 text-lg font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline"
            >
              {{ EMAIL }}
            </a>
          </div>
        </aside>

        <div
          class="lg:col-span-7 lg:col-start-6 xl:col-start-6 border border-accent/12 rounded-2xl sm:rounded-3xl p-7 sm:p-8 lg:p-10 bg-accent-fg/70 order-1 lg:order-2"
        >
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div
              v-if="submitStatus === 'success'"
              role="status"
              aria-live="polite"
              class="rounded-xl border border-emerald-200/80 bg-emerald-50/90 p-4"
            >
              <p class="text-sm font-medium text-emerald-900">
                Thanks—your message went through.
              </p>
            </div>
            <div
              v-if="submitStatus === 'error'"
              role="alert"
              aria-live="assertive"
              class="rounded-xl border border-red-200/80 bg-red-50/90 p-4"
            >
              <p class="text-sm font-medium text-red-900">
                Something failed. Try again or use the email below.
              </p>
            </div>

            <div>
              <label for="name" class="block text-sm font-semibold text-foreground mb-2">
                Name
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                autocomplete="name"
                :disabled="isSubmitting"
                class="input-field"
                placeholder="Your name"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                :disabled="isSubmitting"
                class="input-field"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-semibold text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                :disabled="isSubmitting"
                rows="5"
                class="textarea-field"
                placeholder="What are you building?"
              />
            </div>

            <button
              type="submit"
              class="btn-submit"
              :disabled="isSubmitting"
              :aria-busy="isSubmitting"
            >
              <span v-if="isSubmitting" class="inline-flex items-center gap-2">
                <span
                  class="h-4 w-4 animate-spin rounded-full border-2 border-accent-fg/35 border-t-accent-fg motion-reduce:animate-none motion-reduce:border-t-transparent motion-reduce:opacity-60"
                  aria-hidden="true"
                />
                Sending…
              </span>
              <span v-else>Send message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Code2, Github, Linkedin, Send, Twitter } from 'lucide-vue-next'
import { site } from '../content/site'

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
const USE_FORMSPREE = !!FORM_ENDPOINT

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

const form = ref({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const handleSubmit = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    if (USE_FORMSPREE) {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.value.name,
          email: form.value.email,
          message: form.value.message,
          _replyto: form.value.email,
          _subject: `Portfolio Contact from ${form.value.name}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        submitStatus.value = 'success'
        form.value = { name: '', email: '', message: '' }
        setTimeout(() => {
          submitStatus.value = 'idle'
        }, 5000)
      } else {
        throw new Error(data.error || 'Form submission failed')
      }
    } else {
      const subject = encodeURIComponent(`Portfolio Contact: ${form.value.name}`)
      const body = encodeURIComponent(
        `Name: ${form.value.name}\nEmail: ${form.value.email}\n\nMessage:\n${form.value.message}`
      )
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`

      submitStatus.value = 'success'
      form.value = { name: '', email: '', message: '' }

      setTimeout(() => {
        submitStatus.value = 'idle'
      }, 5000)
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    submitStatus.value = 'error'

    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>
