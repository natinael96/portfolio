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

/**
 * Fonts only the archived designs use. index.html loads the three families the
 * default route renders; these four would otherwise block first paint at / for
 * two routes nobody lands on first. Injected non-blocking, after the route is
 * known — the faces swap in when they arrive.
 */
const ARCHIVE_FONTS: Record<string, string> = {
  monitor:
    'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap',
  legacy:
    'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&display=swap',
}

const archiveFonts = ARCHIVE_FONTS[route]
if (archiveFonts) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = archiveFonts
  document.head.appendChild(link)
}
</script>
