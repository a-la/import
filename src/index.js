import { debuglog } from 'util'
import defaultRule from './lib/default'
import namedRule from './lib/named'

const LOG = debuglog('@a-la/import')

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  defaultRule,
  namedRule,
]

export default seq