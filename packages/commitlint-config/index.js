/**
 * @type {import('@commitlint/types').UserConfig}
 *
 * Conventional Commits, plus a few rules that catch the AI commit-generator
 * failure modes (Title Case subjects, over-long subjects).
 *
 * No `scope-enum` rule by default — consumer projects use their own
 * service / module names as scopes (`api`, `dashboard`, etc.) and the
 * config doesn't pretend to know what they are. If you want to enforce
 * an allow-list of scopes for your project, add `scope-enum` in your
 * own `commitlint.config.js`:
 *
 *     export default {
 *       extends: ['@wellmade/commitlint-config'],
 *       rules: {
 *         'scope-enum': [2, 'always', ['api', 'dashboard', 'deps', 'ci']],
 *       },
 *     };
 */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Subject is lower-case / sentence-case. AI generators love Title Case.
    'subject-case': [2, 'always', ['sentence-case', 'lower-case']],

    // Standard Conventional Commits message shape.
    'body-leading-blank': [2, 'always'],

    // `footer-leading-blank` as a warning, not an error.
    // The conventional-changelog parser treats any blank line in the
    // body as the body→footer boundary, then complains that the trailing
    // `Co-Authored-By:` line is missing its own leading blank. This
    // mis-fires on perfectly valid markdown bodies with multiple bullet
    // groups and is a frequent foot-gun for AI-generated messages.
    // Warning keeps the signal without blocking the commit.
    'footer-leading-blank': [1, 'always'],

    // 100-char subject keeps `git log --oneline` tidy.
    'header-max-length': [2, 'always', 100],
  },
};

export default config;
