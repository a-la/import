let rule = require('./lib/rule'); if (rule && rule.__esModule) rule = rule.default;
let importAs = require('./lib/import-as'); if (importAs && importAs.__esModule) importAs = importAs.default;

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  rule,
  importAs,
]

module.exports=seq