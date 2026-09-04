import { ref } from 'vue'

export type ChangelogTheme = 'light' | 'dark'

const STORAGE_KEY = 'changelog-theme'

/** Browser chrome tint per theme — keep in sync with --cl-bg in changelog.css. */
const THEME_COLOR: Record<ChangelogTheme, string> = {
  light: '#fdfcfa',
  dark: '#191a18',
}

const stored = ((): ChangelogTheme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
})()

/** Light is the house default; a saved choice wins. */
export const theme = ref<ChangelogTheme>(stored ?? 'light')

const apply = (value: ChangelogTheme) => {
  document.documentElement.style.colorScheme = value
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[value])

  // style.css paints <body> with the editorial cream for every route
  // (`@apply bg-background`). Repaint it, or overscroll and any gap below the
  // last section flash cream — very visible in dark mode.
  document.body.style.background = THEME_COLOR[value]
}

export const initTheme = () => apply(theme.value)

export const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  try {
    localStorage.setItem(STORAGE_KEY, theme.value)
  } catch {
    /* storage unavailable — the choice just won't persist */
  }
  apply(theme.value)
}
