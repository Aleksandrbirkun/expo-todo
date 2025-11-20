const path = require('path');
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');

const { createTailwindColorsFromCssVars } = require('../../feature-themeing/shared/src/lib/utils/cssVarsToTailwind');

module.exports = {
  content: [
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    path.join(__dirname, '.storybook/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: createTailwindColorsFromCssVars()
    },
  },
  plugins: [require('tailwindcss-animate')],
};
