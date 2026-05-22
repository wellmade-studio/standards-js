# example-node-vitest

Dogfood fixture for `@wellmade/eslint-config`, `@wellmade/prettier-config`, and `@wellmade/tsconfig`.

This package is **not published**. It exists so the repo lints itself: any change to a config that breaks the example's
`lint` / `typecheck` / `format:check` scripts fails CI before it reaches a customer.

The configs are consumed via npm workspaces — edits to the packages in `../../packages/` are picked up live, no
reinstall needed.

## Add cases here when

- A rule misfires in real code and you fix it (add the pattern that used to break).
- You add a new preset (add a file or block that exercises it).
- A customer hits an edge case the example didn't cover (replicate it here so we don't regress).
