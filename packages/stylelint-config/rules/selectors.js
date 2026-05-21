/**
 * Selector conventions. The class pattern allows both kebab-case and
 * camelCase so CSS Modules (`.myClass`) and BEM-ish (`.card-header`)
 * can coexist. Single-character classes are rejected on purpose —
 * they're almost always a typo or accidental leak.
 */
export const selectorRules = {
  'selector-class-pattern': [
    '^([a-z]+[a-zA-Z0-9]+|[a-zA-Z]+-[a-zA-Z0-9]+)+$',
    {
      message: (s) =>
        `Expected class "${s}" to be kebab-case or camelCase with at least 2 characters.`,
    },
  ],
  // CSS Modules' `:global(...)` and view-transitions' `::view-transition-*` are real.
  'selector-pseudo-class-no-unknown': [
    true,
    { ignorePseudoClasses: ['global', 'local'] },
  ],
  'selector-pseudo-element-no-unknown': [
    true,
    { ignorePseudoElements: ['view-transition', '/^view-transition-/'] },
  ],
  'no-descending-specificity': null,
};
