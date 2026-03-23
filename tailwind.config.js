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
          DEFAULT: 'oklch(0.98 0.012 85)',
          dark: '#1a1a1a',
        },
        foreground: {
          DEFAULT: 'oklch(0.28 0.02 55)',
          light: 'oklch(0.48 0.02 60)',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

