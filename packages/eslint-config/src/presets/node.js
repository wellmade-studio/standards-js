import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';

/**
 * Node-specific globals + a small set of `eslint-plugin-n` rules that catch
 * real bugs (missing imports, deprecated APIs, callback-shape mistakes).
 * We deliberately skip the `n/recommended` set because it conflicts with
 * `import/*` and bans some patterns we want (e.g. unpublished imports in
 * workspace packages).
 *
 * @type {import('eslint').Linter.Config}
 */
export const nodePreset = {
  name: 'wellmade/node',
  plugins: { n: nodePlugin },
  languageOptions: {
    globals: { ...globals.node },
  },
  rules: {
    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-deprecated-api': 'error',
    'n/prefer-node-protocol': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/no-process-exit': 'error',
    'n/prefer-promises/dns': 'error',
    'n/prefer-promises/fs': 'error',
    'n/no-sync': ['warn', { allowAtRootLevel: true }],
  },
};
