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
          border: '#E5D9C5',
          borderLight: '#EFE7DA',
          brown: '#2D1810',
          brownLight: '#4E3127',
          brownMuted: '#6E5246',
          charcoal: '#4A3B32',
          yellow: '#E69500',
          yellowHover: '#D48600',
          yellowLight: '#FEF3C7',
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
