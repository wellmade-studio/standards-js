import js from '@eslint/js';
import commentsPlugin from 'eslint-plugin-eslint-comments';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import unicornPlugin from 'eslint-plugin-unicorn';
import { restrictedGlobals } from '../rules/restricted-globals.js';
import { restrictedSyntax } from '../rules/restricted-syntax.js';
import { unicornRules } from '../rules/unicorn.js';

/**
 * Pure-JS rules. Bug-prevention biased. Style is delegated to Prettier
 * everywhere — anything stylistic in this file is something Prettier can't
 * express (multi-line padding, comment width, etc.).
 *
 * @type {import('eslint').Linter.Config}
 */
export const javascriptPreset = {
  name: 'wellmade/javascript',
  plugins: {
    'eslint-comments': commentsPlugin,
    'sort-destructure-keys': sortDestructureKeysPlugin,
    unicorn: unicornPlugin,
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
    reportUnusedInlineConfigs: 'error',
  },
  languageOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
  },
  rules: {
    ...js.configs.recommended.rules,

    // === Equality & coercion ===
    eqeqeq: ['error', 'always'],
    'no-implicit-coercion': ['error', { boolean: true, number: true, string: false }],

    // === Assignment / mutation safety ===
    'no-cond-assign': ['error', 'except-parens'],
    'no-return-assign': ['error', 'except-parens'],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['acc', 'draft'] }],
    'no-multi-assign': 'error',
    'no-class-assign': 'error',
    'no-func-assign': 'error',
    'no-ex-assign': 'error',
    'no-global-assign': 'error',
    'no-self-assign': 'error',
    'no-const-assign': 'error',

    // === Control flow ===
    curly: ['error', 'all'],
    'default-case': ['error', { commentPattern: '^no\\sdefault' }],
    'default-case-last': 'error',
    'no-fallthrough': ['error', { commentPattern: 'fallthrough' }],
    'no-lonely-if': 'error',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': ['error', { enforceForOrderingRelations: true }],
    'no-constant-condition': ['error', { checkLoops: false }],
    'array-callback-return': ['error', { allowImplicit: true }],
    'getter-return': 'error',
    'no-setter-return': 'error',
    'consistent-return': 'off',
    'no-empty': 'error',
    'no-empty-pattern': 'error',
    'no-empty-static-block': 'error',

    // === Variables ===
    'no-var': 'error',
    'no-undef-init': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'no-shadow-restricted-names': 'error',
    'no-redeclare': 'error',
    'no-delete-var': 'error',
    'no-implicit-globals': 'error',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_|^ignore',
        argsIgnorePattern: '^_|^ignore',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // === Functions ===
    'no-loop-func': 'error',
    'no-new-func': 'error',
    'no-inner-declarations': 'error',
    'no-constructor-return': 'error',
    'constructor-super': 'error',
    'no-this-before-super': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-return': 'error',
    'no-useless-concat': 'error',
    'no-useless-rename': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-escape': 'error',
    'func-names': ['error', 'as-needed'],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-template': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-regex-literals': 'error',
    'logical-assignment-operators': ['error', 'always'],

    // === Objects ===
    'object-shorthand': 'error',
    'no-prototype-builtins': 'error',
    'no-proto': 'error',
    'no-new-wrappers': 'error',
    'no-new-symbol': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-extend-native': 'error',
    'grouped-accessor-pairs': ['error', 'anyOrder'],

    // === Arrays ===
    'no-sparse-arrays': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-else-if': 'error',
    'no-duplicate-case': 'error',

    // === Promises / async (JS side; TS layer adds more) ===
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'off', // sometimes correct
    'no-promise-executor-return': 'error',
    'require-atomic-updates': 'error',
    'require-yield': 'error',

    // === Number / Date / regex ===
    'no-compare-neg-zero': 'error',
    'no-floating-decimal': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    radix: ['error', 'always'],
    'no-control-regex': 'error',
    'no-empty-character-class': 'error',
    'no-invalid-regexp': 'error',
    'no-regex-spaces': 'error',
    'no-useless-backreference': 'error',
    'no-misleading-character-class': 'error',

    // === Legacy / forbidden features ===
    'no-eval': 'error',
    'no-caller': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-script-url': 'error',
    'no-with': 'error',
    'no-sequences': 'error',
    'no-multi-str': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-bind': 'error',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true, enforceForJSX: true },
    ],
    'no-case-declarations': 'error',
    'no-obj-calls': 'error',
    'no-unexpected-multiline': 'error',
    'symbol-description': 'error',
    'one-var': ['error', 'never'],
    'unicode-bom': ['error', 'never'],
    yoda: ['error', 'never', { exceptRange: true }],
    strict: ['error', 'never'],

    // === Restricted blocks ===
    'no-restricted-globals': ['error', ...restrictedGlobals],
    'no-restricted-syntax': ['error', ...restrictedSyntax],

    // === Style that Prettier doesn't cover ===
    'max-statements-per-line': ['error', { max: 1 }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
      { blankLine: 'always', prev: 'multiline-expression', next: '*' },
      { blankLine: 'always', prev: 'multiline-let', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'always', prev: '*', next: 'import' },
      { blankLine: 'never', prev: 'import', next: 'import' },
    ],
    'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: false }],

    // === eslint-comments hygiene ===
    'eslint-comments/disable-enable-pair': 'error',
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',
    'eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],

    // === Unicorn ===
    ...unicornRules,
  },
};

/**
 * `.cjs` / `.cts` need script-source semantics (require/module.exports).
 *
 * @type {import('eslint').Linter.Config}
 */
export const commonJsOverride = {
  name: 'wellmade/commonjs',
  files: ['**/*.cjs', '**/*.cts'],
  languageOptions: {
    sourceType: 'script',
  },
};
