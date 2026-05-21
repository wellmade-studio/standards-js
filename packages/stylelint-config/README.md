# @wellmade/stylelint-config

Stylelint config for plain CSS and Tailwind. Built for modern CSS (nesting,
`@layer`, range media queries, view transitions) and CSS Modules.

No SCSS. No CSS-in-JS-specific rules. No MUI/legacy framework opinions.

## Install

```sh
npm install --save-dev stylelint @wellmade/stylelint-config
```

```js
// stylelint.config.js
import config from '@wellmade/stylelint-config';
export default config;
```

## Tailwind variant

```js
// stylelint.config.js
import config from '@wellmade/stylelint-config/tailwind';
export default config;
```

Whitelists Tailwind's at-rules (`@tailwind`, `@apply`, `@layer`, `@variants`,
`@screen`, `@config`, `@theme`, `@source`, `@utility`, `@custom-variant`,
`@plugin`) and `theme()` / `screen()` / `config()` value functions. Disables
the strict class-name pattern so utility-heavy templates don't drown in noise.

## What's in it

Rules are grouped into four small files under `rules/`:

- **colors** — bans hex literals (forces named/`rgb()`/CSS-var tokens),
  modern color notation, `rgb`/`hsl` without alpha aliases.
- **order** — declaration order via `stylelint-order`, semantic property
  order via `stylelint-semantic-groups`. `@media` lands above `&:hover`.
- **selectors** — class names must be kebab-case or camelCase, ≥2 chars.
  `:global` (CSS Modules) and `::view-transition-*` are allowed.
- **modern-css** — `at-rule-no-deprecated`, `property-no-deprecated`,
  range-notation media queries, no redundant longhands.

## What's intentionally *not* in it

- No SCSS. Use a SCSS-specific config alongside if you need it.
- No PostCSS plugin allow-lists. Add your own per-project if you ship custom
  at-rules.
