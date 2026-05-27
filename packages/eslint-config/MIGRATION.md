# Migrating between major / minor versions of `@wellmade/eslint-config`

This file documents migrations that require _consumer-side action_.
Patch-level bumps never appear here; minor bumps appear only when
the change can silently regress consumer code (silent failure modes
are the worst kind of bug, so they get extra documentation).

For routine version history, see [`CHANGELOG.md`](./CHANGELOG.md).

---

## `0.2.0` — `eslint-plugin-import` → `eslint-plugin-import-x` rename

**TL;DR:** all rule names that used to start with `import/` now
start with `import-x/`. If you have any `eslint-disable-next-line
import/...` comments or any project-level rule overrides referencing
`import/*`, they silently became no-ops on the upgrade — find and
rename them.

### Why this matters

`eslint-plugin-import@2.32.0` had an open upstream bug (issue
[#3227](https://github.com/import-js/eslint-plugin-import/issues/3227))
that blocked ESLint v10 support. The maintained fork
`eslint-plugin-import-x` ships first-class v10 support. We swapped
the dependency in `0.2.0`.

The catch: when you rename `import/no-default-export` to
`import-x/no-default-export`, every existing
`// eslint-disable-next-line import/no-default-export` comment in
your project **still parses successfully** — ESLint sees an unknown
rule name in the disable comment and silently ignores it. Your
disable comments stop working, the rule starts firing, and you get
what looks like a flood of "new" violations after the upgrade with
no obvious cause.

### Affected rule prefixes

Two prefixes changed in `0.2.0`:

- `import/*` → `import-x/*`
- `eslint-comments/*` → `@eslint-community/eslint-comments/*`

Every rule under those prefixes was renamed. The semantics are
identical; only the prefix changed.

One rule was _removed_ in the swap because the maintained fork
doesn't ship it:

- `import/enforce-node-protocol-usage` — relocated to
  `n/prefer-node-protocol` in our `nodePreset`. Semantically more
  correct (it's a Node-specific concern); behavior unchanged for
  any code that was hitting it.

### Mechanical migration

A `sed` one-liner handles 95% of cases. Run from your project root:

```sh
# Rewrite eslint-disable comments and any rule overrides in JS/TS source.
# BSD sed (macOS) needs the empty-string -i argument; GNU sed does not.
# This form works on both.
find . \
  -type f \
  \( -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' -o -name '*.mjs' -o -name '*.cjs' \) \
  -not -path '*/node_modules/*' \
  -not -path '*/dist/*' \
  -not -path '*/.next/*' \
  -not -path '*/build/*' \
  -exec sed -i.bak -E '
    s|([" /])import/|\1import-x/|g
    s|([" /])eslint-comments/|\1@eslint-community/eslint-comments/|g
  ' {} +

# Remove the .bak files sed left behind.
find . -type f -name '*.bak' -not -path '*/node_modules/*' -delete
```

After running, re-lint and the previously-silent violations should
all surface. The `enforce-node-protocol-usage` removal is the only
one that may require a manual fix — if your project had the rule
disabled anywhere, the new `n/prefer-node-protocol` may need a
fresh disable.

### Verifying the migration worked

```sh
# Should return zero hits (only excluded if you legitimately have a
# package called `import` in your own code, which is unlikely).
grep -rnE "(eslint-disable[^/]*[ /]|\\\"|')import/" . \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  --exclude-dir=.next
```

If you see hits, those are stale disable comments or rule overrides
that escaped the sed pass — typically because they were inside
multi-line comments, JSON files, or non-source paths.

### What if I want to keep the old `import/*` rules

You can't, in `0.2.0`+ — the plugin isn't installed anymore. If
you legitimately need `eslint-plugin-import` for a rule that
`eslint-plugin-import-x` doesn't ship, install it as a direct
dependency in your project and register the plugin under a unique
name (e.g. `import-legacy`) in your own ESLint config. But please
file an issue first; it's almost always better to surface the
missing-rule gap upstream than to keep two implementations side by
side.
