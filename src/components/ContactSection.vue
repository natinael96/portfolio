<template>
  <section id="contact" class="section-y section-x bg-accent-muted/30">
    <div class="max-w-7xl mx-auto">
      <header class="mb-12 sm:mb-16 max-w-3xl">
        <h2 class="font-display text-4xl sm:text-5xl font-light text-foreground mb-4 tracking-tight">
          Get in touch
        </h2>
        <p class="text-foreground-light text-lg leading-relaxed max-w-2xl">
          Share a short note about your project or role—I read everything.
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div class="lg:col-span-7 border border-accent/12 rounded-2xl p-7 sm:p-8 bg-accent-fg/70">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div v-if="submitStatus === 'success'" class="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/90">
              <p class="text-emerald-800 text-sm font-medium">
                Thanks—your message went through.
              </p>
            </div>
            <div v-if="submitStatus === 'error'" class="p-4 rounded-xl border border-red-200/80 bg-red-50/90">
              <p class="text-red-800 text-sm font-medium">
                Something failed. Try again or email directly below.
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
                :disabled="isSubmitting"
                class="w-full px-4 py-3 rounded-lg border border-accent/15 bg-accent-fg text-foreground placeholder:text-foreground-light/50 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent/45 focus:ring-2 focus:ring-accent/15 disabled:opacity-50 disabled:cursor-not-allowed"
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
                :disabled="isSubmitting"
                class="w-full px-4 py-3 rounded-lg border border-accent/15 bg-accent-fg text-foreground placeholder:text-foreground-light/50 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent/45 focus:ring-2 focus:ring-accent/15 disabled:opacity-50 disabled:cursor-not-allowed"
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
                class="w-full px-4 py-3 rounded-lg border border-accent/15 bg-accent-fg text-foreground placeholder:text-foreground-light/50 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent/45 focus:ring-2 focus:ring-accent/15 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="What are you building?"
              />
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full px-8 py-3.5 bg-accent text-accent-fg rounded-lg font-semibold transition-[transform,opacity,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-hover hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="isSubmitting">Sending…</span>
              <span v-else>Send message</span>
            </button>
          </form>
        </div>

        <aside class="lg:col-span-5 flex flex-col gap-10">
          <div>
            <h3 class="text-xs font-semibold tracking-[0.14em] uppercase text-foreground-light mb-5">
              Connect
            </h3>
            <ul class="flex flex-col gap-2">
              <li v-for="social in socialLinks" :key="social.name">
                <a
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-accent/12 bg-accent-fg/50 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent/35 hover:bg-accent-subtle/90 hover:-translate-y-0.5"
                >
                  <component :is="social.icon" :size="22" class="text-accent/70" />
                  <span class="font-medium text-foreground">{{ social.name }}</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="pt-8 border-t border-accent/12">
            <h3 class="text-xs font-semibold tracking-[0.14em] uppercase text-foreground-light mb-2">
              Direct email
            </h3>
            <a
              :href="`mailto:${EMAIL}`"
              class="text-lg font-medium text-accent hover:text-accent-hover transition-colors break-all"
            >
              {{ EMAIL }}
            </a>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Github, Linkedin, Twitter, Mail } from 'lucide-vue-next'

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
const USE_FORMSPREE = !!FORM_ENDPOINT

const EMAIL = 'natinael.96@gmail.com'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const socialLinks = [
  { name: 'GitHub', url: '#', icon: Github },
  { name: 'LinkedIn', url: '#', icon: Linkedin },
  { name: 'Twitter', url: '#', icon: Twitter },
  { name: 'Email', url: `mailto:${EMAIL}`, icon: Mail },
]

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
