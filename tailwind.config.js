// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: '',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: colors.emerald,
        error: colors.red,
      },
      spacing: {
        4.5: '1.125rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75em',
        21: '5.25rem',
        25: '6.25rem',
        66: '16.5rem',
        75: '18.75rem', // 300px
        79: '19.75rem',
        90: '22.5rem',
        100: '25rem',
        120: '30rem',
        170: '42.5rem', // 680px
      },
    },
  },
  plugins: [],
};
