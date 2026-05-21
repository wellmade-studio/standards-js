# @wellmade/tsconfig

Three small TypeScript configs Wellmade projects extend. Strict by
default — the type-strictness our lint rules count on.

## Install

```sh
npm install --save-dev typescript @wellmade/tsconfig
```

## Use

Pick the variant that matches your runtime:

```json
// tsconfig.json — Node CLI / server / script
{
  "extends": "@wellmade/tsconfig/node.json",
  "include": ["src/**/*"]
}
```

```json
// tsconfig.json — browser / React / Vite / Next client
{
  "extends": "@wellmade/tsconfig/dom.json",
  "include": ["src/**/*"]
}
```

```json
// tsconfig.json — library that targets both
{
  "extends": "@wellmade/tsconfig/base.json",
  "include": ["src/**/*"]
}
```

## What you get

### `base.json`

Strict baseline. All three flavors extend this.

| Flag | Value | Why |
| --- | --- | --- |
| `strict` | `true` | The whole strict family. |
| `noUncheckedIndexedAccess` | `true` | `arr[0]` is `T \| undefined`. Makes the AI railguards in `@wellmade/eslint-config` actually fire. |
| `exactOptionalPropertyTypes` | `true` | `{ x?: T }` ≠ `{ x: T \| undefined }`. AI tends to conflate these. |
| `noImplicitOverride` | `true` | Forces `override` keyword on subclass methods. |
| `noFallthroughCasesInSwitch` | `true` | Pairs with our ESLint `no-fallthrough`. |
| `noImplicitReturns` | `true` | Every branch returns or none do. |
| `useUnknownInCatchVariables` | `true` | `catch (e)` types `e` as `unknown`. |
| `verbatimModuleSyntax` | `true` | Forces `import type` / `export type`. Pairs with `@typescript-eslint/consistent-type-imports`. |
| `isolatedModules` | `true` | Required by esbuild / swc. Harmless otherwise. |
| `skipLibCheck` | `true` | Don't typecheck `node_modules` — common practice, big perf win. |
| `noEmit` | `true` | Type-only by default. Your bundler/runtime emits JS. |

### `node.json`

Extends `base.json`. Sets `module: 'NodeNext'`, `moduleResolution:
'NodeNext'`, adds `types: ['node']`. Use for CLIs, servers, and scripts
that Node runs directly.

### `dom.json`

Extends `base.json`. Adds `lib: ['ES2024', 'DOM', 'DOM.Iterable']`, sets
`jsx: 'preserve'` (defer JSX compilation to your bundler). Use for
browser code.

## What's intentionally *not* in it

- **No `outDir` / `rootDir` / `declaration`.** Library publishers know what
  these should be; defaults aren't useful for everyone.
- **No `paths` aliases.** Project-specific.
- **No `allowJs`** in `dom.json` — explicit. Enable per-project if you
  need it.
- **No `noPropertyAccessFromIndexSignature`** — it's stricter than
  `noUncheckedIndexedAccess` without the same payoff, and the friction
  ratio is bad on real codebases.
