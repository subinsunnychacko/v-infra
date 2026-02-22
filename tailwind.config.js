/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent1: 'var(--color-accent1)',
        accent2: 'var(--color-accent2)',
        accent3: 'var(--color-accent3)',
        heading: 'var(--color-heading)',
        body: 'var(--color-body)',
        muted: 'var(--color-muted)',
        'light-bg': 'var(--color-light-bg)',
        'card-bg': 'var(--color-card-bg)',
        'dark-bg': 'var(--color-dark-bg)',
        'text-on-dark': 'var(--color-text-on-dark)',
        'cta': 'var(--color-cta)',
        'cta-hover': 'var(--color-cta-hover)',
        'cta-text': 'var(--color-cta-text)',
        'link': 'var(--color-link)',
        'link-hover': 'var(--color-link-hover)',
        'success': 'var(--color-success)',
        'error': 'var(--color-error)',
        'border': 'var(--color-border)',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'brush-stroke': 'brushStroke 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        brushStroke: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
