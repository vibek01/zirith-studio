/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#DFD5C5',
        surface: '#EBE4D8',
        'surface-2': '#D3C9B8',
        carbon: '#1A1A18',
        graphite: '#6B6B66',
        'warm-grey': '#A8A8A2',
        bronze: '#B8975A',
        champagne: '#D4B880',
        'bronze-dark': '#8A6F3A',
        border: 'rgba(26,26,24,0.07)',
        frosted: 'rgba(250,250,248,0.72)',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Playfair Display', 'Georgia', 'serif'],
        'serif-alt': ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(3.5rem, 7vw, 6rem)',
        'section': 'clamp(2.25rem, 4vw, 3.5rem)',
        'quote': 'clamp(2.5rem, 5vw, 4.5rem)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee2': 'marquee2 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'dot-bounce': 'dotBounce 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        dotBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
}
