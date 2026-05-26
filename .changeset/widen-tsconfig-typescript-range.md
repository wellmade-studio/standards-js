---
'@wellmade/tsconfig': patch
---

Widen `typescript` peer-dep range from `^5.7.0` to `>=5.7.0 <7` so the package can be used with TypeScript 6. All Wellmade strict flags (`verbatimModuleSyntax`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `useUnknownInCatchVariables`, etc.) are still supported in v6. TS 6's breaking changes affect deprecated targets (`es5`, classic moduleResolution), not the strict-config surface.
