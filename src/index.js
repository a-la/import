import rule, { advancedRule } from './lib/rule'
import importAs, { advancedImportAs } from './lib/import-as'

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
export const advancedSeq = [
  advancedRule,
  advancedImportAs,
]

export default seq