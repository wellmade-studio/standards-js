import { aiRailguardsJsPreset, aiRailguardsTsPreset } from './ai-railguards.js';
import { commonJsOverride, javascriptPreset } from './javascript.js';
import { allowDefaultExports, importsPreset } from './imports.js';
import { jsdocPreset } from './jsdoc.js';
import { typescriptPreset } from './typescript.js';
import htmlPlugin from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';

/**
 * Base composition. Everything below applies to every project. Layer
 * environment-specific presets on top (`browserPreset`, `nodePreset`,
 * `reactPreset`, `jestPreset`, etc.).
 *
 * The `tsconfigRootDir` argument is required for type-aware TypeScript
 * linting. Pass `import.meta.dirname` from your `eslint.config.js`.
 *
 * @param {string} tsconfigRootDir - Usually `import.meta.dirname`.
 * @returns {import('eslint').Linter.Config[]}
 */
export function basePreset(tsconfigRootDir) {
  return [
    // Default ignores. Layer in more via `ignoreXxx` exports.
    {
      name: 'wellmade/ignores',
      ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/out/**',
        '**/.next/**',
        '**/.astro/**',
        '**/.turbo/**',
        '**/coverage/**',
        '**/*.generated.*',
        '**/*.generated',
      ],
    },

    javascriptPreset,
    commonJsOverride,
    importsPreset,
    jsdocPreset,
    aiRailguardsJsPreset,

    ...typescriptPreset(tsconfigRootDir),
    aiRailguardsTsPreset,

    // HTML / SVG.
    {
      name: 'wellmade/html',
      files: ['**/*.html', '**/*.htm', '**/*.svg'],
      languageOptions: { parser: htmlParser },
      plugins: { '@html-eslint': htmlPlugin },
      rules: {
        '@html-eslint/id-naming-convention': ['error', 'kebab-case'],
        '@html-eslint/no-duplicate-id': 'error',
        '@html-eslint/no-duplicate-attrs': 'error',
        '@html-eslint/require-li-container': 'error',
        '@html-eslint/require-meta-charset': 'error',
        '@html-eslint/require-button-type': 'error',
        '@html-eslint/require-img-alt': 'error',
        '@html-eslint/no-positive-tabindex': 'error',
        strict: 'off',
      },
    },
    {
      name: 'wellmade/html-strict',
      files: ['**/*.html', '**/*.htm'],
      rules: {
        '@html-eslint/require-doctype': 'error',
      },
    },

    // Last: file-pattern exceptions to `import/no-default-export`.
    allowDefaultExports,
  ];
}
