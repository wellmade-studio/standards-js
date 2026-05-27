import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const here = new URL('./', import.meta.url);

async function readJson(filename) {
  const text = await readFile(new URL(filename, here), 'utf8');
  return JSON.parse(text);
}

// === base.json ===

test('base.json enables the strictness flags AI railguards depend on', async () => {
  const config = await readJson('base.json');
  const opts = config.compilerOptions;
  assert.equal(opts.strict, true);
  assert.equal(opts.noUncheckedIndexedAccess, true);
  assert.equal(opts.noImplicitOverride, true);
  assert.equal(opts.noFallthroughCasesInSwitch, true);
  assert.equal(opts.verbatimModuleSyntax, true);
  assert.equal(opts.useUnknownInCatchVariables, true);
  assert.equal(opts.isolatedModules, true);
});

test('base.json does NOT set exactOptionalPropertyTypes (friction-heavy on app code)', async () => {
  const config = await readJson('base.json');
  assert.equal(
    config.compilerOptions.exactOptionalPropertyTypes,
    undefined,
    'exactOptionalPropertyTypes mis-fires on idiomatic `{ key: cond ? v : undefined }` patterns; opt in per-project if you really want it',
  );
});

test('base.json is type-only by default (noEmit)', async () => {
  const config = await readJson('base.json');
  assert.equal(config.compilerOptions.noEmit, true);
});

// === node.json ===

test('node.json extends base and switches to NodeNext module resolution', async () => {
  const config = await readJson('node.json');
  assert.equal(config.extends, './base.json');
  assert.equal(config.compilerOptions.module, 'NodeNext');
  assert.equal(config.compilerOptions.moduleResolution, 'NodeNext');
  assert.ok(config.compilerOptions.types.includes('node'));
});

// === dom.json ===

test('dom.json extends base and adds the DOM libs', async () => {
  const config = await readJson('dom.json');
  assert.equal(config.extends, './base.json');
  assert.ok(config.compilerOptions.lib.includes('DOM'));
  assert.ok(config.compilerOptions.lib.includes('DOM.Iterable'));
  assert.equal(config.compilerOptions.jsx, 'preserve');
});

// === nestjs.json ===

test('nestjs.json extends node and applies the seven Nest-required overrides', async () => {
  const config = await readJson('nestjs.json');
  const opts = config.compilerOptions;
  assert.equal(config.extends, './node.json');

  // tsc-as-emitter (not bundler).
  assert.equal(opts.noEmit, false);
  assert.equal(opts.allowImportingTsExtensions, false);

  // Silent empty-dist failure mode otherwise.
  assert.equal(opts.incremental, false);

  // Nest emits CommonJS at runtime.
  assert.equal(opts.module, 'commonjs');
  assert.equal(opts.moduleResolution, 'node');
  assert.equal(opts.verbatimModuleSyntax, false);
  assert.equal(opts.isolatedModules, false);

  // class-validator + @nestjs/* metadata.
  assert.equal(opts.experimentalDecorators, true);
  assert.equal(opts.emitDecoratorMetadata, true);

  // DTO @IsString() name: string pattern.
  assert.equal(opts.strictPropertyInitialization, false);
});

// === nestjs-spec.json ===

test('nestjs-spec.json extends nestjs and adds the Jest resolver override', async () => {
  const config = await readJson('nestjs-spec.json');
  assert.equal(config.extends, './nestjs.json');
  assert.equal(
    config.compilerOptions.resolvePackageJsonExports,
    false,
    "ts-jest doesn't honor package.json#exports — needed so spec imports resolve",
  );
});

// === react.json ===

test('react.json extends dom (effectively an alias for now)', async () => {
  const config = await readJson('react.json');
  assert.equal(config.extends, './dom.json');
  // Intentionally minimal — exists as a discoverable name + future hook.
});

// === vitest.json ===

test('vitest.json extends node and registers vitest/globals types', async () => {
  const config = await readJson('vitest.json');
  assert.equal(config.extends, './node.json');
  assert.ok(
    config.compilerOptions.types.includes('vitest/globals'),
    'vitest/globals types make describe/it/expect available without imports',
  );
  assert.ok(config.compilerOptions.types.includes('node'));
});
