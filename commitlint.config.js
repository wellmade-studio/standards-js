/**
 * standards-js's own commitlint config. Eats the dogfood, plus enforces
 * the wellmade-internal scope-enum (which the published package
 * @wellmade/commitlint-config deliberately *doesn't* set — see that
 * package's README for the rationale).
 *
 * Consumer projects don't need this file. They `extends` the published
 * package and either let any scope through (default) or set their own
 * scope-enum with their own service names.
 *
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  extends: ['@wellmade/commitlint-config'],
  rules: {
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

        // Wellmade packages in this repo (extend as new ones ship)
        'eslint-config',
        'prettier-config',
        'stylelint-config',
        'tsconfig',
        'commitlint-config',
        'lint-staged-config',
      ],
    ],
  },
};
