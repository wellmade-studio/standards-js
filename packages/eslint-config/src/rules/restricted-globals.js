/**
 * Names that exist on `window`/`globalThis` and routinely shadow local
 * variables. The classic footgun is `event` — declaring `function (event)`
 * silently uses `window.event` if you forgot the argument. Forcing
 * `globalThis.x` makes the intent visible at the call site.
 */
const SHADOW_PRONE_GLOBALS = [
  'event',
  'name',
  'location',
  'history',
  'blur',
  'caches',
  'close',
  'closed',
  'content',
  'devicePixelRatio',
  'focus',
  'find',
  'external',
  'frames',
  'fullScreen',
  'innerHeight',
  'innerWidth',
  'length',
  'isSecureContext',
  'opener',
  'origin',
  'outerHeight',
  'outerWidth',
  'parent',
  'print',
  'screen',
  'screenLeft',
  'screenTop',
  'screenX',
  'screenY',
  'scroll',
  'scrollBy',
  'scrollX',
  'scrollY',
  'self',
  'status',
  'stop',
  'top',
  'visualViewport',
];

export const restrictedGlobals = [
  ...SHADOW_PRONE_GLOBALS.map((name) => ({
    name,
    message: `Likely an accidental use of window.${name}. Use globalThis.${name} if intentional.`,
  })),
  {
    name: 'isNaN',
    message: 'isNaN coerces its input. Use Number.isNaN.',
  },
  {
    name: 'isFinite',
    message: 'isFinite coerces its input. Use Number.isFinite.',
  },
  // parseInt / parseFloat / structuredClone are intentionally allowed —
  // they ship in every supported Node and browser target.
];
