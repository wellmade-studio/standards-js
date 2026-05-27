# @wellmade/tsconfig

## 0.2.0

### Minor Changes

- 5b39ec3: Add four framework presets and relax one base default.

  ### New presets

  Four sub-path exports added, each documenting in its file header
  exactly which overrides it applies and why:
  - **`@wellmade/tsconfig/nestjs.json`** — extends `node.json`,
    pre-applies the nine overrides NestJS needs to run at all
    (CommonJS module mode, decorator metadata, `noEmit: false`,
    `incremental: false` to avoid the silent empty-dist failure with
    `nest-cli.json`'s `deleteOutDir`, `strictPropertyInitialization:
false` for the `@IsString() name: string` DTO pattern).
  - **`@wellmade/tsconfig/nestjs-spec.json`** — extends `nestjs.json`,
    adds the `resolvePackageJsonExports: false` override ts-jest
    needs (its resolver doesn't honor `package.json#exports`).
  - **`@wellmade/tsconfig/react.json`** — extends `dom.json`. Aliased
    for now; gives React projects a discoverable name and a stable
    hook for future React-specific overrides.
  - **`@wellmade/tsconfig/vitest.json`** — extends `node.json`, adds
    `vitest/globals` to types. Vitest itself uses esbuild, so unlike
    Jest it works fine with the base.json strict defaults; the only
    thing it really needs is the globals types.

  ### One change to `base.json`

  Removed `exactOptionalPropertyTypes: true` from the default
  strictness set. Field adoption surfaced 165 + 18 violations on a
  single NestJS + Vite-React monorepo — the rule mis-fires on the
  idiomatic `{ key: cond ? value : undefined }` pattern used
  everywhere in HTTP/DB-shaped code and React conditional props. The
  bugs it catches (serialization edge cases distinguishing
  absent-key from set-to-undefined) are narrow; the friction is
  everywhere. Teams that want it can opt in per-project.

  The other strict flag the field report relaxed
  (`noUncheckedIndexedAccess`) stays on — the bugs it catches are
  real and the friction is concentrated in ORM patterns that a
  targeted preset can address later.

  ### Migration
  - **Plain consumers** — nothing required. `base.json` is strictly
    more permissive (no existing valid code breaks); the four new
    presets are additive sub-paths.
  - **NestJS consumers** — switch `tsconfig.json` from
    `@wellmade/tsconfig/node.json` to `@wellmade/tsconfig/nestjs.json`
    (and `tsconfig.spec.json` to `@wellmade/tsconfig/nestjs-spec.json`).
    This replaces the per-project override pile that the field report
    documented.
  - **React/Vitest consumers** — optional rename from
    `@wellmade/tsconfig/dom.json` / `@wellmade/tsconfig/node.json` to
    the framework-specific names; identical behavior for `react.json`
    today, `vitest.json` adds the globals types convenience.

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
