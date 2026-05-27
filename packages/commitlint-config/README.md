# @wellmade/commitlint-config

Conventional Commits with the lint rules that catch the
AI-generated `"Update files"` / `"Title Case Subject Line"` shape
without locking you into Wellmade's own scope vocabulary.

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

| Rule                              | Level | Effect                                                                              |
| --------------------------------- | ----- | ----------------------------------------------------------------------------------- |
| `@commitlint/config-conventional` | error | The full Conventional Commits baseline (type-enum, subject-empty, etc.).            |
| `subject-case`                    | error | Subject must be sentence-case or lower-case. No `Title Case`, no `UPPER CASE`.      |
| `header-max-length: 100`          | error | Keeps `git log --oneline` readable.                                                 |
| `body-leading-blank`              | error | Blank line between subject and body.                                                |
| `footer-leading-blank`            | warn  | Blank line between body and footer. **Warning, not error** — see note below.        |

### Note on `footer-leading-blank`

Commitlint's conventional-changelog parser treats *any* blank line in
the body as the body→footer boundary, then complains that the
trailing footer line (e.g. `Co-Authored-By:`) is missing its leading
blank. This mis-fires on perfectly valid markdown commit bodies that
group bullets with blank lines, e.g.:

```
chore: cleanup

- group 1, line 1
- group 1, line 2

- group 2, line 1
- group 2, line 2

Co-Authored-By: someone <noreply@example.com>
```

That message is well-formed Conventional Commits but the parser
rejects it. Demoting `footer-leading-blank` to warning keeps the
signal without blocking the commit. The workaround for the warning
itself is to keep the body to a single paragraph (no blank line
between bullet groups).

## Scopes

**This config does not enforce a `scope-enum` rule by default.** You
can use any scope (or no scope) in your commit messages.

If your project wants to lock scopes to an allow-list — typically
your service or module names — add `scope-enum` in your own config:

```js
// commitlint.config.js
export default {
  extends: ['@wellmade/commitlint-config'],
  rules: {
    'scope-enum': [2, 'always', ['api', 'dashboard', 'deps', 'ci', 'docs']],
  },
};
```

Inside Wellmade's own toolchain repos (this one included), the
equivalent rule is opted into per-repo so the cross-cutting
package-name scopes (`eslint-config`, `bedrock`, etc.) are enforced
only where they matter, not pushed onto every consumer.
