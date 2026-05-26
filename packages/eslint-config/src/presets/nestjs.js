/**
 * NestJS adjustments. Nest is decorator- and class-heavy in ways the base
 * TypeScript preset doesn't anticipate.
 *
 * Apply *after* the base + TypeScript presets.
 *
 * @type {import('eslint').Linter.Config}
 */
export const nestjsPreset = {
  name: 'wellmade/nestjs',
  files: ['**/*.ts'],
  rules: {
    // Modules, controllers, services use class decorators with empty bodies
    // at times (e.g. tag-only providers). The base ban is too strict for Nest.
    '@typescript-eslint/no-extraneous-class': 'off',

    // Constructor injection routinely needs `private` parameter properties.
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/parameter-properties': 'off',

    // DI containers + reflect-metadata genuinely need `Function` as a token type.
    '@typescript-eslint/no-restricted-types': 'off',

    // Decorator metadata defeats `unbound-method`'s analysis.
    '@typescript-eslint/unbound-method': 'off',

    // `class-validator` / `class-transformer` define empty classes intentionally.
    '@typescript-eslint/no-empty-object-type': 'off',
  },
};

/**
 * Nest modules use default exports for the bootstrap entrypoint and class-style
 * `@Module()` declarations don't always have a single entry point. Allow default
 * exports there and in test-specific files.
 *
 * @type {import('eslint').Linter.Config}
 */
export const nestjsAllowDefaultExports = {
  name: 'wellmade/nestjs-default-exports',
  files: [
    '**/main.ts',
    '**/*.module.ts',
    '**/*.controller.ts',
    '**/*.service.ts',
    '**/*.repository.ts',
    '**/*.guard.ts',
    '**/*.interceptor.ts',
    '**/*.middleware.ts',
    '**/*.filter.ts',
    '**/*.pipe.ts',
    '**/*.decorator.ts',
    '**/*.entity.ts',
    '**/*.dto.ts',
  ],
  rules: {
    'import-x/no-default-export': 'off',
  },
};
