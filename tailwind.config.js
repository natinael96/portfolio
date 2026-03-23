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
          DEFAULT: 'oklch(0.985 0.022 95)',
          dark: '#1a1a1a',
        },
        foreground: {
          DEFAULT: 'oklch(0.24 0.05 168)',
          light: 'oklch(0.42 0.06 166)',
        },
        // Flat keys (not accent: { DEFAULT }) so `border-accent/30` etc. work inside @apply
        accent: 'oklch(0.36 0.17 168)',
        'accent-hover': 'oklch(0.30 0.155 168)',
        'accent-fg': 'oklch(0.99 0.01 95)',
        'accent-muted': 'oklch(0.90 0.09 168)',
        'accent-subtle': 'oklch(0.94 0.065 168)',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

