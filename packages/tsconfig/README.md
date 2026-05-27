# @wellmade/tsconfig

Seven small TypeScript configs Wellmade projects extend. Strict by
default for libraries; pre-relaxed for the frameworks Wellmade
customers actually use.

## Install

```sh
npm install --save-dev typescript @wellmade/tsconfig
```

## Pick one

| You're building...                                   | Use                                   |
| ---------------------------------------------------- | ------------------------------------- |
| A pure TS library (no framework)                     | `@wellmade/tsconfig/base.json`        |
| A Node CLI / server / script                         | `@wellmade/tsconfig/node.json`        |
| Browser code (vanilla DOM, no React)                 | `@wellmade/tsconfig/dom.json`         |
| A NestJS service (build config)                      | `@wellmade/tsconfig/nestjs.json`      |
| A NestJS service (test config, `tsconfig.spec.json`) | `@wellmade/tsconfig/nestjs-spec.json` |
| A React app (Vite / Next / plain client)             | `@wellmade/tsconfig/react.json`       |
| A Vitest test config                                 | `@wellmade/tsconfig/vitest.json`      |

Examples:

```json
// services/api/tsconfig.json — NestJS service
{ "extends": "@wellmade/tsconfig/nestjs.json", "include": ["src/**/*"] }
```

```json
// services/api/tsconfig.spec.json — paired Nest Jest config
{
  "extends": "@wellmade/tsconfig/nestjs-spec.json",
  "include": ["src/**/*.spec.ts", "test/**/*"]
}
```

```json
// apps/dashboard/tsconfig.json — Vite React app
{ "extends": "@wellmade/tsconfig/react.json", "include": ["src/**/*"] }
```

```json
// packages/shared-types/tsconfig.json — pure TS library
{ "extends": "@wellmade/tsconfig/base.json", "include": ["src/**/*"] }
```

## The presets

### `base.json` — strict baseline (library-grade)

Strict, type-only, opinionated for libraries. The other presets
extend this directly or transitively.

| Flag                         | Value  | Why                                                                                                                  |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| `strict`                     | `true` | The whole strict family.                                                                                             |
| `noUncheckedIndexedAccess`   | `true` | `arr[0]` is `T \| undefined`. Catches real bugs; makes the AI railguards in `@wellmade/eslint-config` actually fire. |
| `noImplicitOverride`         | `true` | Forces `override` keyword on subclass methods.                                                                       |
| `noFallthroughCasesInSwitch` | `true` | Pairs with our ESLint `no-fallthrough`.                                                                              |
| `noImplicitReturns`          | `true` | Every branch returns or none do.                                                                                     |
| `useUnknownInCatchVariables` | `true` | `catch (e)` types `e` as `unknown`.                                                                                  |
| `verbatimModuleSyntax`       | `true` | Forces `import type` / `export type`. Pairs with `@typescript-eslint/consistent-type-imports`.                       |
| `isolatedModules`            | `true` | Required by esbuild / swc. Harmless otherwise.                                                                       |
| `skipLibCheck`               | `true` | Don't typecheck `node_modules` — common practice, big perf win.                                                      |
| `noEmit`                     | `true` | Type-only by default. Your bundler/runtime emits JS.                                                                 |

### `node.json` — Node CLI / server / script

Extends `base.json`. Sets `module: 'NodeNext'`, `moduleResolution:
'NodeNext'`, adds `types: ['node']`. Use for code that Node runs
directly.

### `dom.json` — browser environment

Extends `base.json`. Adds `lib: ['ES2024', 'DOM', 'DOM.Iterable']`,
sets `jsx: 'preserve'` (defer JSX compilation to your bundler). Use
for vanilla browser code.

### `nestjs.json` — NestJS service build

Extends `node.json`. Applies the overrides Nest cannot run with at
the base.json defaults. **Each override is a Nest-requirement, not
an opinion:**

| Flag                           | Value               | Why Nest needs it                                                                                                                                                                                                                                                                   |
| ------------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `noEmit`                       | `false`             | Nest uses tsc-as-emitter, not bundler-mode.                                                                                                                                                                                                                                         |
| `allowImportingTsExtensions`   | `false`             | Paired with `noEmit: false`.                                                                                                                                                                                                                                                        |
| `incremental`                  | `false`             | Nest's `nest-cli.json` sets `deleteOutDir: true` while the tsbuildinfo lives outside dist. tsc reads its cache, thinks all files are unchanged, and emits **nothing** — silent empty-dist failure. Disabling `incremental` trades a slower build for not shipping an empty `dist/`. |
| `module` / `moduleResolution`  | `commonjs` / `node` | Nest emits CommonJS at runtime.                                                                                                                                                                                                                                                     |
| `verbatimModuleSyntax`         | `false`             | Forbids the ESM/CJS interop Nest's emit requires.                                                                                                                                                                                                                                   |
| `isolatedModules`              | `false`             | Conflicts with Nest's decorator metadata flow.                                                                                                                                                                                                                                      |
| `experimentalDecorators`       | `true`              | `class-validator` + `@nestjs/*` depend on it.                                                                                                                                                                                                                                       |
| `emitDecoratorMetadata`        | `true`              | Same.                                                                                                                                                                                                                                                                               |
| `strictPropertyInitialization` | `false`             | DTO pattern (`@IsString() name: string`) uses uninitialised properties; requiring `!` on every field is noise.                                                                                                                                                                      |

### `nestjs-spec.json` — NestJS test config

Extends `nestjs.json` (which already gives you the right module mode

- Jest-compatible flags). Adds one Jest-resolver-specific override:

| Flag                        | Value   | Why                                                                                        |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `resolvePackageJsonExports` | `false` | ts-jest goes through Node's CJS resolver, which doesn't honor `package.json#exports` maps. |

### `react.json` — React applications

Extends `dom.json`. Currently an alias of `dom.json` — exists as a
discoverable name (React projects reach for `@wellmade/tsconfig/react`
naturally) and as a forward-looking hook for future React-specific
overrides without a breaking rename.

### `vitest.json` — Vitest test config

Extends `node.json`. Adds `vitest/globals` to `types` so
`describe` / `it` / `expect` are available without explicit imports
(relevant when `vitest.config` has `globals: true`).

Unlike Jest, Vitest uses esbuild and works fine with the
`base.json` defaults (no need to relax `verbatimModuleSyntax` or
`isolatedModules`). For browser-side testing-library setups, extend
`dom.json` instead and add `vitest/globals` to its types array.

## What's intentionally _not_ in any of them

- **No `outDir` / `rootDir` / `baseUrl` / `declaration`.** Project-
  specific paths and policy choices; the consumer knows their layout.
- **No `paths` aliases.** Project-specific.
- **No `allowJs`** — explicit. Enable per-project if you need it.
- **No `noPropertyAccessFromIndexSignature`** — stricter than
  `noUncheckedIndexedAccess` without the same payoff; bad friction
  ratio on real codebases.
- **No `exactOptionalPropertyTypes`** — mis-fires on the idiomatic
  `{ key: cond ? value : undefined }` pattern used everywhere in
  HTTP/DB-shaped code and React conditional props. Opt in per-project
  if you really want it (`"exactOptionalPropertyTypes": true` in your
  own `tsconfig.json`); the cost-benefit on app code is unfavorable.

## Composing your own

If you have a setup the presets above don't quite fit, you can
extend more than one (TypeScript 5+ supports array `extends`):

```json
{
  "extends": ["@wellmade/tsconfig/node.json", "./tsconfig.local.json"]
}
```

But if you find yourself composing the same way across multiple
projects, that's a candidate for a new framework preset. Open an
issue.
