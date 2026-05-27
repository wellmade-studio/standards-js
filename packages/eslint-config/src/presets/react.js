import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

/**
 * React + React Compiler + Hooks + a11y. React Compiler rule is ON by
 * default — it's the recommended path for React 19+ and the compiler
 * stabilized in late 2025.
 *
 * @type {import('eslint').Linter.Config}
 */
export const reactPreset = {
  name: 'wellmade/react',
  files: ['**/*.jsx', '**/*.tsx'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  plugins: {
    react: reactPlugin,
    'react-compiler': reactCompilerPlugin,
    'react-hooks': reactHooksPlugin,
    'jsx-a11y': jsxA11yPlugin,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // === React Compiler ===
    'react-compiler/react-compiler': 'error',

    // === Hooks ===
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // === JSX hygiene ===
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-key': [
      'error',
      { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true, warnOnDuplicates: true },
    ],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-pascal-case': ['error', { allowNamespace: true }],
    'react/jsx-sort-props': ['error', { ignoreCase: true, locale: 'en-US' }],
    'react/no-array-index-key': 'warn',
    'react/no-danger-with-children': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-typos': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/void-dom-elements-no-children': 'error',

    // === Modern React (no PropTypes, no defaultProps for function components) ===
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',

    // === Filename casing for JSX/TSX files ===
    // Allow both kebab-case and PascalCase. PascalCase is the React-community
    // convention for component files (`App.tsx`, `BookDetailPage.tsx`); the
    // base config's kebabCase-only stance produces 100+ rename violations on
    // any non-greenfield React codebase. This preset's `files` glob narrows
    // the relaxation to JSX/TSX, so hooks/utils/services elsewhere (typically
    // `.ts` / `.js`) keep kebab-case.
    'unicorn/filename-case': [
      'error',
      { cases: { kebabCase: true, pascalCase: true } },
    ],

    // === a11y (subset that actually catches real issues) ===
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': ['error', { aspects: ['noHref', 'invalidHref'] }],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
  },
};
