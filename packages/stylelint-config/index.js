import { colorRules } from './rules/colors.js';
import { modernCssRules } from './rules/modern-css.js';
import { orderRules } from './rules/order.js';
import { selectorRules } from './rules/selectors.js';

/**
 * @type {import('stylelint').Config}
 */
const config = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    ...colorRules,
    ...modernCssRules,
    ...orderRules,
    ...selectorRules,
  },
};

export default config;
