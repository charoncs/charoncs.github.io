/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        'questrial': ['Questrial', 'sans-serif'],
      },
      colors: {
        'primary': '#007acc',
        'dark': '#1a202c',
      }
    },
  },
  plugins: [],
}