<template>
  <button type="button" class="m-theme" :aria-label="`Switch to ${next} mode`" @click="toggleTheme">
    <span aria-hidden="true">{{ theme === 'light' ? '☾' : '☼' }}</span>
    <span>{{ next }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { theme, toggleTheme } from './useTheme'

/** The button names the mode it switches to, not the current one. */
const next = computed(() => (theme.value === 'light' ? 'dark' : 'light'))
</script>
