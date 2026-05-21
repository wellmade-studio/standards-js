/**
 * Modern CSS hygiene. Catches the most common things AI assistants
 * regress on: deprecated at-rules, redundant longhand properties,
 * range-notation media queries written in the legacy syntax.
 */
export const modernCssRules = {
  'at-rule-no-deprecated': true,
  'media-feature-range-notation': 'context',
  'declaration-block-no-redundant-longhand-properties': true,
  'declaration-block-no-duplicate-properties': [
    true,
    { ignore: ['consecutive-duplicates-with-different-values'] },
  ],
  'shorthand-property-no-redundant-values': true,
  'property-no-deprecated': true,
  'function-url-quotes': 'always',
  'comment-empty-line-before': null,
  'custom-property-empty-line-before': null,
  'declaration-empty-line-before': null,
};
