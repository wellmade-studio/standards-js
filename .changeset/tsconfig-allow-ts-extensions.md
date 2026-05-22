---
'@wellmade/tsconfig': patch
---

Enable `allowImportingTsExtensions` in `base.json`. The base sets
`noEmit: true` (type-only), so writing `.ts` extensions on relative
imports is safe and matches our ESLint rule
`import/extensions: ['error', 'ignorePackages']`. Without this flag,
typecheck failed even though lint passed.

Projects that override `noEmit: false` to actually emit JS need to set
`rewriteRelativeImportExtensions: true` (TS 5.7+) themselves — that
choice is project-specific.
