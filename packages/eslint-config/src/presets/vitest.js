import vitestPlugin from '@vitest/eslint-plugin';

/**
 * Mirrors the Jest preset's shape for Vitest. Customers pick one or the
 * other — never both.
 *
 * @type {import('eslint').Linter.Config}
 */
export const vitestPreset = {
  name: 'wellmade/vitest',
  files: [
    '**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
    '**/*.spec.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
    '**/__tests__/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
  ],
  plugins: { vitest: vitestPlugin },
  settings: {
    vitest: {
      typecheck: true,
    },
  },
  rules: {
    'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'it' }],
    'vitest/expect-expect': 'error',
    'vitest/max-nested-describe': ['error', { max: 2 }],
    'vitest/no-alias-methods': 'error',
    'vitest/no-commented-out-tests': 'error',
    'vitest/no-conditional-expect': 'error',
    'vitest/no-disabled-tests': 'warn',
    'vitest/no-done-callback': 'error',
    'vitest/no-focused-tests': 'error',
    'vitest/no-identical-title': 'error',
    'vitest/no-interpolation-in-snapshots': 'error',
    'vitest/no-test-return-statement': 'error',
    'vitest/prefer-comparison-matcher': 'error',
    'vitest/prefer-equality-matcher': 'error',
    'vitest/prefer-expect-resolves': 'error',
    'vitest/prefer-spy-on': 'error',
    'vitest/prefer-to-be': 'error',
    'vitest/prefer-to-contain': 'error',
    'vitest/prefer-to-have-length': 'error',
    'vitest/valid-describe-callback': 'error',
    'vitest/valid-expect': 'error',
    'vitest/valid-title': 'error',

    'max-lines-per-function': 'off',
  },
};
