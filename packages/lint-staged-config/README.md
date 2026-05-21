# @wellmade/lint-staged-config

The pre-commit pipeline that ties `@wellmade/eslint-config`,
`@wellmade/prettier-config`, and `@wellmade/stylelint-config` together.
One install, one line of config.

## Install

```sh
npm install --save-dev husky lint-staged \
  @wellmade/eslint-config @wellmade/prettier-config @wellmade/stylelint-config \
  @wellmade/lint-staged-config
npx husky init
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit
```

Point lint-staged at this config — either in `package.json`:

```json
{
  "lint-staged": "@wellmade/lint-staged-config"
}
```

…or in `lint-staged.config.js`:

```js
export { default } from '@wellmade/lint-staged-config';
```

## What runs

| Files matched                                       | Commands (in order)               |
| --------------------------------------------------- | --------------------------------- |
| `*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}`                 | `eslint --fix`, `prettier --write` |
| `*.css`                                             | `stylelint --fix`, `prettier --write` |
| `*.{md,mdx,json,jsonc,yml,yaml,html,svg}`           | `prettier --write`                 |

ESLint and Stylelint run *before* Prettier so they can rewrite imports
or property order; Prettier then normalizes whitespace.

## Overriding

```js
// lint-staged.config.js
import base from '@wellmade/lint-staged-config';

export default {
  ...base,
  // Add project-specific tasks here.
  '*.proto': ['buf format --write'],
};
```
