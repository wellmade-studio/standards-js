import globals from 'globals';

/**
 * @type {import('eslint').Linter.Config}
 */
export const browserPreset = {
  name: 'wellmade/browser',
  languageOptions: {
    globals: { ...globals.browser },
  },
};
