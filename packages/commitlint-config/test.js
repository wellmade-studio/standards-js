import assert from 'node:assert/strict';
import { test } from 'node:test';
import config from './index.js';

test('extends @commitlint/config-conventional', () => {
  assert.deepEqual(config.extends, ['@commitlint/config-conventional']);
});

test('enforces lower-case / sentence-case subjects (catches AI Title Case)', () => {
  const [level, applicable, allowed] = config.rules['subject-case'];
  assert.equal(level, 2);
  assert.equal(applicable, 'always');
  assert.ok(allowed.includes('sentence-case'));
  assert.ok(allowed.includes('lower-case'));
});

test('scope-enum lists Wellmade packages so `feat(eslint-config): ...` works', () => {
  const [level, applicable, scopes] = config.rules['scope-enum'];
  assert.equal(level, 2);
  assert.equal(applicable, 'always');
  for (const expected of ['eslint-config', 'bedrock', 'cli', 'gh-actions', 'deps']) {
    assert.ok(scopes.includes(expected), `expected scope ${expected}`);
  }
});

test('header-max-length is 100 chars', () => {
  const [, , max] = config.rules['header-max-length'];
  assert.equal(max, 100);
});
