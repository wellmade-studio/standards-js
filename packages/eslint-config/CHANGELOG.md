# @wellmade/eslint-config

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
