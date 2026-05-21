# @wellmade/prettier-config

Shared Prettier config used across Wellmade customer projects.

## Install

```sh
npm install --save-dev prettier @wellmade/prettier-config
```

Then in your `package.json`:

```json
{
  "prettier": "@wellmade/prettier-config"
}
```

## Tailwind variant

If you use Tailwind, install the plugin and switch to the Tailwind preset:

```sh
npm install --save-dev prettier-plugin-tailwindcss
```

```json
{
  "prettier": "@wellmade/prettier-config/tailwind"
}
```

## What's in it

| Option                   | Value     | Why                                                          |
| ------------------------ | --------- | ------------------------------------------------------------ |
| `printWidth`             | `100`     | Sweet spot for side-by-side diff review.                     |
| `tabWidth` / `useTabs`   | `2` / `false` | The community default.                                   |
| `semi`                   | `true`    | Explicit > clever ASI.                                       |
| `singleQuote`            | `true`    | JS strings; JSX still uses double via `jsxSingleQuote`.      |
| `trailingComma`          | `'all'`   | Cleaner diffs, smaller AI patches.                           |
| `bracketSameLine`        | `false`   | JSX `>` on its own line.                                     |
| `experimentalTernaries`  | `true`    | Stable since Prettier 3.1, much more readable nested ternaries. |
| `endOfLine`              | `'lf'`    | Cross-platform consistency.                                  |

### Per-file overrides

- `*.svg` → HTML parser.
- `*.md` / `*.mdx` → `printWidth: 120`, `proseWrap: 'always'`.
- `package.json` → `printWidth: 0` for one-key-per-line.

## What's intentionally *not* in it

- **No `prettier-plugin-organize-imports`.** Import ordering lives in
  `@wellmade/eslint-config` so the two tools never fight over the same lines.
