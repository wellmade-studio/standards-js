import base from './index.js';

/**
 * @type {import('stylelint').Config}
 *
 * Extends the base preset with allowances for Tailwind's at-rules
 * (v3 + v4) and `theme()` / `screen()` functions in values.
 *
 * Usage:
 *   // stylelint.config.js
 *   import config from '@wellmade/stylelint-config/tailwind';
 *   export default config;
 */
const config = {
  ...base,
  rules: {
    ...base.rules,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // Tailwind v3
          'tailwind',
          'apply',
          'layer',
          'variants',
          'responsive',
          'screen',
          // Tailwind v4
          'config',
          'theme',
          'source',
          'utility',
          'custom-variant',
          'plugin',
        ],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'screen', 'config'],
      },
    ],
    // Tailwind users rarely follow class-name conventions on utility-heavy files.
    'selector-class-pattern': null,
  },
};

export default config;
