/**
 * Vite glue. Mostly here to:
 *  - allow default exports in `vite.config.*` and `vitest.config.*`
 *  - silence `no-unused-vars` for the `vite-env.d.ts` triple-slash reference
 *  - allow `import.meta.env` / `import.meta.hot` without ESLint complaints
 *
 * @type {import('eslint').Linter.Config[]}
 */
export const vitePreset = [
  {
    name: 'wellmade/vite-config',
    files: ['**/vite.config.{js,mjs,ts,mts}', '**/vitest.config.{js,mjs,ts,mts}'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    name: 'wellmade/vite-env',
    files: ['**/vite-env.d.ts', '**/env.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unicorn/filename-case': 'off',
    },
  },
];
