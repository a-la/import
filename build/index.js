let rule = require('./lib/rule'); if (rule && rule.__esModule) rule = rule.default; const { advancedRule } = rule
let importAs = require('./lib/import-as'); if (importAs && importAs.__esModule) importAs = importAs.default; const { advancedImportAs } = importAs

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  rule,
  importAs,
]

/**
 * An advanced rule when strings are also cut and pasted by `alamode`.
 */
       const advancedSeq = [
  advancedRule,
  advancedImportAs,
]

module.exports=seq

module.exports.advancedSeq = advancedSeq
//# sourceMappingURL=index.js.map