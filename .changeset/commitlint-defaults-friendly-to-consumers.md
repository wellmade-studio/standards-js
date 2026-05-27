---
'@wellmade/commitlint-config': minor
---

Make the default config friendly to consumer projects.

Three changes, driven by the first field-adoption report and a round
of dogfooding the config in this repo:

**Removed `scope-enum` from the default config.** The previous
default enumerated wellmade-internal package names (`bedrock`,
`cli`, `gh-actions`, the per-config names) as the only allowed
scopes — which meant *every* commit with a scope was rejected on
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
conventional-changelog parser treats *any* blank line in the body
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
