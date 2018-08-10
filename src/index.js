import { debuglog } from 'util'
import namedRule from './lib/named'

const LOG = debuglog('@a-la/import')

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  namedRule,
]

export default seq