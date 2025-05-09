import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export const tailwindConfig: Config = {
  darkMode: 'selector',
  content: [],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        destructive: colors.red,
      },
    },
  },
  plugins: [],
};
