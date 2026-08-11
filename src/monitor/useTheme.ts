import { ref } from 'vue'

export type MonitorTheme = 'light' | 'dark'

const STORAGE_KEY = 'monitor-theme'

/** Browser chrome tint per theme — keep in sync with --m-bg in monitor.css. */
const THEME_COLOR: Record<MonitorTheme, string> = {
  light: '#f2f3f7',
  dark: '#161a24',
}

const stored = ((): MonitorTheme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
})()

/** Light is the house default; a saved choice wins. */
export const theme = ref<MonitorTheme>(stored ?? 'light')

const apply = (value: MonitorTheme) => {
  document.documentElement.style.colorScheme = value
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[value])
}

export const initTheme = () => apply(theme.value)

export const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  try {
    localStorage.setItem(STORAGE_KEY, theme.value)
  } catch {
    /* private browsing — theme just won't persist */
  }
  apply(theme.value)
}
