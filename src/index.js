import { debuglog } from 'util'

const LOG = debuglog('@a-la/import')

/**
 * A La Regex to transpile an import statement into require.
 */
const ALaImportRe = /import ([\w\d]+) from '(.+?)'/gm

/**
 * A La Rule to use the regex for replacement.
 * @type {Rule}
 */
const ALaImport = {
  re: ALaImportRe,
  replacement(match, name, src) {
    const s = `const ${name} = require('${src}')`
    return s
  },
}

/**
 * @typedef {import('restream').Rule} Rule
 */

export { ALaImportRe }
export default ALaImport
