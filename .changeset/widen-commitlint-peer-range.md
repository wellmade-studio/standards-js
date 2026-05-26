---
'@wellmade/commitlint-config': patch
---

Widen `@commitlint/cli` peer-dep range from `^19.6.0` to `>=19.6.0 <22` so the package can be used with v20 and v21. Both majors only changed Node-version requirements and output formatting; the shared-config schema (`extends` + `rules`) is unchanged.
