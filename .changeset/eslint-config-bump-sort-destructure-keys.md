---
'@wellmade/eslint-config': patch
---

Bump `eslint-plugin-sort-destructure-keys` from `^2.0.0` to `^3.0.0`
for full ESLint v10 support.

Plugin v2.x used the removed `context.getSourceCode()` API; consumers
on ESLint 10 hit `TypeError: context.getSourceCode is not a function`
the moment any object-destructure was linted. v3.x adopted the new
context API. Same shape as the
`eslint-plugin-eslint-comments` → `@eslint-community/eslint-plugin-eslint-comments`
swap and the `eslint-plugin-import` → `eslint-plugin-import-x` swap
that landed in 0.2.0; same fix pattern.

Surfaced by bedrock-js being the first repo to dogfood
`@wellmade/eslint-config` against ESLint 10 with object-destructuring
present in source.

No rule changes; consumers on ESLint 9 unaffected.
