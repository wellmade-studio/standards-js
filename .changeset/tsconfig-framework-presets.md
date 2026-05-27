---
'@wellmade/tsconfig': minor
---

Add four framework presets and relax one base default.

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
