---
'@wellmade/eslint-config': minor
---

**ESLint v10 support, with plugin migrations.**

The peer-dep widening shipped in the previous release advertised v10
support, but empirical testing surfaced two upstream blockers. This
release fixes them.

Migrations done internally (transparent to consumers using the
exported presets):

- **`eslint-plugin-eslint-comments@3.2.0` → `@eslint-community/eslint-plugin-eslint-comments@4.7.1`.**
  The original plugin uses `context.getSourceCode()` which ESLint v10
  removed. The community fork is API-compatible and actively
  maintained. Rule prefix changed from `eslint-comments/*` to
  `@eslint-community/eslint-comments/*` (the canonical upstream
  convention).
- **`eslint-plugin-import@2.32.0` → `eslint-plugin-import-x@4.16.2`.**
  Upstream has an open issue (#3227) for v10 incompatibility; `import-x`
  is a maintained fork with first-class flat-config + v10 support. Rule
  prefix changed from `import/*` to `import-x/*`. Same rule names
  otherwise.
- **`import-x` doesn't ship `enforce-node-protocol-usage`**; replaced
  by `n/prefer-node-protocol` (added to `nodePreset`). Same enforcement,
  slightly different home — semantically more correct since it's a
  Node-specific concern.

**Breaking for direct rule-override consumers.** If your project's
`eslint.config.js` had local overrides like `'import/no-default-export'`
or `'eslint-comments/disable-enable-pair'`, rename them:

```diff
- 'import/no-default-export': 'off',
+ 'import-x/no-default-export': 'off',

- 'eslint-comments/disable-enable-pair': 'off',
+ '@eslint-community/eslint-comments/disable-enable-pair': 'off',
```

Tested empirically: the dogfood example (Node + Vitest + TypeScript)
now pins `eslint@^10.0.0` and lints clean. The test suite still passes
on v9 (root workspace pin) so the presets remain v9-compatible.

Peer-dep ranges unchanged from the previous release (`eslint: >=9.18.0 <11`).
