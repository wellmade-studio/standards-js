# @wellmade/tsconfig

## 0.1.2

### Patch Changes

- 440c305: Enable `allowImportingTsExtensions` in `base.json`. The base sets
  `noEmit: true` (type-only), so writing `.ts` extensions on relative
  imports is safe and matches our ESLint rule
  `import/extensions: ['error', 'ignorePackages']`. Without this flag,
  typecheck failed even though lint passed.

  Projects that override `noEmit: false` to actually emit JS need to set
  `rewriteRelativeImportExtensions: true` (TS 5.7+) themselves — that
  choice is project-specific.

## 0.1.1

### Patch Changes

- f002fa1: chore(release): verify trusted publishing end-to-end
