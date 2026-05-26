# @wellmade/stylelint-config

## 0.1.2

### Patch Changes

- 611c460: Widen `stylelint` peer-dep range from `^16.10.0` to `>=16.10.0 <18` so the package can be used with v17. v17's breaking changes (CommonJS Node API removal, some rule-option drops) don't affect the shared-config shape — `extends` + `rules` is unchanged.

## 0.1.1

### Patch Changes

- f002fa1: chore(release): verify trusted publishing end-to-end
