/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        1024: '1024px',
      },
    },
  },
  plugins: [],
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts}',
  ],
}
