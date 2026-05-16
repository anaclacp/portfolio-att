/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          deep: '#7C6CF2',
          medium: '#8675F5',
          soft: '#A594F9',
          light: '#A594F9',
          pale: '#C9BCFF',
        },
        pink: {
          vibrant: '#D8A7B1',
          magenta: '#C9909A',
          soft: '#FAB8D6',
          rose: '#C49AA1',
          blush: '#D4ADB4',
        },
        dark: {
          900: '#0A0A0F',
          800: '#101018',
          700: '#15151F',
          600: '#1C1C29',
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  },
  plugins: [],
}
