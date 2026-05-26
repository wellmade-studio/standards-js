---
'@wellmade/eslint-config': patch
---

Widen peer-dep ranges:

- `eslint`: `^9.18.0` → `>=9.18.0 <11` (allows v10)
- `typescript`: `^5.7.0` → `>=5.7.0 <7` (allows v6, optional peer)

ESLint v10's breaking changes (eslintrc support removed, `name` property restored on configs) don't affect flat-config preset composition. TypeScript v6 retains all the strict flags the configs depend on.

**Heads up:** consuming projects on ESLint v10 may also need to bump transitive plugins (e.g. `eslint-plugin-react-hooks` to v7, `eslint-plugin-unicorn` to v64) on their own. Those bumps will land in `@wellmade/eslint-config` as a separate audit.
