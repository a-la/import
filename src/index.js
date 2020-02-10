import rule from './lib/rule'
import blank from './lib/blank'
import importAs from './lib/import-as'

/**
 * An À La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  rule,
  blank,
  importAs,
]

export default seq