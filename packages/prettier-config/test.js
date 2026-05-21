import assert from 'node:assert/strict';
import { test } from 'node:test';
import base from './index.js';
import tailwind from './tailwind.js';

test('base config exports the expected core options', () => {
  assert.equal(base.printWidth, 100);
  assert.equal(base.singleQuote, true);
  assert.equal(base.trailingComma, 'all');
  assert.equal(base.experimentalTernaries, true);
});

test('tailwind preset extends base and adds the plugin', () => {
  assert.equal(tailwind.printWidth, base.printWidth);
  assert.deepEqual(tailwind.plugins, ['prettier-plugin-tailwindcss']);
});

test('markdown override widens printWidth', () => {
  const md = base.overrides.find((o) => o.files.includes('*.md'));
  assert.ok(md, 'expected a markdown override');
  assert.equal(md.options.printWidth, 120);
});
