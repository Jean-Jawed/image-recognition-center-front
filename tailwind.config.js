/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Industrial monitoring palette
        'irc': {
          'bg': '#0a0a0b',
          'surface': '#131316',
          'surface-alt': '#1a1a1f',
          'border': '#2a2a30',
          'border-active': '#3a3a42',
          'text': '#e8e8ea',
          'text-muted': '#888890',
          'accent': '#00c896',
          'accent-dim': '#00a67a',
          'warning': '#ff6b35',
          'danger': '#dc2626',
          'info': '#3b82f6',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
        'sans': ['Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 200, 150, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 200, 150, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
