import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import '../app/globals.css';
import enCommon from '../messages/en/common.json';
import enLayout from '../messages/en/layout.json';
import enPages from '../messages/en/pages.json';
import enComponents from '../messages/en/components.json';

const messages = { ...enCommon, ...enLayout, ...enPages, ...enComponents };

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: 'Theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      return React.createElement(
        NextIntlClientProvider,
        { locale: 'en', messages },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;