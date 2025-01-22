/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#fbbf24',
        darkGray: '#250000',
      },
      fontFamily: {
        sans: ['customFont', 'sans-serif'],
      },
      backgroundImage: {
        mainPage: "url('/assets/background.jpg')",
      }
    },
  },
  plugins: [],
}
