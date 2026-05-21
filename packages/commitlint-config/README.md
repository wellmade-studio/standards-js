# @wellmade/commitlint-config

Conventional Commits, with a curated scope list that matches the
Wellmade toolchain. Stops the AI-generated `"Update files"` and
`"Title Case Subject Line"` commits.

## Install

```sh
npm install --save-dev @commitlint/cli @wellmade/commitlint-config
```

```js
// commitlint.config.js
export default { extends: ['@wellmade/commitlint-config'] };
```

If you use husky:

```sh
echo 'npx --no-install commitlint --edit "$1"' > .husky/commit-msg
chmod +x .husky/commit-msg
```

## What's enforced

| Rule                     | Effect                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `@commitlint/config-conventional` | The full Conventional Commits baseline (type-enum, subject-empty, etc.).      |
| `subject-case`           | Subject must be sentence-case or lower-case. No `Title Case`, no `UPPER CASE`.          |
| `header-max-length: 100` | Keeps `git log --oneline` readable.                                                     |
| `body-leading-blank`     | Blank line between subject and body.                                                    |
| `footer-leading-blank`   | Blank line between body and footer (where `BREAKING CHANGE:` / `Refs:` etc. live).      |
| `scope-enum`             | If you use a scope, it must be one of the allow-listed package names (see below).       |

## Scopes

Scopes are optional. When present, use one of:

- **Cross-cutting**: `deps`, `release`, `ci`, `docs`, `repo`.
- **Packages**: `eslint-config`, `prettier-config`, `stylelint-config`,
  `tsconfig`, `commitlint-config`, `lint-staged-config`, `bedrock`,
  `cli`, `gh-actions`.

Examples:

```
feat(eslint-config): add bedrockPreset for opt-in safe-parser redirects
fix(tsconfig): relax noPropertyAccessFromIndexSignature in dom.json
chore(deps): bump typescript to 5.7.3
docs(repo): document the gh-actions plan
```

To add a scope (e.g. when a new package ships), edit
[`index.js`](./index.js) and bump the version.
