import importPlugin from 'eslint-plugin-import';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

/**
 * Import ordering, deduplication, and cycle detection.
 *
 * `simple-import-sort` owns *order* (deterministic, no opinions about groups).
 * `eslint-plugin-import` owns *integrity* (no duplicates, no missing files,
 * no cycles, proper extensions).
 *
 * @type {import('eslint').Linter.Config}
 */
export const importsPreset = {
  name: 'wellmade/imports',
  plugins: {
    import: importPlugin,
    'simple-import-sort': simpleImportSortPlugin,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'import/first': 'error',
    'import/no-duplicates': ['error', { 'prefer-inline': false }],
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/no-cycle': ['error', { maxDepth: 10, ignoreExternal: true }],
    'import/no-mutable-exports': 'error',
    'import/no-absolute-path': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-default-export': 'error',
    'import/enforce-node-protocol-usage': ['error', 'always'],
    'import/extensions': ['error', 'ignorePackages'],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.mts', '.cts'] },
    },
  },
};

/**
 * Files where a default export is legitimate (config files, route handlers
 * in some frameworks, story files, codegen output).
 *
 * @type {import('eslint').Linter.Config}
 */
export const allowDefaultExports = {
  name: 'wellmade/allow-default-exports',
  files: [
    '**/.*rc.js',
    '**/.*rc.mjs',
    '**/.*rc.cjs',
    '**/*.config.js',
    '**/*.config.mjs',
    '**/*.config.cjs',
    '**/*.config.ts',
    '**/*.config.mts',
    '**/codegen.ts',
    '**/.storybook/main.{js,ts,mjs,mts}',
    '**/.storybook/preview.{js,ts,jsx,tsx,mjs,mts}',
    '**/*.stories.{js,ts,jsx,tsx}',
    // Next / Remix / Astro / Nuxt route conventions
    '**/app/**/page.{js,ts,jsx,tsx}',
    '**/app/**/layout.{js,ts,jsx,tsx}',
    '**/app/**/loading.{js,ts,jsx,tsx}',
    '**/app/**/error.{js,ts,jsx,tsx}',
    '**/app/**/not-found.{js,ts,jsx,tsx}',
    '**/app/**/route.{js,ts}',
    '**/pages/**/*.{js,ts,jsx,tsx}',
  ],
  rules: {
    'import/no-default-export': 'off',
  },
};
