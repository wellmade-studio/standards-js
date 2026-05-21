import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const here = new URL('./', import.meta.url);

async function readJsonc(filename) {
  const text = await readFile(new URL(filename, here), 'utf8');
  // Strip line comments and trailing commas just enough for JSON.parse.
  const stripped = text.replace(/\/\/.*$/gm, '').replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(stripped);
}

test('base.json enables the strictness flags AI railguards depend on', async () => {
  const config = await readJsonc('base.json');
  const opts = config.compilerOptions;
  assert.equal(opts.strict, true);
  assert.equal(opts.noUncheckedIndexedAccess, true);
  assert.equal(opts.exactOptionalPropertyTypes, true);
  assert.equal(opts.noImplicitOverride, true);
  assert.equal(opts.noFallthroughCasesInSwitch, true);
  assert.equal(opts.verbatimModuleSyntax, true);
  assert.equal(opts.useUnknownInCatchVariables, true);
  assert.equal(opts.isolatedModules, true);
});

test('base.json is type-only by default (noEmit)', async () => {
  const config = await readJsonc('base.json');
  assert.equal(config.compilerOptions.noEmit, true);
});

test('node.json extends base and switches to NodeNext module resolution', async () => {
  const config = await readJsonc('node.json');
  assert.equal(config.extends, './base.json');
  assert.equal(config.compilerOptions.module, 'NodeNext');
  assert.equal(config.compilerOptions.moduleResolution, 'NodeNext');
  assert.ok(config.compilerOptions.types.includes('node'));
});

test('dom.json extends base and adds the DOM libs', async () => {
  const config = await readJsonc('dom.json');
  assert.equal(config.extends, './base.json');
  assert.ok(config.compilerOptions.lib.includes('DOM'));
  assert.ok(config.compilerOptions.lib.includes('DOM.Iterable'));
  assert.equal(config.compilerOptions.jsx, 'preserve');
});
