import assert from 'node:assert/strict';
import { test } from 'node:test';
import base from './index.js';
import tailwind from './tailwind.js';

test('base extends stylelint-config-standard', () => {
  assert.deepEqual(base.extends, ['stylelint-config-standard']);
});

test('base bans hex colors and enables modern color notation', () => {
  assert.equal(base.rules['color-no-hex'], true);
  assert.equal(base.rules['color-function-notation'], 'modern');
});

test('base enforces order/order with at-rules before nested rules', () => {
  const order = base.rules['order/order'];
  assert.ok(order.includes('at-rules'));
  assert.ok(order.indexOf('at-rules') < order.indexOf('rules'));
});

test('tailwind preset whitelists @tailwind and @apply', () => {
  const [, opts] = tailwind.rules['at-rule-no-unknown'];
  assert.ok(opts.ignoreAtRules.includes('tailwind'));
  assert.ok(opts.ignoreAtRules.includes('apply'));
});

test('tailwind preset disables the strict class-name pattern', () => {
  assert.equal(tailwind.rules['selector-class-pattern'], null);
});
