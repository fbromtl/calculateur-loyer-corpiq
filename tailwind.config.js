/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corpiq: {
          blue: '#13315c',
          'blue-light': '#1a4178',
          'blue-dark': '#0c2240',
          'blue-50': '#e8f0fe',
          bordeaux: '#530f32',
          'bordeaux-light': '#6b1441',
          light: '#f7f8fa',
          accent: '#2563eb',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 0 0 1px rgba(0,0,0,0.03), 0 8px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.08)',
        'input-focus': '0 0 0 4px rgba(19, 49, 92, 0.1)',
        'button': '0 2px 8px rgba(19, 49, 92, 0.2)',
        'button-hover': '0 4px 16px rgba(19, 49, 92, 0.3)',
        'xl-soft': '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s ease-out',
        'count-up': 'countUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontSize: {
        'display': ['2.5rem', { lineHeight: '1.15', fontWeight: '800' }],
      },
    },
  },
  plugins: [],
}
