# @wellmade/commitlint-config

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
