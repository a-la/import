const { getRequire } = require('.')

const re = /^ *import\s*(?:([\w\d]+)\s*,)?\s*{((?:\s*[\w\d]+(?:\s*as\s*[\w\d]+)?\s*,?\s*)*)} from (["'])(.+?)\3/gm

/**
 * A rule to replace `import { method } from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, def, methods, quotes, src) {
    const r = getRequire(quotes, src)
    const mm = methods.replace(
      /([\w\d]+)(?:\s+as\s*([\w\d]+))?/g,
      (_, name, alias) => {
        return alias ? `${name}: ${alias}` : name
      })

    if (def) {
      const s = `const ${def} = ${r}
const {${mm}} = ${def}`
      return s
    } else {
      const s = `const {${mm}} = ${r}`
      return s
    }
  },
}

module.exports = rule

module.exports.re = re