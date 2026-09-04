<template>
  <div id="app">
    <LegacyApp v-if="route === 'legacy'" />
    <MonitorApp v-else-if="route === 'monitor'" />
    <ChangelogApp v-else />
  </div>
</template>

<script setup lang="ts">
import LegacyApp from './LegacyApp.vue'
import MonitorApp from './monitor/MonitorApp.vue'
import ChangelogApp from './changelog/ChangelogApp.vue'

/**
 * Three designs, one bundle.
 *   /            changelog — the current design (release notes)
 *   /monitor     vital signs — archived, was the default until Aug 2026
 *   /old         editorial — archived (alias /private)
 * vercel.json rewrites all paths to index.html, so every route works deployed.
 */
const path = window.location.pathname.replace(/\/+$/, '')

const route =
  path === '/old' || path === '/private'
    ? 'legacy'
    : path === '/monitor' || path === '/vitals'
      ? 'monitor'
      : 'changelog'

// The archived edition is fixed light; the other two manage their own theme
// (light by default, dark via their toggle — see each design's useTheme.ts).
if (route === 'legacy') document.documentElement.style.colorScheme = 'light'
</script>
