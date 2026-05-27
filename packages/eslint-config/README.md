# @wellmade/eslint-config

ESLint flat-config for Wellmade customer projects. Bug-prevention biased,
type-aware by default, with explicit guardrails against the most common
AI-coding mistakes.

> **Upgrading from `0.1.x`?** Rule prefixes changed in `0.2.0`
> (`import/*` → `import-x/*`, `eslint-comments/*` →
> `@eslint-community/eslint-comments/*`). Existing
> `eslint-disable-next-line import/...` comments silently became
> no-ops. See [MIGRATION.md](./MIGRATION.md) for the sed one-liner.

## Install

```sh
npm install --save-dev eslint typescript @wellmade/eslint-config
```

## Quickstart

```js
// eslint.config.js — TypeScript + Node + Vitest
import {
  basePreset,
  nodePreset,
  vitestPreset,
  ignoreBuildDir,
} from "@wellmade/eslint-config";

export default [
  ignoreBuildDir,
  ...basePreset(import.meta.dirname),
  nodePreset,
  vitestPreset,
];
```

```js
// eslint.config.js — TypeScript + React + Vite + Vitest
import {
  basePreset,
  browserPreset,
  reactPreset,
  vitePreset,
  vitestPreset,
} from "@wellmade/eslint-config";

export default [
  ...basePreset(import.meta.dirname),
  browserPreset,
  reactPreset,
  ...vitePreset,
  vitestPreset,
];
```

```js
// eslint.config.js — NestJS API
import {
  basePreset,
  nodePreset,
  jestPreset,
  nestjsPreset,
  nestjsAllowDefaultExports,
} from "@wellmade/eslint-config";

export default [
  ...basePreset(import.meta.dirname),
  nodePreset,
  jestPreset,
  nestjsPreset,
  nestjsAllowDefaultExports,
];
```

```js
// eslint.config.js — Astro site
import {
  basePreset,
  browserPreset,
  reactPreset,
  astroPreset,
} from "@wellmade/eslint-config";

export default [
  ...basePreset(import.meta.dirname),
  browserPreset,
  reactPreset,
  ...(await astroPreset()),
];
```

## What `basePreset` includes

| Block                  | Purpose                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| `javascriptPreset`     | `@eslint/js` recommended + bug-prevention rules + curated unicorn set            |
| `commonJsOverride`     | Marks `.cjs`/`.cts` as script-source                                             |
| `importsPreset`        | `simple-import-sort` + `import` integrity (no cycles, no duplicates, no default) |
| `jsdocPreset`          | When JSDoc is present, enforce correctness                                       |
| `aiRailguardsJsPreset` | **AI-coding guardrails** — see below                                             |
| `typescriptPreset`     | Type-aware TS rules (naming, type imports, switch exhaustiveness, …)             |
| `aiRailguardsTsPreset` | Type-aware AI guardrails (`any`, `??`, deprecated APIs, redundant casts)         |
| HTML / SVG blocks      | `@html-eslint/*` for static files                                                |
| `allowDefaultExports`  | Carve-out for config files, framework routes, stories                            |

## AI-coding railguards (in detail)

The two `aiRailguards*` presets catch patterns AI assistants reliably produce:

- **Debug breadcrumbs** — `console.log`, `debugger`, `alert` are errors.
  Other `console.*` methods pass.
- **`!TODO`/`!FIXME`/`!HACK` markers** — `TODO` is allowed; the bang-prefixed
  forms block CI. Use them as "stop the line."
- **`any` discipline** — `@typescript-eslint/no-explicit-any` error; the
  `no-unsafe-*` family wired up so values typed as `any` can't propagate.
- **`??` over `||`** — for nullish defaults, `||` swallows valid empty/zero
  values. AI defaults to `||`; we flip it.
- **Defensive `if (foo)` on non-nullable values** — `no-unnecessary-condition`
  errors when TypeScript already proved the value is present.
- **Deprecated APIs** — `no-deprecated` warns when AI calls something marked
  `/** @deprecated */`.
- **Redundant `as` casts** — `no-unnecessary-type-assertion` removes the
  cargo-cult `as Foo` after type guards.
- **`Math.random()`** — flagged as a flakiness source. Override per-file
  if you actually need it.
- **`||` on `process.env.X`** — empty-string env vars are valid; force `??`.
- **`setTimeout(fn, 0)`** — banned (use `queueMicrotask` or document the
  reason).
- **Mega-functions** — `complexity`, `max-lines-per-function`, `max-depth`,
  `max-nested-callbacks`, `max-params` as **warnings** so they surface
  without blocking.

Every `eslint-disable` requires a description (`eslint-comments/require-description`),
so disabling a railguard always carries an explicit reason.

## Layered presets

| Preset                      | Notes                                                                 |
| --------------------------- | --------------------------------------------------------------------- |
| `browserPreset`             | `globals.browser`                                                     |
| `nodePreset`                | `globals.node` + curated `eslint-plugin-n` rules                      |
| `reactPreset`               | React + Hooks + a11y + React Compiler (on by default)                 |
| `jestPreset`                | Jest rules, scoped to `*.test.*` / `*.spec.*` / `__tests__/**`        |
| `vitestPreset`              | Vitest rules. Same scope as `jestPreset` — pick one.                  |
| `vitePreset`                | Default-exports allowed in `vite.config.*`, `vite-env.d.ts` tolerated |
| `astroPreset()`             | Async loader. Needs `eslint-plugin-astro` + `astro-eslint-parser`     |
| `nestjsPreset`              | Unmutes class/decorator patterns that the base preset bans for Nest   |
| `nestjsAllowDefaultExports` | Allows `default export` in Nest module/controller/service/etc. files  |
| `graphqlPreset({ schema })` | Async loader. Needs `@graphql-eslint/eslint-plugin`                   |

## Ignores

```js
import {
  ignoreBuildDir,
  ignorePublicDir,
  ignoreCssTypeDefs,
} from "@wellmade/eslint-config";
```

## Required environment

- ESLint 9 (flat config only)
- TypeScript 5.7+
- Node 20.18+

There is **no legacy `.eslintrc` fallback**.
