---
'@wellmade/eslint-config': minor
---

Two rule defaults relaxed, both driven by the bedrock-js dogfooding
round (F8 in the field-adoption findings):

**`vitest/consistent-test-it` and `jest/consistent-test-it` no longer
have a default.** Vitest and Jest treat `test()` and `it()` as
aliases — preference, not correctness. Bedrock-js used `test()`
consistently while the preset defaulted to `it()` inside describes;
auto-fix produced 137 rewrites that cascaded into 280+ no-undef and
no-unsafe-call errors because the imports weren't updated. Teams
pick a convention and stick with it — that's the only thing that
matters. Projects that want enforcement can re-enable in their own
config:

```js
'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'it' }]
```

**`no-undef` is now off on TypeScript files** (still on for JS). TS
itself is the authority on scope checking and catches undefined-
identifier references natively. ESLint's `no-undef` can't see TS
type-only globals (e.g. `NodeJS.ErrnoException`, ambient module
declarations) and produces false positives — bedrock hit 8+ such
cases on first lint. The AI-hallucination intent (catch made-up
imports) is already covered by TS's `noImplicitAny` + strict-mode
checks plus `import-x/no-unresolved` from `importsPreset`. This
matches `typescript-eslint`'s own recommended setup.

**Migration:** none required. Both changes are strictly more
permissive; no consumer-side code stops compiling. If you actively
relied on either rule firing in your test files or TS source, add
it back in your own `eslint.config.js`.
