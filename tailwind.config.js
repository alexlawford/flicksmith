/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['manrope']
      }
    },
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/typography"),
  ],
}

