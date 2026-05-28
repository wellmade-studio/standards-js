# @wellmade/stylelint-config

## 0.2.0

### Minor Changes

- 5e94bd0: `@wellmade/stylelint-config/tailwind` now disables `import-notation`.

  Field adoption report F10: the base config inherits `import-notation: url`
  from `stylelint-config-standard`, which auto-rewrites
  `@import 'tailwindcss'` to `@import url('tailwindcss')` on `--fix`.
  Tailwind v4's Vite plugin only recognises the bare-string form when
  deciding whether to inject preflight + utilities. With the `url()`
  wrapper, the build succeeds but the entire utility layer is
  silently skipped — bundle drops from ~80 KB (correct tree-shaken
  output) to ~19 KB (just `@theme` tokens), no error.

  The fix scope is intentionally narrow: only the `tailwind` sub-path
  disables the rule. Vanilla CSS projects still get `import-notation: url`,
  which is the modern recommendation. You opted into a framework
  whose convention conflicts with the vanilla rule; the framework
  wins inside its own preset — same shape as the `nestjs` / `vitest`
  tsconfig presets in 0.2.x of `@wellmade/tsconfig`.

  Migration: if your project relied on the previous behavior (i.e.
  you wanted `@import` rewritten to `url()` even in tailwind files),
  re-enable the rule in your own stylelint config. Unlikely — the
  old behavior was silently broken.

## 0.1.2

### Patch Changes

- 611c460: Widen `stylelint` peer-dep range from `^16.10.0` to `>=16.10.0 <18` so the package can be used with v17. v17's breaking changes (CommonJS Node API removal, some rule-option drops) don't affect the shared-config shape — `extends` + `rules` is unchanged.

## 0.1.1

### Patch Changes

- f002fa1: chore(release): verify trusted publishing end-to-end
