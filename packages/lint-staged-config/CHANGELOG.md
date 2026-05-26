# @wellmade/lint-staged-config

## 0.1.2

### Patch Changes

- 611c460: Widen `lint-staged` peer-dep range from `^15.2.0` to `>=15.2.0 <18` so the package can be used alongside `lint-staged@16` and `@17`. The config is a pure glob → command-string mapping; v16 (nano-spawn, no `--shell`) and v17 (Node 22.22.1+) don't affect this shape. Triggered by a customer report of having to skip the package on a project that had already moved to `lint-staged@16`.

## 0.1.1

### Patch Changes

- f002fa1: chore(release): verify trusted publishing end-to-end
