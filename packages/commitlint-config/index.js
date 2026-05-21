/**
 * @type {import('@commitlint/types').UserConfig}
 *
 * Conventional Commits, plus a few rules that catch the AI commit-generator
 * failure modes (Title Case subjects, multi-line single-message commits,
 * missing scope on package-touching changes).
 */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Subject is lower-case / sentence-case. AI generators love Title Case.
    'subject-case': [2, 'always', ['sentence-case', 'lower-case']],

    // Standard Conventional Commits message shape.
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],

    // 100-char subject keeps `git log --oneline` tidy.
    'header-max-length': [2, 'always', 100],

    // Don't require a scope, but if present it must be from the allow-list.
    'scope-enum': [
      2,
      'always',
      [
        // Cross-cutting
        'deps',
        'release',
        'ci',
        'docs',
        'repo',

        // Wellmade packages (extend as new ones ship)
        'eslint-config',
        'prettier-config',
        'stylelint-config',
        'tsconfig',
        'commitlint-config',
        'lint-staged-config',
        'bedrock',
        'cli',
        'gh-actions',
      ],
    ],
  },
};

export default config;
