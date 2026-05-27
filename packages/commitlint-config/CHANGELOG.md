# @wellmade/commitlint-config

## 0.2.0

### Minor Changes

- 3313a80: Make the default config friendly to consumer projects.

  Three changes, driven by the first field-adoption report and a round
  of dogfooding the config in this repo:

  **Removed `scope-enum` from the default config.** The previous
  default enumerated wellmade-internal package names (`bedrock`,
  `cli`, `gh-actions`, the per-config names) as the only allowed
  scopes — which meant _every_ commit with a scope was rejected on
  any consumer project (a consumer's `feat(api): …` would fail because
  `api` isn't a Wellmade package). Consumers want their own service
  names as scopes. The config no longer presumes to know what those
  are. Wellmade-internal repos opt into the strict allow-list in their
  own `commitlint.config.js`; the README documents the pattern.

  **Removed `subject-case` from the default config.** The previous
  default required `['sentence-case', 'lower-case']` on subjects to
  catch AI-generated Title Case spam. In real-world dogfooding it
  mis-fired constantly on proper nouns and acronyms (`Rekor`,
  `PascalCase`, `NestJS`, `TypeScript`, `JSON`). The Conventional
  Commits type prefix (`feat:`, `chore:`) already signals
  intentionality, and PR review catches the AI-spam case well enough.
  Teams that want the strict version back can add the rule to their
  own config (README shows how).

  **Demoted `footer-leading-blank` from error to warning.** The
  conventional-changelog parser treats _any_ blank line in the body
  as the body→footer boundary, then fails the trailing line (e.g.
  `Co-Authored-By:`) against a missing-leading-blank check. This
  mis-fires routinely on perfectly valid markdown commit bodies that
  group bullets with blank lines, and is a particular foot-gun for
  AI-generated messages. Keeping it as a warning preserves the signal
  without blocking the commit.

  **Migration:** if your project relied on either rule (very unlikely
  on any non-Wellmade repo), copy the rule into your own
  `commitlint.config.js` — see the README for the pattern. No other
  changes needed; bumping picks up the friendlier defaults.

## 0.1.3

### Patch Changes

- 32c53a9: Re-bump after Rekor transparency-log conflict on prior publish.

  A previous release run for these three packages signed their tarballs
  in sigstore's transparency log (Rekor) but failed to upload the
  tarballs to npm. Retrying the same versions hit a 409 from Rekor,
  which de-duplicates entries by `(tarball-hash, signer-identity)`.

  A version bump produces a fresh tarball, which gets a fresh
  signature, which sidesteps the duplicate. No source code changed —
  these are pure re-release bumps so provenance stays enabled across
  all `@wellmade/*` packages going forward.

## 0.1.2

### Patch Changes

- 611c460: Widen `@commitlint/cli` peer-dep range from `^19.6.0` to `>=19.6.0 <22` so the package can be used with v20 and v21. Both majors only changed Node-version requirements and output formatting; the shared-config schema (`extends` + `rules`) is unchanged.

## 0.1.1

### Patch Changes

- f002fa1: chore(release): verify trusted publishing end-to-end
