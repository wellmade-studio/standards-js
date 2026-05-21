/**
 * AST-level bans for patterns that are almost always bugs or anti-patterns,
 * with no library coupling — these all reference native APIs only.
 */
export const restrictedSyntax = [
  // for..in iterates enumerable inherited keys too, which is rarely what you want.
  // Use `for..of Object.keys(x)` or `Object.entries(x)`.
  'ForInStatement',

  // Stray semicolons.
  'EmptyStatement',

  {
    selector: "UnaryExpression[operator='void'][argument.type != 'CallExpression']",
    message:
      'The "void x" operator is banned unless used to discard a call result. Use "undefined" instead.',
  },

  {
    selector: "CallExpression[callee.object.name='Object'][callee.property.name='create'] > Literal[raw='null']",
    message: 'Prefer `Object.create(null)` only when intentional; consider `new Map()` for dictionary use cases.',
  },

  {
    selector: "CallExpression[callee.object.name='Date'][callee.property.name='parse']",
    message:
      'Date.parse is locale-dependent and brittle. Use a real date library (date-fns, Temporal, day.js) or construct dates from ISO components.',
  },

  {
    selector: "NewExpression[callee.name='Date'][arguments.length=1][arguments.0.type='Literal']",
    message:
      'Parsing dates with new Date(string) is locale-dependent. Use a real date library or build the Date from numeric components.',
  },

  {
    selector:
      "CallExpression[callee.property.name=/^toLocale/][arguments.length=0] > .callee > .property",
    message: 'Always specify a locale when calling toLocaleX methods.',
  },

  {
    selector:
      "AwaitExpression > CallExpression > MemberExpression.callee > Identifier.property:matches([name='finally'], [name='then'], [name='catch'])",
    message:
      'Do not chain .then/.catch/.finally on an awaited promise. Use try/catch/finally instead.',
  },

  {
    selector:
      "CallExpression[callee.property.name='catch'] > ArrowFunctionExpression.arguments > Identifier:not(:has(TSUnknownKeyword))",
    message: '.catch is typed as `any` by default. Type the parameter explicitly as `unknown`.',
  },

  {
    selector:
      "SequenceExpression:not(WhileStatement > SequenceExpression.test):not(CallExpression > SequenceExpression.callee:has(Literal.expressions[value=0]):has(MemberExpression))",
    message:
      'The comma operator is almost always a bug. Use semicolons or extract a statement.',
  },

  {
    selector:
      "CallExpression[callee.property.name='forEach']:not(CallExpression[callee.object.callee.property.name='filter']) > ArrowFunctionExpression[params.length<2]",
    message:
      'Prefer `for..of` over `.forEach` when the index parameter is not used. (Chained after `.filter` is exempt.)',
  },
];
