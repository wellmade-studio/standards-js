/**
 * Curated `eslint-plugin-unicorn` rule set. We don't use `recommended` because
 * it includes opinions we disagree with (e.g. `no-null`, `prefer-module`,
 * `prevent-abbreviations` which is famously over-strict).
 *
 * Grouped by intent so it's easy to scan and disable a whole bucket.
 */
export const unicornRules = {
  // --- Catches bugs ---
  'unicorn/no-abusive-eslint-disable': 'error',
  'unicorn/no-instanceof-array': 'error',
  'unicorn/no-invalid-remove-event-listener': 'error',
  'unicorn/no-new-buffer': 'error',
  'unicorn/no-object-as-default-parameter': 'error',
  'unicorn/no-thenable': 'error',
  'unicorn/no-useless-fallback-in-spread': 'error',
  'unicorn/no-useless-length-check': 'error',
  'unicorn/no-useless-promise-resolve-reject': 'error',
  'unicorn/no-useless-spread': 'error',
  'unicorn/no-zero-fractions': 'error',
  'unicorn/require-array-join-separator': 'error',
  'unicorn/require-number-to-fixed-digits-argument': 'error',
  'unicorn/require-post-message-target-origin': 'error',

  // --- Modern API preference ---
  'unicorn/new-for-builtins': 'error',
  'unicorn/prefer-add-event-listener': 'error',
  'unicorn/prefer-array-find': 'error',
  'unicorn/prefer-array-flat': 'error',
  'unicorn/prefer-array-flat-map': 'error',
  'unicorn/prefer-array-index-of': 'error',
  'unicorn/prefer-array-some': 'error',
  'unicorn/prefer-at': 'error',
  'unicorn/prefer-code-point': 'error',
  'unicorn/prefer-date-now': 'error',
  'unicorn/prefer-default-parameters': 'error',
  'unicorn/prefer-dom-node-append': 'error',
  'unicorn/prefer-dom-node-dataset': 'error',
  'unicorn/prefer-dom-node-remove': 'error',
  'unicorn/prefer-dom-node-text-content': 'error',
  'unicorn/prefer-import-meta-properties': 'error',
  'unicorn/prefer-includes': 'error',
  'unicorn/prefer-json-parse-buffer': 'error',
  'unicorn/prefer-keyboard-event-key': 'error',
  'unicorn/prefer-math-trunc': 'error',
  'unicorn/prefer-modern-dom-apis': 'error',
  'unicorn/prefer-negative-index': 'error',
  'unicorn/prefer-optional-catch-binding': 'error',
  'unicorn/prefer-prototype-methods': 'error',
  'unicorn/prefer-query-selector': 'error',
  'unicorn/prefer-regexp-test': 'error',
  'unicorn/prefer-single-call': 'error',
  'unicorn/prefer-spread': 'error',
  'unicorn/prefer-string-replace-all': 'error',
  'unicorn/prefer-string-slice': 'error',
  'unicorn/prefer-string-starts-ends-with': 'error',
  'unicorn/prefer-string-trim-start-end': 'error',

  // --- Hygiene ---
  'unicorn/escape-case': 'error',
  'unicorn/filename-case': ['error', { case: 'kebabCase' }],
  'unicorn/no-array-reduce': 'error',
  'unicorn/no-console-spaces': 'error',
  'unicorn/no-document-cookie': 'error',
  'unicorn/no-hex-escape': 'error',
  'unicorn/numeric-separators-style': 'error',
  'unicorn/relative-url-style': ['error', 'always'],
};
