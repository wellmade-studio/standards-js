# @wellmade/eslint-config

## 0.2.0

### Minor Changes

- de629da: **ESLint v10 support, with plugin migrations.**

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

### Patch Changes

- 611c460: Widen peer-dep ranges:
  - `eslint`: `^9.18.0` → `>=9.18.0 <11` (allows v10)
  - `typescript`: `^5.7.0` → `>=5.7.0 <7` (allows v6, optional peer)

  ESLint v10's breaking changes (eslintrc support removed, `name` property restored on configs) don't affect flat-config preset composition. TypeScript v6 retains all the strict flags the configs depend on.

  **Heads up:** consuming projects on ESLint v10 may also need to bump transitive plugins (e.g. `eslint-plugin-react-hooks` to v7, `eslint-plugin-unicorn` to v64) on their own. Those bumps will land in `@wellmade/eslint-config` as a separate audit.

## 0.1.2

### Patch Changes

- 440c305: Fix circular autofix between `simple-import-sort/imports` and
  `padding-line-between-statements`. The padding rule banned blank lines
  between consecutive `import` statements, but `simple-import-sort` inserts
  blank lines between import _groups_ (e.g. externals vs relatives). The
  two would fix-then-unfix forever. Spacing between imports is now owned
  by `simple-import-sort` alone.
- 440c305: Bump `eslint-plugin-unicorn` to `^61.0.0`. The previous `^56.0.1` range
  did not include `unicorn/prefer-import-meta-properties`, which the
  config references — fresh installs failed with `Could not find
"prefer-import-meta-properties" in plugin "unicorn"`.

## 0.1.1

### Patch Changes

- f002fa1: chore(release): verify trusted publishing end-to-end
