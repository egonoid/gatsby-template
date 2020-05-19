import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  colorPrimary: '#2672B8',
  colorSecondary: '#80A2CC',

  // UI
  appBg: '#FFF',
  appContentBg: '#FFF',
  appBorderColor: '#2672B8',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#000',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#FFF',
  barSelectedColor: '#FEC41C',
  barBg: '#2672B8',

  // Form colors
  inputBg: '#292929',
  inputBorder: 'silver',
  inputTextColor: 'white',
  inputBorderRadius: 8,

  brandTitle: 'egonoid storybook',
  brandUrl: 'https://www.egonoid.com',
  brandImage: 'images/egonoid-logo.png',
});
