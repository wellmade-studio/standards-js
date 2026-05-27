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

test('header-max-length is 100 chars', () => {
  const [, , max] = config.rules['header-max-length'];
  assert.equal(max, 100);
});

test('no scope-enum rule by default (consumers add their own scopes)', () => {
  assert.equal(
    config.rules['scope-enum'],
    undefined,
    'scope-enum should not be set by default — it would reject every consumer scope',
  );
});

test('footer-leading-blank is a warning, not an error', () => {
  const [level] = config.rules['footer-leading-blank'];
  assert.equal(
    level,
    1,
    'footer-leading-blank mis-fires on multi-paragraph bodies with bullet lists; keep as warning',
  );
});
