// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#fbbf24',
        darkGray: '#250000',
        mainBackground: '#141414',
        hexCell: '#262324',
        hexCellHover: '#374151',
        hexCellBackground: '#191919',
        hexCellComponents: '#1e1e1e',
        hexCellComponentsFont: '#4d4d4d'
      },
      fontFamily: {
        'sans': ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}