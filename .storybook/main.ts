import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  viteFinal: async (config) => {
    config.assetsInclude = config.assetsInclude || [];
    if (Array.isArray(config.assetsInclude)) {
      config.assetsInclude.push('**/*.md');
    }

    // Mock next-intl/navigation at the library level.
    // Excluding it from optimizeDeps prevents Vite from using a stale pre-bundled
    // version from cache, so the alias is always honoured in both dev and build.
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      'next-intl/navigation',
    ];

    const existingAliases = config.resolve?.alias;
    type AliasEntry = { find: string | RegExp; replacement: string };
    let aliasesArray: AliasEntry[];
    if (Array.isArray(existingAliases)) {
      aliasesArray = existingAliases;
    } else if (typeof existingAliases === 'object' && existingAliases !== null) {
      aliasesArray = Object.entries(existingAliases).map(([find, replacement]) => ({
        find,
        replacement: replacement as string,
      }));
    } else {
      aliasesArray = [];
    }
    config.resolve = config.resolve || {};
    config.resolve.alias = [
      {
        find: 'next-intl/navigation',
        replacement: path.resolve(__dirname, './mocks/next-intl-navigation.ts'),
      },
      ...aliasesArray,
    ];

    return config;
  },
};
export default config;