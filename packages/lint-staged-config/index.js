/**
 * @type {import('lint-staged').Configuration}
 *
 * Default pipeline for a Wellmade project: ESLint --fix on JS/TS, Stylelint
 * --fix on CSS, Prettier --write on everything else (and after the linters
 * for files they touched). Tracks the file extensions used by the matching
 * @wellmade/* configs.
 */
const config = {
  // JS / TS — ESLint first (may rewrite imports), then Prettier (whitespace).
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': ['eslint --fix', 'prettier --write'],

  // CSS — Stylelint first, then Prettier.
  '*.css': ['stylelint --fix', 'prettier --write'],

  // Everything else Prettier knows about.
  '*.{md,mdx,json,jsonc,yml,yaml,html,svg}': ['prettier --write'],
};

export default config;
