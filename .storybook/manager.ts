import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'dark',
  
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Leonardo Silvatti Silva - UI Kit',
  brandUrl: 'https://leonardo.silvatti.com.br',
  brandImage: '/storybook-logo',
  brandTarget: '_self',

  colorPrimary: '#a78bfa',
  colorSecondary: '#fb923c', 

  appBg: '#1e1b3a', 
  appContentBg: '#0f0d1a', 
  appBorderRadius: 8,
});

addons.setConfig({
  theme: theme,
});