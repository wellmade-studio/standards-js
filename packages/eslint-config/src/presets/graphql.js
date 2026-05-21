/**
 * GraphQL preset. Loaded lazily — `@graphql-eslint/eslint-plugin` is an
 * optional peer dependency.
 *
 * Lints `.graphql` files (schemas and operations) AND tagged-template
 * literals inside `.ts` / `.tsx` files (e.g. `gql\`...\``).
 *
 * Usage:
 *
 *   import { graphqlPreset } from '@wellmade/eslint-config';
 *   export default [
 *     ...basePreset(import.meta.dirname),
 *     ...(await graphqlPreset({ schema: './schema.graphql' })),
 *   ];
 *
 * @param {{ schema: string, documents?: string | string[] }} options
 * @returns {Promise<import('eslint').Linter.Config[]>}
 */
export async function graphqlPreset(options) {
  const { default: graphqlPlugin } = await import('@graphql-eslint/eslint-plugin');

  return [
    {
      name: 'wellmade/graphql-schema',
      files: ['**/*.graphql', '**/*.gql'],
      plugins: { '@graphql-eslint': graphqlPlugin },
      languageOptions: {
        parser: graphqlPlugin.parser,
        parserOptions: {
          schema: options.schema,
          documents: options.documents,
        },
      },
      rules: {
        ...graphqlPlugin.configs['flat/schema-recommended'].rules,
        ...graphqlPlugin.configs['flat/operations-recommended'].rules,
      },
    },
  ];
}
