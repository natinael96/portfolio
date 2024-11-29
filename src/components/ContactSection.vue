<template>
  <section id="contact" class="py-24 px-6 sm:px-8 lg:px-12 bg-white/40">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl sm:text-5xl font-light text-foreground mb-4 text-center">
        Get in Touch
      </h2>
      <p class="text-foreground-light text-center mb-16 max-w-2xl mx-auto">
        Let's discuss your next project or just say hello.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div v-if="submitStatus === 'success'" class="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-green-700 text-sm font-medium">
                ✓ Thank you! Your message has been sent successfully.
              </p>
            </div>
            <div v-if="submitStatus === 'error'" class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-700 text-sm font-medium">
                ✗ Something went wrong. Please try again or email directly.
              </p>
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 bg-white border border-gray-200/50 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 bg-white border border-gray-200/50 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                :disabled="isSubmitting"
                rows="5"
                class="w-full px-4 py-3 bg-white border border-gray-200/50 rounded-lg focus:outline-none focus:border-foreground/30 transition-colors text-foreground resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your message..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full px-8 py-3 bg-foreground text-white rounded-lg font-medium hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>
        </div>

        <!-- Social Links -->
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-semibold text-foreground mb-6">Connect</h3>
            <div class="space-y-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-lg hover:shadow-lg hover:border-foreground/20 transition-all duration-300 group"
              >
                <component :is="social.icon" :size="24" class="text-foreground-light group-hover:text-foreground transition-colors" />
                <span class="text-foreground font-medium">{{ social.name }}</span>
              </a>
            </div>
          </div>

          <div class="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-foreground mb-3">Email</h3>
            <a :href="`mailto:${EMAIL}`" class="text-foreground-light hover:text-foreground transition-colors">
              {{ EMAIL }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Github, Linkedin, Twitter, Mail } from 'lucide-vue-next'

// Formspree Configuration
// Set VITE_FORMSPREE_ENDPOINT in your .env file
// Emails will be sent to: natinael.96@gmail.com
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
      // Use Formspree to send email
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          submitStatus.value = 'idle'
        }, 5000)
      } else {
        throw new Error(data.error || 'Form submission failed')
      }
    } else {
      // Fallback: Use mailto (opens email client)
      const subject = encodeURIComponent(`Portfolio Contact: ${form.value.name}`)
      const body = encodeURIComponent(
        `Name: ${form.value.name}\nEmail: ${form.value.email}\n\nMessage:\n${form.value.message}`
      )
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      
      submitStatus.value = 'success'
      form.value = { name: '', email: '', message: '' }
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        submitStatus.value = 'idle'
      }, 5000)
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    submitStatus.value = 'error'
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

