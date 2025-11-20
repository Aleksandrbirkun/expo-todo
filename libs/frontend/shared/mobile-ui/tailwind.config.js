import { join } from 'path';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import {
  createTailwindColorsFromCssVars
} from '../../feature-themeing/shared/src/lib/utils/cssVarsToTailwind';
import { sharedTheme } from '../../feature-themeing/shared/src/lib/theme/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      join(
        __dirname,
        '{src,pages,components,layouts,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
      ),
      ...createGlobPatternsForDependencies(__dirname),
    ],
  },
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: createTailwindColorsFromCssVars(),
      borderRadius: sharedTheme.borderRadius,
      keyframes: sharedTheme.keyframes,
      animation: sharedTheme.animation,
    },
  },
  plugins: [require('tailwindcss-animate')],
};
