import { tailwindConfig as uiConfig } from '@common/ui/tailwind.config';

const config = {
  ...uiConfig,
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
};

export default config;
