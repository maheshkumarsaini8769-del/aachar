/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FDFBF7',
          ivory: '#FAF6EE',
          cream: '#F4ECE1',
          creamDark: '#EFE4D3',
          border: '#DFC59F',
          borderLight: '#EFE7DA',
          brown: '#231209',
          brownLight: '#4E2C1A',
          brownMuted: '#6E4E3B',
          charcoal: '#4A3B32',
          yellow: '#D97706',
          yellowHover: '#B45309',
          yellowLight: '#FEF3C7',
          dune: '#9C4E15',
          duneDark: '#78350F',
          duneLight: '#FDF6E8',
          sand: '#EAD2AA',
          sandGold: '#F59E0B',
          terracotta: '#B45309',
          green: '#1E5631',
          greenHover: '#174426',
          greenLight: '#E8F5E9',
          red: '#C62828',
          redLight: '#FFEBEE',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(45, 24, 16, 0.06)',
        'warm-hover': '0 10px 25px -4px rgba(45, 24, 16, 0.12)',
        'card': '0 2px 10px rgba(78, 49, 39, 0.05)',
      }
    },
  },
  plugins: [],
}
