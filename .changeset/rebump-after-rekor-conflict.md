---
'@wellmade/commitlint-config': patch
'@wellmade/lint-staged-config': patch
'@wellmade/tsconfig': patch
---

Re-bump after Rekor transparency-log conflict on prior publish.

A previous release run for these three packages signed their tarballs
in sigstore's transparency log (Rekor) but failed to upload the
tarballs to npm. Retrying the same versions hit a 409 from Rekor,
which de-duplicates entries by `(tarball-hash, signer-identity)`.

A version bump produces a fresh tarball, which gets a fresh
signature, which sidesteps the duplicate. No source code changed —
these are pure re-release bumps so provenance stays enabled across
all `@wellmade/*` packages going forward.
