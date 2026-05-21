/**
 * AI-coding railguards.
 *
 * These rules target patterns that AI coding assistants reliably produce —
 * either because they're trained on years of slightly-wrong examples, or
 * because the easiest hallucination is the most-typed sequence. We catch
 * them at lint time so they never make it into review.
 *
 * Split into two layers:
 *
 *  - `aiRailguardsPreset` is type-aware and lives next to the TS preset.
 *  - `aiRailguardsJsPreset` is non-type-aware and applies everywhere.
 *
 * Both are part of `basePreset` by default; opt out by spreading
 * `{ rules: { ...aiOverride } }` after.
 */

const restrictedSyntaxAi = [
  {
    // AI loves Math.random() in tests. It's a flake factory.
    selector: "CallExpression[callee.object.name='Math'][callee.property.name='random']",
    message:
      'Math.random() makes tests flaky and behavior nondeterministic. Use a seeded RNG or fixed fixture.',
  },
  {
    // `process.env.X || 'default'` is wrong when the env var is set to ''.
    // Prefer `process.env.X ?? 'default'` (TS rule below also covers this).
    selector:
      "MemberExpression[object.object.name='process'][object.property.name='env'] ~ LogicalExpression[operator='||']",
    message:
      'Prefer `??` over `||` when reading process.env values — an empty string is a valid (and intentional) value.',
  },
  {
    // Bare `setTimeout(..., 0)` is almost always a hack; prefer queueMicrotask
    // or a documented reason. AI uses it as a "fix" without explaining why.
    selector:
      "CallExpression[callee.name='setTimeout'][arguments.length=2][arguments.1.value=0]",
    message:
      'setTimeout(fn, 0) is a code smell. Use `queueMicrotask(fn)`, or document why a real delay is needed.',
  },
  {
    // `new Promise((resolve) => resolve(x))` — AI sometimes wraps already-async
    // values "just to be safe". Use `Promise.resolve(x)`.
    selector: "NewExpression[callee.name='Promise'] > ArrowFunctionExpression.arguments:matches([body.type='Identifier'], [body.type='Literal'])",
    message: 'Use `Promise.resolve(value)` instead of wrapping a literal in `new Promise(...)`.',
  },
];

/**
 * Non-type-aware railguards. Safe to enable in any JS or TS project.
 *
 * @type {import('eslint').Linter.Config}
 */
export const aiRailguardsJsPreset = {
  name: 'wellmade/ai-railguards-js',
  rules: {
    // --- AI debug-breadcrumb removal ---
    // The AI loves to leave `console.log` and `debugger` "for inspection" in
    // generated code. Both are errors so they fail CI before merge. Other
    // console methods (`debug`, `info`, `warn`, `error`) are legitimate.
    'no-console': ['error', { allow: ['debug', 'info', 'warn', 'error'] }],
    'no-debugger': 'error',
    'no-alert': 'error',

    // --- TODO discipline ---
    // `TODO` is fine — devs need to ship. `!TODO` / `!FIXME` are stop-the-line
    // markers that block CI. Use them for "this MUST be revisited" cases.
    'no-warning-comments': ['error', { terms: ['!todo', '!fixme', '!hack'], location: 'anywhere' }],

    // --- Hallucination canaries ---
    // The AI is fond of inventing util functions / imports. Combined with
    // `import/no-unresolved` and `no-undef`, these defang the most common
    // hallucinations — but we also patch the syntax patterns above.
    'no-undef': 'error',

    // --- AI-mega-functions / complexity creep ---
    // Warnings, not errors. AI tends to generate single 200-line functions
    // when 4 small ones would be clearer. We surface these as warnings so
    // the dev (or the next AI pass) can refactor.
    complexity: ['warn', { max: 20 }],
    'max-lines-per-function': [
      'warn',
      { max: 200, skipBlankLines: true, skipComments: true, IIFEs: true },
    ],
    'max-depth': ['warn', { max: 4 }],
    'max-nested-callbacks': ['warn', { max: 4 }],
    'max-params': ['warn', { max: 6 }],

    // --- AI-specific syntax bans ---
    'no-restricted-syntax': ['error', ...restrictedSyntaxAi],
  },
};

/**
 * Type-aware railguards. Only valid in the TypeScript preset's `files` scope.
 *
 * @type {import('eslint').Linter.Config}
 */
export const aiRailguardsTsPreset = {
  name: 'wellmade/ai-railguards-ts',
  files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  rules: {
    // --- `any` discipline ---
    // The AI defaults to `any` when a generic would do. Errors out, with the
    // expected escape via `// eslint-disable-next-line ... -- <reason>`.
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false, ignoreRestArgs: false }],
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',

    // --- `??` vs `||` ---
    // AI writes `x || defaultValue` reflexively; for `string`/`number`/`boolean`,
    // this swallows valid empty/zero/false values. `??` is what we want.
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      { ignoreConditionalTests: true, ignorePrimitives: { boolean: false } },
    ],

    // --- Defensive-coding-on-non-nullable values ---
    // AI adds `if (foo)` guards on already-non-nullable values. This rule
    // shrinks code and surfaces type mistakes.
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      { allowConstantLoopConditions: true },
    ],

    // --- Calling deprecated APIs ---
    // AI is trained on years of code, including pre-deprecation. Type-aware
    // detection of `/** @deprecated */`-marked usage.
    '@typescript-eslint/no-deprecated': 'warn',

    // --- Redundant casts ---
    // `as Foo` after an `is Foo` guard, or `as string` on a `string`, etc.
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',

    // --- `await` on non-Thenable ---
    // AI sometimes awaits things that aren't promises. Type-aware check.
    '@typescript-eslint/await-thenable': 'error',

    // --- Template literal hygiene ---
    // `${someObject}` produces `[object Object]`. AI does this surprisingly often.
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: true,
        allowAny: false,
        allowNullish: false,
        allowRegExp: false,
      },
    ],
  },
};
