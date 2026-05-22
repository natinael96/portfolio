/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'oklch(0.986 0.014 95)',
          dark: '#1a1a1a',
        },
        foreground: {
          DEFAULT: 'oklch(0.24 0.05 168)',
          light: 'oklch(0.43 0.035 166)',
        },
        // Flat keys (not accent: { DEFAULT }) so `border-accent/30` etc. work inside @apply
        accent: 'oklch(0.39 0.105 168)',
        'accent-hover': 'oklch(0.32 0.095 168)',
        'accent-fg': 'oklch(0.99 0.01 95)',
        'accent-muted': 'oklch(0.91 0.045 168)',
        'accent-subtle': 'oklch(0.955 0.028 168)',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        display: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}

