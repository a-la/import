const { debuglog } = require('util')
const defaultRule = require('./lib/default')
const namedRule = require('./lib/named')

const LOG = debuglog('@a-la/import')

/**
 * A La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  defaultRule,
  namedRule,
]

module.exports = seq

// export { default } from './lib/default'
// export { ALaImportRe }