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
          deep: '#5C3EF4',
          medium: '#7371FC',
          soft: '#9C27B0',
          light: '#A594F9',
          pale: '#CDC1FF',
        },
        pink: {
          vibrant: '#E040FB',
          magenta: '#D663BE',
          soft: '#FAB8D6',
          rose: '#AB47BC',
          blush: '#BA68C8',
        },
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#252530',
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
