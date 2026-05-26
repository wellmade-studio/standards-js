# @wellmade/tsconfig

## 0.1.4

### Patch Changes

- 32c53a9: Re-bump after Rekor transparency-log conflict on prior publish.

  A previous release run for these three packages signed their tarballs
  in sigstore's transparency log (Rekor) but failed to upload the
  tarballs to npm. Retrying the same versions hit a 409 from Rekor,
  which de-duplicates entries by `(tarball-hash, signer-identity)`.

  A version bump produces a fresh tarball, which gets a fresh
  signature, which sidesteps the duplicate. No source code changed —
  these are pure re-release bumps so provenance stays enabled across
  all `@wellmade/*` packages going forward.

## 0.1.3

### Patch Changes

- 611c460: Widen `typescript` peer-dep range from `^5.7.0` to `>=5.7.0 <7` so the package can be used with TypeScript 6. All Wellmade strict flags (`verbatimModuleSyntax`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `useUnknownInCatchVariables`, etc.) are still supported in v6. TS 6's breaking changes affect deprecated targets (`es5`, classic moduleResolution), not the strict-config surface.

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
