import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

/**
 * @type {import('eslint').Linter.Config}
 */
export const jestPreset = {
  name: 'wellmade/jest',
  files: [
    '**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
    '**/*.spec.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
    '**/__tests__/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
  ],
  plugins: { jest: jestPlugin },
  languageOptions: {
    globals: { ...globals.jest },
  },
  rules: {
    'jest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'it' }],
    'jest/expect-expect': 'error',
    'jest/max-nested-describe': ['error', { max: 2 }],
    'jest/no-alias-methods': 'error',
    'jest/no-commented-out-tests': 'error',
    'jest/no-conditional-expect': 'error',
    'jest/no-deprecated-functions': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-done-callback': 'error',
    'jest/no-export': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-interpolation-in-snapshots': 'error',
    'jest/no-jasmine-globals': 'error',
    'jest/no-mocks-import': 'error',
    'jest/no-test-return-statement': 'error',
    'jest/prefer-comparison-matcher': 'error',
    'jest/prefer-equality-matcher': 'error',
    'jest/prefer-expect-resolves': 'error',
    'jest/prefer-spy-on': 'error',
    'jest/prefer-to-be': 'error',
    'jest/prefer-to-contain': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/valid-describe-callback': 'error',
    'jest/valid-expect-in-promise': 'error',
    'jest/valid-title': 'error',

    // Tests routinely have long describe blocks and lots of helpers.
    'max-lines-per-function': 'off',
  },
};
