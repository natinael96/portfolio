<template>
  <div class="cl-root" :class="{ 'is-dark': theme === 'dark' }">
    <a class="cl-skip" href="#experience">Skip to experience</a>

    <header class="cl-head">
      <div class="cl-shell">
        <div class="cl-head-top">
          <p class="cl-repo"><b>{{ meta.handle }}</b> / changelog · v{{ meta.current }} · updated {{ meta.updated }}</p>
          <button
            class="cl-toggle"
            type="button"
            :aria-pressed="theme === 'dark'"
            @click="toggleTheme"
          >
            {{ theme === 'dark' ? 'Light' : 'Dark' }}
          </button>
        </div>

        <h1>{{ meta.name }}</h1>

        <p class="cl-hero-eyebrow">{{ meta.role }} · {{ meta.location }}</p>
        <a class="cl-hero-strip" :href="meta.hero.strip.url" target="_blank" rel="noopener">
          <span class="cl-hero-dot" aria-hidden="true"></span>
          <span v-if="liveReading">PM2.5 over Addis right now: {{ liveReading }} — measured by this network</span>
          <span v-else>{{ meta.hero.strip.fallback }}</span>
        </a>

        <nav class="cl-jump" aria-label="Jump to section">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#writing">Writing</a>
          <a href="#stack" class="is-strong">Stack</a>
        </nav>

        <ul class="cl-facts">
          <li class="is-open">Open to remote roles</li>
          <li>{{ meta.coords }}</li>
          <li>{{ meta.timezone }}</li>
          <li>Since {{ meta.since }}</li>
        </ul>

        <details class="cl-scheme">
          <summary class="cl-label">Versioning — how to read the numbers</summary>
          <dl class="cl-scheme-grid">
            <div class="cl-scheme-item" v-for="rule in versioning" :key="rule.part">
              <dt>{{ rule.part }}<span>{{ rule.example }}</span></dt>
              <dd>{{ rule.meaning }}</dd>
            </div>
          </dl>
          <p class="cl-scheme-note">{{ versioningNote }}</p>
        </details>
      </div>
    </header>

    <div class="cl-shell">
      <div class="cl-body">
        <nav class="cl-rail" aria-label="Contents">
          <h2 class="cl-label">Experience</h2>
          <ol>
            <li v-for="release in experience" :key="release.version">
              <a
                :href="`#${releaseSlug(release.version)}`"
                :class="{ 'is-active': activeId === releaseSlug(release.version), 'is-sub': release.tier === 'sub' }"
                :aria-current="activeId === releaseSlug(release.version) ? 'true' : undefined"
              >
                <strong>{{ release.version }}</strong>
                <span>{{ release.railDate }}</span>
              </a>
            </li>
          </ol>

          <h2 class="cl-label cl-rail-gap">Projects</h2>
          <ol>
            <li v-for="project in projects" :key="project.id">
              <a
                :href="`#p-${project.id}`"
                :class="{ 'is-active': activeId === `p-${project.id}` }"
                :aria-current="activeId === `p-${project.id}` ? 'true' : undefined"
              >
                <strong class="cl-rail-name">{{ project.railLabel }}</strong>
                <span>{{ project.statusLabel }}</span>
              </a>
            </li>
          </ol>

          <h2 class="cl-label cl-rail-gap">Writing</h2>
          <ol>
            <li v-if="!posts.length">
              <a href="#writing" :class="{ 'is-active': activeId === 'writing' }">
                <strong class="cl-rail-name">Soon</strong>
                <span>No posts yet</span>
              </a>
            </li>
            <li v-for="post in posts" :key="post.slug">
              <a
                :href="`#w-${post.slug}`"
                :class="{ 'is-active': activeId === `w-${post.slug}` }"
                :aria-current="activeId === `w-${post.slug}` ? 'true' : undefined"
              >
                <strong class="cl-rail-name">{{ post.title }}</strong>
                <span>{{ post.dateLabel }}</span>
              </a>
            </li>
          </ol>

          <h2 class="cl-label cl-rail-gap">Stack</h2>
          <ol>
            <li>
              <a href="#stack" :class="{ 'is-active': activeId === 'stack' }">
                <strong class="cl-rail-name">Dependencies</strong>
                <span>{{ totalDeps }} tools</span>
              </a>
            </li>
          </ol>
        </nav>

        <main class="cl-feed">
          <!-- ── Experience ─────────────────────────────────────────────── -->
          <section id="experience" aria-labelledby="experience-h">
            <h2 class="cl-section-h" id="experience-h">
              Experience<span>Roles, with education and training beneath them</span>
            </h2>

            <article
              v-for="release in experience"
              :key="release.version"
              class="cl-release"
              :class="{ 'is-sub': release.tier === 'sub', 'is-hero': release.bump === 'head' }"
              :id="releaseSlug(release.version)"
            >
              <div class="cl-release-head">
                <h3 class="cl-version" :class="{ 'is-current': release.version === meta.current }">
                  <a :href="`#${releaseSlug(release.version)}`">{{ release.version }}</a>
                </h3>
                <span class="cl-date">{{ release.date }}</span>
                <span v-if="release.bump === 'head'" class="cl-bump is-head">Unreleased</span>
                <span
                  v-else-if="release.bump === 'major' && release.tier === 'primary'"
                  class="cl-bump is-major"
                  >Breaking</span
                >
              </div>

              <h4 class="cl-title">
                {{ release.title }}
                <template v-if="release.org">
                  ·
                  <a v-if="release.orgUrl" :href="release.orgUrl" target="_blank" rel="noopener">{{
                    release.org
                  }}</a>
                  <template v-else>{{ release.org }}</template>
                </template>
              </h4>

              <p class="cl-period" v-if="release.period">{{ release.period }}</p>
              <p class="cl-summary">{{ release.summary }}</p>

              <ul class="cl-changes">
                <li class="cl-change" v-for="(change, i) in ordered(release.changes)" :key="i">
                  <span class="cl-tag" :class="`is-${change.kind}`">{{ change.kind }}</span>
                  <p v-html="emphasise(change.text)"></p>
                </li>
              </ul>

              <div class="cl-foot" v-if="release.stat || release.links">
                <p class="cl-stat" v-if="release.stat">
                  <b>{{ release.stat.value }}</b>
                  <span>{{ release.stat.caption }}</span>
                </p>
                <ul class="cl-links" v-if="release.links">
                  <li v-for="link in release.links" :key="link.href">
                    <a :href="link.href" :class="{ 'is-primary': link.primary }" v-bind="external(link.href)">{{ link.label }}</a>
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <!-- ── Projects ───────────────────────────────────────────────── -->
          <section id="projects" aria-labelledby="projects-h" class="cl-projects">
            <h2 class="cl-section-h" id="projects-h">
              Projects<span>Live work first, then completed and archived</span>
            </h2>

            <article
              v-for="project in projects"
              :key="project.id"
              class="cl-release"
              :id="`p-${project.id}`"
              :style="projectStyle(project)"
            >
              <div class="cl-release-head">
                <h3 class="cl-project-name">
                  <a :href="`#p-${project.id}`">{{ project.name }}</a>
                  <span class="cl-alt" v-if="project.altName">{{ project.altName }}</span>
                </h3>
                <span class="cl-status" :class="`is-${project.status}`">{{
                  project.statusLabel
                }}</span>
                <span class="cl-date" v-if="project.period">{{ project.period }}</span>
              </div>

              <p class="cl-summary">{{ project.summary }}</p>

              <ul class="cl-changes">
                <li class="cl-change" v-for="(change, i) in ordered(project.changes)" :key="i">
                  <span class="cl-tag" :class="`is-${change.kind}`">{{ change.kind }}</span>
                  <p v-html="emphasise(change.text)"></p>
                </li>
              </ul>

              <ul class="cl-tech">
                <li v-for="item in project.tech" :key="item">{{ item }}</li>
              </ul>

              <div class="cl-foot" v-if="project.stat || project.links">
                <p class="cl-stat" v-if="project.stat">
                  <b>{{ project.stat.value }}</b>
                  <span>{{ project.stat.caption }}</span>
                </p>
                <ul class="cl-links" v-if="project.links">
                  <li v-for="link in project.links" :key="link.href">
                    <a :href="link.href" :class="{ 'is-primary': link.primary }" v-bind="external(link.href)">{{ link.label }}</a>
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <!-- ── Writing ────────────────────────────────────────────────── -->
          <section id="writing" aria-labelledby="writing-h" class="cl-projects">
            <h2 class="cl-section-h" id="writing-h">
              Writing<span>{{ writingMeta.standfirst }}</span>
            </h2>

            <p class="cl-empty" v-if="!posts.length">
              <b>{{ writingMeta.emptyTitle }}</b>
              {{ writingMeta.emptyBody }}
              <a :href="writingMeta.emptyCta.href" target="_blank" rel="noopener">{{
                writingMeta.emptyCta.label
              }}</a>
            </p>

            <article
              v-for="post in posts"
              :key="post.slug"
              class="cl-release"
              :id="`w-${post.slug}`"
            >
              <div class="cl-release-head">
                <h3 class="cl-project-name">
                  <a :href="post.href" v-bind="external(post.href)">{{ post.title }}</a>
                </h3>
                <time class="cl-date" :datetime="post.date">{{ post.dateLabel }}</time>
              </div>
              <p class="cl-summary">{{ post.summary }}</p>
              <ul class="cl-tech">
                <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
              </ul>
            </article>
          </section>
        </main>
      </div>
    </div>

    <section class="cl-shell cl-deps" id="stack" aria-labelledby="deps-h">
      <div class="cl-deps-head">
        <h2 class="cl-label" id="deps-h">Dependencies</h2>
        <p class="cl-deps-total">
          <b>{{ totalDeps }}</b> tools across {{ dependencies.length }} groups — everything
          below appears in shipped work above, not on a wishlist.
        </p>
      </div>

      <div class="cl-deps-grid">
        <article
          class="cl-dep"
          v-for="dep in dependencies"
          :key="dep.group"
          :style="{ '--dg': dep.accent[theme === 'dark' ? 1 : 0] }"
        >
          <header class="cl-dep-head">
            <h3 class="cl-dep-name">{{ dep.group }}</h3>
            <span class="cl-dep-count">{{ dep.items.length }}</span>
          </header>
          <p class="cl-dep-note">{{ dep.note }}</p>
          <ul class="cl-dep-items">
            <li v-for="item in dep.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="cl-shell cl-contact" aria-labelledby="contact-h">
      <h2 class="cl-label" id="contact-h">Contact</h2>
      <p>{{ contact.note }}</p>
      <ul class="cl-channels">
        <li v-for="channel in contact.channels" :key="channel.name">
          <a :href="channel.url" v-bind="external(channel.url)">
            <strong>{{ channel.name }}</strong>
            <span>{{ channel.slug }}</span>
          </a>
        </li>
      </ul>
    </section>

    <button
      class="cl-totop"
      :class="{ 'is-visible': showTop }"
      type="button"
      aria-label="Back to top"
      :tabindex="showTop ? 0 : -1"
      @click="toTop"
    >
      <span aria-hidden="true">&uarr;</span>
    </button>

    <footer class="cl-shell cl-colophon">
      <span>{{ meta.name }} · {{ meta.location }}</span>
      <span>Earlier designs: <a href="/monitor">vital signs</a> · <a href="/old">editorial</a></span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { ChangeLine } from '../content/changelog'
import {
  changelogMeta as meta,
  versioning,
  versioningNote,
  experience,
  projects,
  dependencies,
  contact,
} from '../content/changelog'
import { posts, writingMeta } from '../content/writing'
import { theme, initTheme, toggleTheme } from './useTheme'

initTheme()

/**
 * Live proof, attempted politely: only when the content file names an
 * endpoint, only once, 4s budget, and any failure leaves the static strip —
 * a hero that can 404 is worse than a hero that claims less.
 */
const totalDeps = dependencies.reduce((n, d) => n + d.items.length, 0)

/** Shown once the header is well out of view. */
const showTop = ref(false)

const toTop = () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

const liveReading = ref<string | null>(null)

const pickValue = (data: unknown): string | null => {
  // Adjust to the real response shape when the endpoint goes live.
  if (data && typeof data === 'object' && 'pm25' in data) {
    const v = (data as { pm25: unknown }).pm25
    if (typeof v === 'number' && Number.isFinite(v)) return `${v.toFixed(0)} µg/m³`
  }
  return null
}

const probeLive = async () => {
  const url = meta.hero.strip.liveEndpoint
  if (!url) return
  try {
    const ctl = new AbortController()
    const timer = setTimeout(() => ctl.abort(), 4000)
    const res = await fetch(url, { signal: ctl.signal })
    clearTimeout(timer)
    if (res.ok) liveReading.value = pickValue(await res.json())
  } catch {
    /* stay static */
  }
}

/** Stable anchor ids: 3.1.0 → v3-1-0, Now → now. */
const releaseSlug = (version: string) =>
  version.includes('.') ? `v${version.replace(/\./g, '-')}` : version.toLowerCase()

/** External links open in a new tab; mailto: and in-app routes stay put. */
const external = (href: string) =>
  href.startsWith('mailto:') || href.startsWith('/')
    ? {}
    : { target: '_blank', rel: 'noopener' }

/**
 * Change lines occasionally open with a caps keyword (BREAKING). Bold just
 * that, and escape everything else — the content file is trusted, but the
 * escape keeps this honest if it ever isn't.
 */
const emphasise = (text: string) => {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped.replace(/^(BREAKING)(\s—\s)/, '<b>$1</b>$2')
}

/**
 * Project identity colours → CSS custom properties. Reactive on theme so the
 * dark variants swap in with the toggle; projects without colours fall back
 * to ink/muted via the var() defaults in the stylesheet.
 */
const projectStyle = (project: (typeof projects)[number]) => {
  if (!project.colors) return undefined
  const pick = theme.value === 'dark' ? 1 : 0
  const style: Record<string, string> = { '--pj': project.colors.primary[pick] }
  if (project.colors.secondary) style['--pj2'] = project.colors.secondary[pick]
  return style
}

/**
 * Keep a Changelog fixes the order of change groups — Added, Changed, …,
 * Fixed — and this page claims to follow it, so enforce it here rather than
 * trusting the content file to stay hand-sorted. `learned` is our own
 * addition and sorts last.
 *
 * BREAKING lines float to the top regardless: that is the convention for a
 * major release, and burying "now leads a team of three" under three Added
 * lines would lose the most important sentence in the entry.
 */
const KIND_ORDER: Record<ChangeLine['kind'], number> = {
  added: 0,
  changed: 1,
  fixed: 2,
  learned: 3,
}

const ordered = (changes: ChangeLine[]) =>
  [...changes].sort((a, b) => {
    const aB = a.text.startsWith('BREAKING')
    const bB = b.text.startsWith('BREAKING')
    if (aB !== bB) return aB ? -1 : 1
    return KIND_ORDER[a.kind] - KIND_ORDER[b.kind]
  })

/* ── rail highlighting ──────────────────────────────────────────────────────
   The active entry is the last one whose top has passed the reading line (a
   third of the way down the viewport). Plain scroll maths — the rail needs
   "the one you are reading", not "the one on screen".
   ────────────────────────────────────────────────────────────────────────── */
const railIds = [
  ...experience.map((r) => releaseSlug(r.version)),
  ...projects.map((p) => `p-${p.id}`),
  ...(posts.length ? posts.map((p) => `w-${p.slug}`) : ['writing']),
  'stack',
]

const activeId = ref<string>(railIds[0] ?? '')

let bounds: { id: string; top: number }[] = []
let ticking = false

const measureBounds = () => {
  bounds = railIds.map((id) => {
    const el = document.getElementById(id)
    return { id, top: el ? el.getBoundingClientRect().top + window.scrollY : 0 }
  })
}

const measure = () => {
  ticking = false
  const line = window.scrollY + window.innerHeight * 0.33

  showTop.value = window.scrollY > window.innerHeight

  let current = bounds[0]?.id ?? ''
  for (const entry of bounds) {
    if (entry.top <= line) current = entry.id
  }
  activeId.value = current
}

const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(measure)
}

const onResize = () => {
  measureBounds()
  onScroll()
}

onMounted(() => {
  probeLive()
  measureBounds()
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>
