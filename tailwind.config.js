/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    'src/**/*.vue',
    'src/plugins/**/*.js'
  ],
  theme: {
    extend: {
      "textShadow": {
        "sm": '0 1px 2px var(--tw-shadow-color)',
        "DEFAULT": '0 2px 4px var(--tw-shadow-color)',
        "lg": '0 8px 16px var(--tw-shadow-color)',
    },
    colors: {
        "nord": {
            100: "#2E3440",
            200: "#3B4252",
            300: "#434C5E",
            400: "#4C566A",
        },

        "nord-snow-storm": {
            100: "#D8DEE9",
            200: "#E5E9F0",
            300: "#ECEFF4",
        },

        "nord-frost": {
            100: "#8FBCBB",
            200: "#88C0D0",
            300: "#81A1C1",
            400: "#5E81AC",
        },

        "nord-aurora": {
            100: "#AF5961",
            200: "#BF616A",
            300: "#C56F78",
            400: "#BD7B66",
            500: "#D08770",
            600: "#D4927D",
            700: "#D6B97E",
            800: "#EBCB8B",
            900: "#EDD096",
            1000: "#94AD7F",
            1100: "#A3BE8C",
            1200: "#ABC496",
            1300: "#A4819D",
            1400: "#B48EAD",
            1500: "#BB98B4",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
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
