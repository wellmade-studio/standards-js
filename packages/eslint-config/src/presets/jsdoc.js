import jsdocPlugin from 'eslint-plugin-jsdoc';

/**
 * Minimal JSDoc rules. We don't require JSDoc on every export — TypeScript
 * provides that documentation. What we *do* enforce is that when JSDoc
 * exists, it's correct and useful.
 *
 * @type {import('eslint').Linter.Config}
 */
export const jsdocPreset = {
  name: 'wellmade/jsdoc',
  plugins: { jsdoc: jsdocPlugin },
  rules: {
    'jsdoc/check-param-names': ['error', { checkDestructured: false }],
    'jsdoc/check-tag-names': 'error',
    'jsdoc/no-types': 'error', // types live in TypeScript, not JSDoc
    'jsdoc/require-asterisk-prefix': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/multiline-blocks': 'error',
    'jsdoc/no-multi-asterisks': 'error',
    'jsdoc/empty-tags': 'error',
  },
};
