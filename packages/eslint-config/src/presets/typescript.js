import tseslint from 'typescript-eslint';

/**
 * TypeScript layer. Type-aware via `projectService: true`, which requires
 * the consumer to call `basePreset(import.meta.dirname)` so we can resolve
 * the right `tsconfig.json`.
 *
 * Many JS rules have a TS equivalent that does the same thing more accurately
 * — we turn off the JS one and turn on the TS one here.
 *
 * @returns {import('eslint').Linter.Config[]}
 */
export function typescriptPreset(tsconfigRootDir) {
  return [
    {
      name: 'wellmade/typescript',
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.d.ts'],
      plugins: {
        '@typescript-eslint': tseslint.plugin,
      },
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      rules: {
        // === JS rules superseded by TS-aware versions ===
        'consistent-return': 'off',
        'default-param-last': 'off',
        'dot-notation': 'off',
        'no-array-constructor': 'off',
        'no-dupe-class-members': 'off',
        'no-implied-eval': 'off',
        'no-invalid-this': 'off',
        'no-loop-func': 'off',
        'no-loss-of-precision': 'off',
        'no-redeclare': 'off',
        'no-shadow': 'off',
        'no-throw-literal': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        'prefer-promise-reject-errors': 'off',
        'require-await': 'off',
        'no-return-await': 'off',

        '@typescript-eslint/consistent-return': 'off',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/dot-notation': [
          'error',
          {
            allowPrivateClassPropertyAccess: true,
            allowProtectedClassPropertyAccess: true,
            allowIndexSignaturePropertyAccess: true,
          },
        ],
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
        '@typescript-eslint/no-shadow': ['error', { allow: ['i', 'j', 'k'] }],
        '@typescript-eslint/no-unused-expressions': [
          'error',
          { allowShortCircuit: true, allowTernary: true, enforceForJSX: true },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^_|^ignore',
            argsIgnorePattern: '^_|^ignore',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/only-throw-error': [
          'error',
          { allowRethrowing: true, allowThrowingUnknown: true },
        ],
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/return-await': ['error', 'always'],

        // === Naming ===
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['class', 'enum', 'interface', 'typeAlias', 'typeParameter'],
            format: ['StrictPascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['camelCase'],
          },
          {
            selector: 'variable',
            modifiers: ['const', 'global'],
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          },
        ],

        // === Types / type system hygiene ===
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
        ],
        '@typescript-eslint/consistent-type-exports': [
          'error',
          { fixMixedExportsWithInlineTypeSpecifier: true },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
        ],
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-extraneous-class': [
          'error',
          { allowConstructorOnly: false, allowEmpty: false, allowStaticOnly: true, allowWithDecorator: true },
        ],
        '@typescript-eslint/no-invalid-void-type': [
          'error',
          { allowInGenericTypeArguments: true, allowAsThisParameter: true },
        ],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-restricted-types': [
          'error',
          {
            types: {
              Function: {
                message:
                  '`Function` is too loose. Define the call signature explicitly (e.g. `(arg: T) => U`).',
              },
              Object: { message: 'Use `object` or `Record<string, unknown>`.', fixWith: 'object' },
              Boolean: { message: 'Use the primitive `boolean`.', fixWith: 'boolean' },
              Number: { message: 'Use the primitive `number`.', fixWith: 'number' },
              String: { message: 'Use the primitive `string`.', fixWith: 'string' },
            },
          },
        ],
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unnecessary-type-conversion': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        // JS-side `default-case` would otherwise force a default branch and silence the above.
        'default-case': 'off',

        // === Promises (type-aware) ===
        '@typescript-eslint/no-floating-promises': [
          'error',
          { ignoreIIFE: true, ignoreVoid: true },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { attributes: false } },
        ],
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/unbound-method': 'error',

        // === Classes ===
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: {
              memberTypes: [
                'signature',
                'call-signature',
                ['static-field', 'static-get', 'static-set'],
                'static-initialization',
                ['instance-field', 'instance-get', 'instance-set'],
                'constructor',
                'static-method',
                'instance-method',
              ],
            },
            interfaces: { memberTypes: 'never', order: 'natural-case-insensitive' },
            typeLiterals: { memberTypes: 'never', order: 'natural-case-insensitive' },
          },
        ],

        // === `ts-expect-error` discipline ===
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-ignore': true,
            'ts-nocheck': true,
            'ts-check': false,
            'ts-expect-error': { descriptionFormat: '^ -- .+' },
            minimumDescriptionLength: 5,
          },
        ],
      },
    },
    {
      name: 'wellmade/typescript-declaration',
      files: ['**/*.d.ts'],
      rules: {
        // Declaration files routinely export types/interfaces by default.
        'import-x/no-default-export': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ];
}
