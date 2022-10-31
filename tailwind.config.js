/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#f46102',
        'primary-light': '#f46102a3',
        'secondary': '#92979A',
        'gray-lighter':'#E5E7EB',
        'gray-light': '#F9FAFB'
      }
    },
  },
  plugins: [],
}
