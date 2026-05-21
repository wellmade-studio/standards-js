// Composer entry point.
export { basePreset } from './presets/base.js';

// Environment layers.
export { browserPreset } from './presets/browser.js';
export { nodePreset } from './presets/node.js';
export { reactPreset } from './presets/react.js';

// Test runners — pick one.
export { jestPreset } from './presets/jest.js';
export { vitestPreset } from './presets/vitest.js';

// Bundler / framework layers.
export { vitePreset } from './presets/vite.js';
export { astroPreset } from './presets/astro.js';
export { nestjsAllowDefaultExports, nestjsPreset } from './presets/nestjs.js';
export { graphqlPreset } from './presets/graphql.js';

// Optional individual building blocks — useful if you want to compose your own
// base instead of using `basePreset`.
export { aiRailguardsJsPreset, aiRailguardsTsPreset } from './presets/ai-railguards.js';
export { jsdocPreset } from './presets/jsdoc.js';
export { commonJsOverride, javascriptPreset } from './presets/javascript.js';
export { allowDefaultExports, importsPreset } from './presets/imports.js';
export { typescriptPreset } from './presets/typescript.js';

/**
 * Reusable `ignores` blocks for common output directories. Spread these
 * into your `eslint.config.js` before `basePreset(...)` to skip those
 * paths.
 *
 * @type {import('eslint').Linter.Config}
 */
export const ignoreBuildDir = {
  name: 'wellmade/ignore-build',
  ignores: ['build/**', 'dist/**', 'out/**'],
};

/** @type {import('eslint').Linter.Config} */
export const ignorePublicDir = {
  name: 'wellmade/ignore-public',
  ignores: ['public/**'],
};

/** @type {import('eslint').Linter.Config} */
export const ignoreCssTypeDefs = {
  name: 'wellmade/ignore-css-typedefs',
  ignores: ['**/*.css', '**/*.scss', '**/*.css.d.ts', '**/*.scss.d.ts'],
};
