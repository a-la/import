const { debuglog } = require('util')
let namedRule = require('./lib/named'); if (namedRule && namedRule.__esModule) namedRule = namedRule.default;

const LOG = debuglog('@a-la/import')

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  namedRule,
]

module.exports = seq