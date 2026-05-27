---
'@wellmade/eslint-config': minor
---

`reactPreset`: allow PascalCase as well as kebab-case for `.jsx` /
`.tsx` files.

Driven by field adoption report #9. The base unicorn rule enforces
kebab-case for filenames, which produces 100+ violations on any
non-greenfield React codebase (the React community convention is
`App.tsx`, `BookDetailPage.tsx`, `<ButtonGroup />`). Renaming every
component file isn't realistic and breaks every import.

Now `reactPreset` overrides `unicorn/filename-case` to
`{ cases: { kebabCase: true, pascalCase: true } }` — but only for
JSX/TSX files (the preset's `files` glob narrows it). Hooks, utils,
services typically live in `.ts` / `.js` and keep kebab-case.

No migration needed for projects using `reactPreset` — PascalCase
filenames stop being lint errors automatically.
