const rule = require('./lib/rule');
const blank = require('./lib/blank');
const importAs = require('./lib/import-as');

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  rule,
  blank,
  importAs,
]

module.exports=seq