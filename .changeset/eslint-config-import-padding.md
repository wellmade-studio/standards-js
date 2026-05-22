---
'@wellmade/eslint-config': patch
---

Fix circular autofix between `simple-import-sort/imports` and
`padding-line-between-statements`. The padding rule banned blank lines
between consecutive `import` statements, but `simple-import-sort` inserts
blank lines between import *groups* (e.g. externals vs relatives). The
two would fix-then-unfix forever. Spacing between imports is now owned
by `simple-import-sort` alone.
