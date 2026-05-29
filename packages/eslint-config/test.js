import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as exports from './src/index.js';

test('public API exports the documented surface', () => {
  const expected = [
    'aiRailguardsJsPreset',
    'aiRailguardsTsPreset',
    'allowDefaultExports',
    'astroPreset',
    'basePreset',
    'browserPreset',
    'commonJsOverride',
    'graphqlPreset',
    'ignoreBuildDir',
    'ignoreCssTypeDefs',
    'ignorePublicDir',
    'importsPreset',
    'javascriptPreset',
    'jestPreset',
    'jsdocPreset',
    'nestjsAllowDefaultExports',
    'nestjsPreset',
    'nodePreset',
    'reactPreset',
    'typescriptPreset',
    'vitePreset',
    'vitestPreset',
  ];
  for (const name of expected) {
    assert.ok(name in exports, `expected to export ${name}`);
  }
});

test('basePreset returns a non-empty flat-config array', () => {
  const config = exports.basePreset(import.meta.dirname);
  assert.ok(Array.isArray(config));
  assert.ok(config.length > 5);
  // First block should be the ignores block.
  assert.equal(config[0].name, 'wellmade/ignores');
});

test('reactPreset allows PascalCase filenames (React component convention)', () => {
  const rule = exports.reactPreset.rules?.['unicorn/filename-case'];
  assert.ok(rule, 'reactPreset should override unicorn/filename-case');
  const [level, options] = rule;
  assert.equal(level, 'error');
  assert.deepEqual(options, { cases: { kebabCase: true, pascalCase: true } });
  // Files glob narrows the relaxation to JSX/TSX.
  assert.deepEqual(exports.reactPreset.files, ['**/*.jsx', '**/*.tsx']);
});

test('vitestPreset does not enforce consistent-test-it (preference, not correctness)', () => {
  assert.equal(
    exports.vitestPreset.rules?.['vitest/consistent-test-it'],
    undefined,
    'vitest treats test() and it() as aliases — projects pick a convention, the preset should not impose one',
  );
});

test('jestPreset does not enforce consistent-test-it (preference, not correctness)', () => {
  assert.equal(
    exports.jestPreset.rules?.['jest/consistent-test-it'],
    undefined,
    'jest treats test() and it() as aliases — projects pick a convention, the preset should not impose one',
  );
});

test('aiRailguardsTsPreset disables no-undef on TS files (TS owns scope checking)', () => {
  assert.equal(
    exports.aiRailguardsTsPreset.rules?.['no-undef'],
    'off',
    'ESLint no-undef cannot see TS type-only globals; TS itself catches undefined-identifier refs',
  );
});

test('aiRailguardsJsPreset keeps no-undef enabled (JS has no equivalent scope checker)', () => {
  assert.equal(
    exports.aiRailguardsJsPreset.rules?.['no-undef'],
    'error',
    'JS files lack a static scope checker; no-undef remains the hallucination canary there',
  );
});

test('every preset has a stable `name`', () => {
  const named = [
    exports.browserPreset,
    exports.nodePreset,
    exports.reactPreset,
    exports.jestPreset,
    exports.vitestPreset,
    exports.jsdocPreset,
    exports.javascriptPreset,
    exports.importsPreset,
    exports.aiRailguardsJsPreset,
    exports.aiRailguardsTsPreset,
    exports.nestjsPreset,
    exports.allowDefaultExports,
  ];
  for (const preset of named) {
    assert.ok(preset.name?.startsWith('wellmade/'), `expected wellmade/ prefix, got ${preset.name}`);
  }
});
