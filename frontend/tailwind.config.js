/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#fbbf24',
        lighterGray: '#999',
        darkGray: '#250000',
        lightGray: '#333333',
        mainBackground: '#141414',
        hexCell: '#262324',
        hexCellHover: '#374151',
        hexCellBackground: '#191919',
        hexCellComponents: '#1e1e1e',
        darkerHexCellComponents: '#26262F',
        hexCellComponentsFont: '#4d4d4d',
        playerHexCell: '#426D9D',
        opponentHexCell: '#7C3232',
      },
      fontFamily: {
        sans: [
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],     
        jetbrains: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'], 
      },
    },
  },
  plugins: [require('daisyui')],
};
