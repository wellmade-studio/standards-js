/**
 * @type {import('@commitlint/types').UserConfig}
 *
 * Conventional Commits, plus a small set of rules that keep
 * `git log --oneline` tidy and catch the most painful AI commit-
 * generator failure modes.
 *
 * Deliberate omissions (each was tried and removed after real-world
 * friction):
 *
 *   - **No `scope-enum`** by default. The previous default enumerated
 *     wellmade-internal package names as the only allowed scopes,
 *     which rejected every consumer commit with a service-name scope
 *     (`feat(api): …`). Consumer projects add their own `scope-enum`
 *     in their own config — see README.
 *
 *   - **No `subject-case`** by default. Originally `['sentence-case',
 *     'lower-case']` to catch AI Title Case spam. Real-world cost:
 *     proper nouns and acronyms in subjects (`Rekor`, `PascalCase`,
 *     `NestJS`, `TypeScript`, `JSON`) all violated the rule. The
 *     conventional-commits type prefix already signals intentionality,
 *     and PR review catches the Title Case spam well enough.
 *
 *   - **`footer-leading-blank` as warning**, not error. The
 *     conventional-changelog parser treats any blank line in the body
 *     as the body→footer boundary, then complains the trailing
 *     `Co-Authored-By:` line is missing its leading blank. This
 *     mis-fires on perfectly valid markdown bodies with multiple
 *     bullet groups — a frequent foot-gun for AI-generated messages.
 *     Warning keeps the signal without blocking the commit.
 *
 * If you want a stricter setup for your project, layer the rules back
 * in your own `commitlint.config.js`.
 */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Standard Conventional Commits message shape.
    'body-leading-blank': [2, 'always'],

    // Warning, not error — see file-level note above.
    'footer-leading-blank': [1, 'always'],

    // 100-char subject keeps `git log --oneline` tidy.
    'header-max-length': [2, 'always', 100],
  },
};

export default config;
