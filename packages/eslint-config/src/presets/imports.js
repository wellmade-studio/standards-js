import importPlugin from 'eslint-plugin-import-x';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

/**
 * Import ordering, deduplication, and cycle detection.
 *
 * `simple-import-sort` owns *order* (deterministic, no opinions about groups).
 * `eslint-plugin-import-x` owns *integrity* (no duplicates, no missing files,
 * no cycles, proper extensions). It's a maintained fork of eslint-plugin-import
 * with first-class ESLint v10 + flat-config support.
 *
 * @type {import('eslint').Linter.Config}
 */
export const importsPreset = {
  name: 'wellmade/imports',
  plugins: {
    'import-x': importPlugin,
    'simple-import-sort': simpleImportSortPlugin,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'import-x/first': 'error',
    'import-x/no-duplicates': ['error', { 'prefer-inline': false }],
    'import-x/no-self-import': 'error',
    'import-x/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import-x/no-cycle': ['error', { maxDepth: 10, ignoreExternal: true }],
    'import-x/no-mutable-exports': 'error',
    'import-x/no-absolute-path': 'error',
    'import-x/no-empty-named-blocks': 'error',
    'import-x/no-default-export': 'error',
    // node: protocol enforcement moved to nodePreset (n/prefer-node-protocol).
    // import-x doesn't carry an equivalent rule.
    'import-x/extensions': ['error', 'ignorePackages'],
    'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  },
  settings: {
    'import-x/resolver': {
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
    'import-x/no-default-export': 'off',
  },
};

