/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#3C6FFF',
        'neon-purple': '#A66BFF',
        'dark-bg': '#000000',
        'dark-surface': '#0C0C0C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(60, 111, 255, 0.5), 0 0 40px rgba(60, 111, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(166, 107, 255, 0.5), 0 0 40px rgba(166, 107, 255, 0.3)',
        'glow-blue-lg': '0 0 30px rgba(60, 111, 255, 0.6), 0 0 60px rgba(60, 111, 255, 0.4)',
        'glow-purple-lg': '0 0 30px rgba(166, 107, 255, 0.6), 0 0 60px rgba(166, 107, 255, 0.4)',
        'card-glow': '0 8px 32px 0 rgba(60, 111, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'card-glow-hover': '0 12px 48px 0 rgba(60, 111, 255, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.15)',
        'inner-glow': 'inset 0 0 20px rgba(60, 111, 255, 0.1)',
      },
      letterSpacing: {
        'wider': '0.05em',
        'widest': '0.1em',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

