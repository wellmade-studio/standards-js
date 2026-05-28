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
    // `import-notation: url` (inherited from stylelint-config-standard)
    // auto-rewrites `@import 'tailwindcss'` to `@import url('tailwindcss')`,
    // which silently breaks Tailwind v4's Vite plugin: the plugin only
    // recognises the bare-string form when deciding whether to inject
    // preflight + utilities, so the wrapped form skips the entire
    // utility layer (build succeeds, bundle is ~80 KB → ~19 KB, no error).
    // Disabling the rule in the tailwind preset is the right call —
    // you opted into a framework whose convention conflicts with the
    // vanilla recommendation; the framework wins inside its own preset.
    'import-notation': null,
  },
};

export default config;
