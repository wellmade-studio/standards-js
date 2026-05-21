import base from './index.js';

/**
 * @type {import('prettier').Config}
 *
 * Same defaults as the base preset, plus `prettier-plugin-tailwindcss` which
 * sorts Tailwind utility classes in className strings deterministically.
 *
 * Usage in a consumer's package.json:
 *   "prettier": "@wellmade/prettier-config/tailwind"
 */
const config = {
  ...base,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
