import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'JASON',
  brandImage: 'assets/image/jason-logo.png',
  brandUrl: '/',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});
