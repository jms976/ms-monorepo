import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'MS Design System',
  brandImage: 'images/msui-logo.webp',
  brandUrl: '/',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});
