import assert from 'node:assert/strict';
import { test } from 'node:test';
import config from './index.js';

test('JS / TS glob runs ESLint --fix then Prettier --write', () => {
  const cmds = config['*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'];
  assert.deepEqual(cmds, ['eslint --fix', 'prettier --write']);
});

test('CSS glob runs Stylelint --fix then Prettier --write', () => {
  const cmds = config['*.css'];
  assert.deepEqual(cmds, ['stylelint --fix', 'prettier --write']);
});

test('docs/config glob runs Prettier only', () => {
  const cmds = config['*.{md,mdx,json,jsonc,yml,yaml,html,svg}'];
  assert.deepEqual(cmds, ['prettier --write']);
});
