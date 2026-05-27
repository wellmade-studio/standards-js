---
'@wellmade/commitlint-config': minor
---

Make the default config friendly to consumer projects.

Two changes, both driven by the first field-adoption report:

**Removed `scope-enum` from the default config.** The previous
default enumerated wellmade-internal package names (`bedrock`,
`cli`, `gh-actions`, the per-config names) as the only allowed
scopes — which meant *every* commit with a scope was rejected on
any consumer project (a consumer's `feat(api): …` would fail because
`api` isn't a Wellmade package). Consumers want their own service
names as scopes. The config no longer presumes to know what those
are. Wellmade-internal repos opt into the strict allow-list in their
own `commitlint.config.js`; the README documents the pattern.

**Demoted `footer-leading-blank` from error to warning.** The
conventional-changelog parser treats *any* blank line in the body
as the body→footer boundary, then fails the trailing line (e.g.
`Co-Authored-By:`) against a missing-leading-blank check. This
mis-fires routinely on perfectly valid markdown commit bodies that
group bullets with blank lines, and is a particular foot-gun for
AI-generated messages. Keeping it as a warning preserves the signal
without blocking the commit.

**Migration:** if your project relied on the previous default's
wellmade-scope enum (very unlikely on any non-Wellmade repo), add
`scope-enum` to your own `commitlint.config.js` rules — see the
README for the pattern. No other changes needed; bumping picks up
the friendlier defaults.
