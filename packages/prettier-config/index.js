/**
 * @type {import('prettier').Config}
 *
 * Whitespace and formatting only. Import ordering, unused detection, and other
 * lint concerns live in @wellmade/eslint-config so the two tools never fight.
 */
const config = {
  // 100 is the diff-readability sweet spot: wide enough that short function calls
  // don't shred into pieces, narrow enough for side-by-side review on a laptop.
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  trailingComma: 'all',

  bracketSpacing: true,
  // JSX closing > goes on its own line — easier to diff, easier for AI tools to edit.
  bracketSameLine: false,
  arrowParens: 'always',

  // Prettier 3.1+ stable. Produces dramatically more readable nested ternaries.
  experimentalTernaries: true,

  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',

  // SVGs are XML, not HTML — using the html parser keeps them tidy.
  overrides: [
    {
      files: ['*.svg'],
      options: { parser: 'html' },
    },
    {
      // Markdown gets a slightly wider wrap so paragraph reflow is less aggressive.
      files: ['*.md', '*.mdx'],
      options: { printWidth: 120, proseWrap: 'always' },
    },
    {
      // package.json is consumed by tooling — keep one key per line for clean diffs.
      files: ['package.json'],
      options: { printWidth: 0 },
    },
  ],
};

export default config;
