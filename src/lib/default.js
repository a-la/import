const ImportDefaultRe = /^\s*import ([\w\d]+) from (["'])(.+?)\2/gm

/**
 * A La Rule to use the regex for replacement.
 * @type {Rule}
 */
const ImportDefaultRule = {
  re: ImportDefaultRe,
  replacement(match, name, quotes, src) {
    const s = `const ${name} = require(${quotes}${src}${quotes})`
    return s
  },
}

/**
 * @typedef {import('restream').Rule} Rule
 */

export default ImportDefaultRule
export { ImportDefaultRe }