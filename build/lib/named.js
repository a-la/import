const { getRequire, getDefault } = require('.')

const re = /^ *import\s+([\w\d]+)?(?:\s*,?\s*)?(?:{([^}]+)})?\s+from\s+(["'])(.+?)\3/gm

const getNamed = (named) => {
  const mm = named.replace(
    /(.+?)\s+as\s+(.+?)?/g,
    (_, name, alias) => {
      return alias ? `${name}: ${alias}` : name
    })
  return mm
}

/**
 * A rule to replace `import { method } from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, def, named, quotes, src) {
    const r = getRequire(quotes, src)

    if (def && named) {
      const d = getDefault(def, quotes, src)
      const n = getNamed(named)
      const s = `${d}
const {${n}} = ${def}`
      return s
    } else if (def) {
      const d = getDefault(def, quotes, src)
      return d
    } else if (named) {
      const n = getNamed(named)
      const s = `const {${n}} = ${r}`
      return s
    }
  },
}

module.exports = rule

module.exports.re = re