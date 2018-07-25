import { debuglog } from 'util'
import ImportDefaultRule from './lib/default'

const LOG = debuglog('@a-la/import')

/**
 * A La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */
const seq = [
  ImportDefaultRule,
]

export default seq

// export { default } from './lib/default'
// export { ALaImportRe }
