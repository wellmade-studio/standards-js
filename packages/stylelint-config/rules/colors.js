/**
 * Color hygiene. Forces a single canonical representation so design tokens
 * remain greppable and AI assistants can't smuggle in `#fff` next to a
 * declared `--color-bg-primary` token.
 */
export const colorRules = {
  'color-no-hex': true,
  'color-named': 'never',
  'color-function-notation': 'modern',
  'color-function-alias-notation': 'without-alpha',
  'alpha-value-notation': 'number',
  'hue-degree-notation': 'angle',
};
