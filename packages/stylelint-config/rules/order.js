import { propertyOrdering } from 'stylelint-semantic-groups';

/**
 * Top-down ordering inside a block, plus semantic property ordering.
 * `at-rules` deliberately precedes nested `rules` so `@media` overrides
 * land above `&:hover` variants — otherwise the cascade reads backwards.
 */
export const orderRules = {
  'order/order': ['custom-properties', 'declarations', 'at-rules', 'rules'],
  'order/properties-order': propertyOrdering,
};
