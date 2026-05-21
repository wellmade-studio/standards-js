# Wellmade — standards

Three shared packages used across Wellmade projects to keep code style,
formatting, and lint rules consistent — and to defend against the most
common AI-coding mistakes.

| Package                                                                | What it is                                                                |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`@wellmade/prettier-config`](./packages/prettier-config)              | Prettier defaults + opt-in `/tailwind` variant                            |
| [`@wellmade/stylelint-config`](./packages/stylelint-config)            | Plain CSS + Tailwind (no SCSS)                                            |
| [`@wellmade/eslint-config`](./packages/eslint-config)                  | ESLint 9 flat-config with AI-coding railguards                            |
| [`@wellmade/tsconfig`](./packages/tsconfig)                            | Strict TypeScript baselines (`base.json` + `node.json` + `dom.json`)      |
| [`@wellmade/commitlint-config`](./packages/commitlint-config)          | Conventional Commits + Wellmade scope allow-list                          |
| [`@wellmade/lint-staged-config`](./packages/lint-staged-config)        | Pre-commit wiring for the three configs above                             |

All six are MIT-licensed and published to npm under the `@wellmade` scope.

---

## Table of contents

- [Quick install](#quick-install)
- [Recipes](#recipes) — copy-paste configurations per stack
  - [Plain TypeScript / Node CLI](#plain-typescript--node-cli)
  - [Node API (Express / Fastify / Hono)](#node-api-express--fastify--hono)
  - [React + Vite (SPA)](#react--vite-spa)
  - [Next.js (App Router)](#nextjs-app-router)
  - [Astro](#astro)
  - [NestJS](#nestjs)
  - [Monorepo (Turborepo / npm workspaces)](#monorepo-turborepo--npm-workspaces)
- [AI-coding railguards](#ai-coding-railguards)
- [Per-package options](#per-package-options)
  - [Prettier — base vs Tailwind](#prettier--base-vs-tailwind)
  - [Stylelint — base vs Tailwind](#stylelint--base-vs-tailwind)
  - [ESLint — layered presets](#eslint--layered-presets)
- [Overriding rules](#overriding-rules)
- [Ignoring files](#ignoring-files)
- [Editor integration](#editor-integration)
- [Pre-commit hooks](#pre-commit-hooks)
- [Commit messages](#commit-messages)
- [TypeScript](#typescript)
- [Required environment](#required-environment)
- [Upgrading](#upgrading)
- [Contributing](#contributing) — working in this repo
- [Design principles](#design-principles)
- [License](#license)

---

## Quick install

Install the configs you need plus their runtime peers:

```sh
# Prettier
npm install --save-dev prettier @wellmade/prettier-config

# Stylelint (plain CSS or Tailwind)
npm install --save-dev stylelint @wellmade/stylelint-config

# ESLint (requires TypeScript even if your project is JS-only — that's how
# typescript-eslint's parser handles JS too)
npm install --save-dev eslint typescript @wellmade/eslint-config

# TypeScript baseline (pairs with eslint-config; recommended for any TS project)
npm install --save-dev typescript @wellmade/tsconfig

# Commit-message linting (Conventional Commits + Wellmade scopes)
npm install --save-dev @commitlint/cli @wellmade/commitlint-config

# Pre-commit pipeline that wires the linters + Prettier
npm install --save-dev husky lint-staged @wellmade/lint-staged-config
```

Then point each tool at its config (recipes below).

---

## Recipes

Each recipe is the smallest configuration that works for that stack. Drop
the snippets straight into a fresh project.

### Plain TypeScript / Node CLI

`package.json`:

```json
{
  "type": "module",
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "prettier": "@wellmade/prettier-config"
}
```

`eslint.config.js`:

```js
import { basePreset, nodePreset, vitestPreset } from '@wellmade/eslint-config';

export default [
  ...basePreset(import.meta.dirname),
  nodePreset,
  vitestPreset,
];
```

### Node API (Express / Fastify / Hono)

```js
// eslint.config.js
import { basePreset, nodePreset, vitestPreset } from '@wellmade/eslint-config';

export default [
  ...basePreset(import.meta.dirname),
  nodePreset,
  vitestPreset,
];
```

If you use Jest instead of Vitest, swap `vitestPreset` for `jestPreset`.

### React + Vite (SPA)

```sh
npm install --save-dev prettier-plugin-tailwindcss   # only if using Tailwind
```

`package.json`:

```json
{
  "prettier": "@wellmade/prettier-config/tailwind"
}
```

`stylelint.config.js`:

```js
import config from '@wellmade/stylelint-config/tailwind';
export default config;
```

`eslint.config.js`:

```js
import {
  basePreset,
  browserPreset,
  reactPreset,
  vitePreset,
  vitestPreset,
} from '@wellmade/eslint-config';

export default [
  ...basePreset(import.meta.dirname),
  browserPreset,
  reactPreset,
  ...vitePreset,
  vitestPreset,
];
```

### Next.js (App Router)

```js
// eslint.config.js
import {
  basePreset,
  browserPreset,
  nodePreset,
  reactPreset,
  vitestPreset,
} from '@wellmade/eslint-config';

export default [
  ...basePreset(import.meta.dirname),
  browserPreset,
  nodePreset, // App Router runs server code too
  reactPreset,
  vitestPreset,
  {
    // Next-specific carve-outs
    files: ['next.config.{js,mjs,ts}', 'middleware.{js,ts}'],
    rules: { 'import/no-default-export': 'off' },
  },
];
```

The default `allowDefaultExports` block already covers `app/**/page.tsx`,
`app/**/layout.tsx`, `app/**/route.ts`, etc.

### Astro

```sh
npm install --save-dev eslint-plugin-astro astro-eslint-parser
```

```js
// eslint.config.js
import {
  basePreset,
  browserPreset,
  reactPreset,
  astroPreset,
} from '@wellmade/eslint-config';

export default [
  ...basePreset(import.meta.dirname),
  browserPreset,
  reactPreset,            // only if you use React inside .astro files
  ...(await astroPreset()),
];
```

### NestJS

```js
// eslint.config.js
import {
  basePreset,
  nodePreset,
  jestPreset,
  nestjsPreset,
  nestjsAllowDefaultExports,
} from '@wellmade/eslint-config';

export default [
  ...basePreset(import.meta.dirname),
  nodePreset,
  jestPreset,
  nestjsPreset,
  nestjsAllowDefaultExports,
];
```

`nestjsPreset` unmutes the class-heavy / decorator-heavy patterns the base
preset bans. `nestjsAllowDefaultExports` is a file-scoped carve-out for
`*.module.ts`, `*.controller.ts`, `*.service.ts`, etc.

### Monorepo (Turborepo / npm workspaces)

In the **root** of the monorepo, install the configs once:

```sh
npm install --save-dev -w . prettier eslint typescript @wellmade/prettier-config @wellmade/eslint-config
```

Root `eslint.config.js`:

```js
import { basePreset } from '@wellmade/eslint-config';

export default [
  ...basePreset(import.meta.dirname),
];
```

Per-package `eslint.config.js` extends the root and adds environment-specific
layers:

```js
// packages/web/eslint.config.js
import root from '../../eslint.config.js';
import { browserPreset, reactPreset, vitestPreset } from '@wellmade/eslint-config';

export default [
  ...root,
  browserPreset,
  reactPreset,
  vitestPreset,
];
```

---

## AI-coding railguards

The two `aiRailguards*` presets (loaded automatically by `basePreset`) catch
patterns AI coding assistants reliably produce. They earn their keep on
the very first AI-authored PR you review:

| Rule                                              | Catches                                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `no-console` (allowing `debug`/`info`/`warn`/`error`) | Debug breadcrumbs the assistant forgot to remove.                                       |
| `no-debugger`, `no-alert`                         | More debug breadcrumbs.                                                                    |
| `no-warning-comments: ['!todo','!fixme','!hack']` | Stop-the-line markers vs. tolerated `TODO`.                                                |
| `Math.random()` ban (configurable)                | Test flakiness sources.                                                                    |
| `?? > ||` on `process.env.X`                      | `||` swallows the valid empty-string env var.                                              |
| `setTimeout(fn, 0)` ban                           | Cargo-cult fix; prefer `queueMicrotask` or document the delay.                             |
| `new Promise((r) => r(x))` ban                    | Should be `Promise.resolve(x)`.                                                            |
| `complexity` / `max-lines-per-function` warnings  | AI mega-functions (200-line "do everything" generated functions).                          |
| `@typescript-eslint/no-explicit-any`              | Reflexive `any` instead of generics.                                                       |
| `no-unsafe-argument/assignment/call/member/return`| Once `any` slips in, prevent it propagating.                                               |
| `prefer-nullish-coalescing`                       | `x || default` swallows `0`, `''`, `false`.                                                |
| `no-unnecessary-condition`                        | Defensive `if (foo)` on already-non-nullable values.                                       |
| `no-deprecated`                                   | Calls into `/** @deprecated */`-marked APIs (AI is trained on years of pre-deprecation code). |
| `no-unnecessary-type-assertion`                   | Redundant `as Foo` after type guards.                                                      |
| `restrict-template-expressions`                   | `` `${someObject}` `` producing `[object Object]`.                                         |
| `await-thenable`                                  | `await` on values that aren't promises.                                                    |

Every `eslint-disable` requires a description
(`eslint-comments/require-description`), so any time a railguard is silenced,
the reason is in the source.

To opt out of a railguard in a specific file, use the standard ESLint
override (with the mandatory reason):

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- third-party untyped library
const result = lib.call() as any;
```

---

## Per-package options

### Prettier — base vs Tailwind

| Variant                                     | When to use                                  |
| ------------------------------------------- | -------------------------------------------- |
| `"prettier": "@wellmade/prettier-config"`           | Plain projects (no Tailwind).                |
| `"prettier": "@wellmade/prettier-config/tailwind"` | Adds `prettier-plugin-tailwindcss` to sort utility classes deterministically. |

Both ship `printWidth: 100`, `singleQuote: true`, `trailingComma: 'all'`,
`bracketSameLine: false`, and `experimentalTernaries: true`. Markdown wraps
at 120 with `proseWrap: 'always'`; `package.json` uses `printWidth: 0` for
one-key-per-line diffs.

### Stylelint — base vs Tailwind

| Variant                                        | When to use                                                 |
| ---------------------------------------------- | ----------------------------------------------------------- |
| `import config from '@wellmade/stylelint-config'`         | Plain CSS, CSS Modules, vanilla `<style>` blocks. |
| `import config from '@wellmade/stylelint-config/tailwind'` | Whitelists `@tailwind`, `@apply`, `@layer`, `@variants`, `@screen`, `@config`, `@theme`, `@source`, `@utility`, `@custom-variant`, `@plugin`. Loosens the strict class-name pattern. |

Both ban hex colors, enforce modern color notation, enforce property
ordering via `stylelint-semantic-groups`, and flag deprecated CSS features.

### ESLint — layered presets

`basePreset(import.meta.dirname)` is required; everything else is opt-in.

| Layer                                  | When to add it                                  |
| -------------------------------------- | ----------------------------------------------- |
| `basePreset(import.meta.dirname)`      | **Always.** JS + TS + imports + JSDoc + HTML + AI railguards. |
| `browserPreset`                        | Browser code (adds `window`, `document`, etc.). |
| `nodePreset`                           | Server / CLI code (adds Node globals + a few `eslint-plugin-n` checks). |
| `reactPreset`                          | React projects (Hooks, a11y, React Compiler enabled by default). |
| `jestPreset` **or** `vitestPreset`     | Pick one based on your test runner.             |
| `vitePreset`                           | Vite projects (allows defaults in `vite.config.*`). |
| `astroPreset()` *(async)*              | Astro projects. Lazy-loads `eslint-plugin-astro`. |
| `nestjsPreset` + `nestjsAllowDefaultExports` | NestJS APIs.                              |
| `graphqlPreset({ schema })` *(async)*  | Projects with `.graphql` files.                 |
| `aiRailguardsJsPreset`, `aiRailguardsTsPreset` | Already in `basePreset` — exported for custom compositions. |
| `javascriptPreset`, `typescriptPreset`, `importsPreset`, `jsdocPreset` | Same — building blocks for custom bases. |

---

## Overriding rules

Override per-project by appending a config object to the array. The last
matching entry wins, so anything you put after the imported presets takes
priority:

```js
import { basePreset, nodePreset } from '@wellmade/eslint-config';

export default [
  ...basePreset(import.meta.dirname),
  nodePreset,
  {
    rules: {
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
      // Looser AI-railguard limit for this codebase
      'max-lines-per-function': ['warn', { max: 400 }],
    },
  },
];
```

Scope an override to specific files with `files`:

```js
export default [
  ...basePreset(import.meta.dirname),
  {
    files: ['src/legacy/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
```

---

## Ignoring files

```js
import {
  basePreset,
  ignoreBuildDir,     // build/, dist/, out/
  ignorePublicDir,    // public/
  ignoreCssTypeDefs,  // *.css, *.scss, *.css.d.ts, *.scss.d.ts
} from '@wellmade/eslint-config';

export default [
  ignoreBuildDir,
  ignorePublicDir,
  ...basePreset(import.meta.dirname),
];
```

`basePreset` already ignores `node_modules`, `dist`, `build`, `out`,
`.next`, `.astro`, `.turbo`, `coverage`, and `*.generated.*`.

---

## Editor integration

### VS Code

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "eslint.useFlatConfig": true,
  "stylelint.validate": ["css", "html"]
}
```

Recommended extensions: `esbenp.prettier-vscode`,
`dbaeumer.vscode-eslint`, `stylelint.vscode-stylelint`.

### JetBrains (WebStorm / IntelliJ)

Enable in **Settings → Languages & Frameworks → JavaScript → Code Quality
Tools → ESLint**: pick "Automatic ESLint configuration." Repeat for
Prettier and Stylelint. Tick "Run eslint --fix on save" if you want
auto-fix on save.

---

## Pre-commit hooks

Recommended setup with [husky](https://typicode.github.io/husky/) +
[lint-staged](https://github.com/lint-staged/lint-staged) +
[`@wellmade/lint-staged-config`](./packages/lint-staged-config):

```sh
npm install --save-dev husky lint-staged @wellmade/lint-staged-config
npx husky init
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit
```

`package.json`:

```json
{
  "lint-staged": "@wellmade/lint-staged-config"
}
```

## Commit messages

Conventional Commits with a curated scope list, via
[`@wellmade/commitlint-config`](./packages/commitlint-config):

```sh
npm install --save-dev @commitlint/cli @wellmade/commitlint-config
echo 'export default { extends: ["@wellmade/commitlint-config"] };' > commitlint.config.js
echo 'npx --no-install commitlint --edit "$1"' > .husky/commit-msg
chmod +x .husky/commit-msg
```

## TypeScript

Strict baseline via [`@wellmade/tsconfig`](./packages/tsconfig):

```sh
npm install --save-dev typescript @wellmade/tsconfig
```

```json
// tsconfig.json — pick the variant that matches your runtime
{ "extends": "@wellmade/tsconfig/node.json", "include": ["src/**/*"] }
```

`base.json` for libraries that target both, `dom.json` for browser/React.

---

## Required environment

- **Node 20.18+** (the LTS line used by the configs themselves).
- **ESLint 9** (flat config only — there is no legacy `.eslintrc` fallback).
- **Prettier 3**.
- **Stylelint 16**.
- **TypeScript 5.7+** (required by `@wellmade/eslint-config` even for JS-only
  projects; `typescript-eslint`'s parser uses it under the hood).

---

## Upgrading

```sh
npm install --save-dev \
  @wellmade/prettier-config@latest \
  @wellmade/stylelint-config@latest \
  @wellmade/eslint-config@latest
```

Each package follows semver. Breaking changes (rule additions that error,
removed presets, etc.) ship in a major version with an entry in
[CHANGELOG.md](./packages/eslint-config/CHANGELOG.md). Patch and minor
releases never add new errors — they may add new warnings or new
auto-fixes.

To preview what a new release would do without committing:

```sh
npx eslint --no-warn-ignored .
npx prettier --check .
npx stylelint "**/*.css"
```

---

## Contributing

This repo is a Turborepo + npm workspaces monorepo.

```sh
git clone https://github.com/wellmade-studio/standards-js.git
cd standards-js
npm install
npm test        # node --test in each package
npm run lint    # runs each package's lint task (currently no-op)
```

Layout:

```
packages/
├── prettier-config/
├── stylelint-config/
└── eslint-config/
    └── src/
        ├── index.js              # public API
        ├── presets/              # composable layers
        └── rules/                # rule definitions split by theme
_archive/                         # read-only references; git-ignored
```

To propose a change:

1. Branch from `main`.
2. Make your change in `packages/<name>/`.
3. Run `npm test` from the repo root.
4. Add a changeset: `npx changeset`. Pick the package(s) affected, the
   bump level (patch / minor / major), and write a one-liner describing
   the change.
5. Open a PR. The CI workflow runs `npm test` on Node 20. After merge to
   `main`, the release workflow opens or updates a "Release packages" PR
   — merging that PR publishes to npm.

---

## Design principles

1. **Prettier owns whitespace. ESLint owns logic.** They never touch the
   same lines. Import ordering lives in ESLint
   (`eslint-plugin-simple-import-sort`), not in a Prettier plugin.
2. **Bug-prevention bias.** The ESLint rules are weighted toward catching
   real bugs rather than enforcing style minutiae.
3. **AI-coding aware.** Dedicated `aiRailguards*` presets target the
   specific patterns AI assistants reliably produce.
4. **Layered, not monolithic.** A consumer's `eslint.config.js` reads like
   a list of capabilities: `basePreset`, then `nodePreset`, then
   `reactPreset`, then `vitestPreset`. Nothing hidden, nothing magical.
5. **No customer coupling.** Rules only redirect to native APIs or
   broadly-available ecosystem packages. No bespoke utility libraries
   required.
6. **Modern only.** ESLint 9, Prettier 3, Stylelint 16, TypeScript 5.7+,
   Node 20.18+. No legacy fallbacks.

---

## License

[MIT](./LICENSE) © Wellmade
