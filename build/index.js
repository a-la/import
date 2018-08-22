const { debuglog } = require('util')
let rule = require('./lib/rule'); if (rule && rule.__esModule) rule = rule.default;

const LOG = debuglog('@a-la/import')

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  rule,
]

module.exports=seq
//# sourceMappingURL=index.js.map