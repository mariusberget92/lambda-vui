/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    'src/**/*.vue',
    'src/plugins/**/*.js'
  ],
  theme: {
    extend: {
      textShadow: {
        "sm": '0 1px 2px var(--tw-shadow-color)',
        "DEFAULT": '0 2px 4px var(--tw-shadow-color)',
        "lg": '0 8px 16px var(--tw-shadow-color)',
      },

      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },

      colors: {
        "nord-dark": {
          100: "#2E3440",
          200: "#3B4252",
          300: "#434C5E",
          400: "#4C566A",
          500: "#5c6578"
        },

        "nord-light": {
          100: "#c4cad4",
          200: "#D8DEE9",
          300: "#E5E9F0",
          400: "#ECEFF4",
          500: "#f1f2f7"
        },

        "nord-blue": {
          100: "#6a859f",
          200: "#7592af",
          300: "#81a1c1",
          400: "#8caac7",
          500: "#96b2cc"
        },

        "nord-green": {
          100: "#879d73",
          200: "#94AD7F",
          300: "#A3BE8C",
          400: "#ABC496",
          500: "#b3c9a0"
        },

        "nord-red": {
          100: "#9f5158",
          200: "#AF5961",
          300: "#BF616A",
          400: "#C56F78",
          500: "#ca7c84"
        },

        "nord-orange": {
          100: "#ac705d",
          200: "#BD7B66",
          300: "#D08770",
          400: "#D4927D",
          500: "#d89c89"
        },

        "nord-yellow": {
          100: "#bdaa6a",
          200: "#CEB575",
          300: "#DDBF80",
          400: "#E5C98A",
          500: "#ebd393"
        },

        "nord-mauve": {
          100: "#95758f",
          200: "#A4819D",
          300: "#B48EAD",
          400: "#BB98B4",
          500: "#c1a1bb"
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
          {
              'text-shadow': (value) => ({
                  textShadow: value,
              }),
          },
          { 
              values: theme('textShadow') 
          }
      )
    }),
  ],
}
