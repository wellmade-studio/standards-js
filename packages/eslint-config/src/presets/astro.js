/**
 * Astro preset. Loaded lazily because `eslint-plugin-astro` and
 * `astro-eslint-parser` are optional peer deps — only projects using
 * Astro need to install them.
 *
 * Usage:
 *
 *   import { astroPreset } from '@wellmade/eslint-config';
 *   export default [...basePreset(import.meta.dirname), ...(await astroPreset())];
 *
 * @returns {Promise<import('eslint').Linter.Config[]>}
 */
export async function astroPreset() {
  const [{ default: astroPlugin }, astroParser] = await Promise.all([
    import('eslint-plugin-astro'),
    import('astro-eslint-parser'),
  ]);

  return [
    {
      name: 'wellmade/astro-files',
      files: ['**/*.astro'],
      plugins: { astro: astroPlugin },
      languageOptions: {
        parser: astroParser,
        parserOptions: {
          parser: '@typescript-eslint/parser',
          extraFileExtensions: ['.astro'],
        },
        globals: astroPlugin.environments.astro.globals,
      },
      rules: {
        ...astroPlugin.configs.recommended.rules,
        // Allow default exports in Astro pages.
        'import/no-default-export': 'off',
      },
    },
    {
      name: 'wellmade/astro-page-default-exports',
      files: ['**/pages/**/*.astro', '**/layouts/**/*.astro'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ];
}
