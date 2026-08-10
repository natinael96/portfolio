<template>
  <div id="app">
    <LegacyApp v-if="isLegacyRoute" />
    <MonitorApp v-else />
  </div>
</template>

<script setup lang="ts">
import LegacyApp from './LegacyApp.vue'
import MonitorApp from './monitor/MonitorApp.vue'

/**
 * Two designs, one bundle. The previous (editorial) design is archived at
 * /old (alias /private); everything else gets the current design.
 * vercel.json rewrites all paths to index.html, so both work when deployed.
 */
const path = window.location.pathname.replace(/\/+$/, '')
const isLegacyRoute = path === '/old' || path === '/private'

// The archived edition is light; the current instrument is dark.
document.documentElement.style.colorScheme = isLegacyRoute ? 'light' : 'dark'
</script>
