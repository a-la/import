import { debuglog } from 'util'
import rule from './lib/rule'
import importAs from './lib/import-as'

const LOG = debuglog('@a-la/import')

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  rule,
  importAs,
]

export default seq