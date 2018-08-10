import { getRequire, getDefault } from '.'

const re = /^ *import\s*(?:([\w\d]+)\s*,)?\s*{([^}]+)}\s+from (["'])(.+?)\3/gm

/**
 * A rule to replace `import { method } from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, def, named, quotes, src) {
    const r = getRequire(quotes, src)
    const mm = named.replace(
      /(.+?)\s+as\s+(.+?)?/g,
      (_, name, alias) => {
        return alias ? `${name}: ${alias}` : name
      })

    if (def) {
      const d = getDefault(def, quotes, src)
      const s = `${d}
const {${mm}} = ${def}`
      return s
    } else {
      const s = `const {${mm}} = ${r}`
      return s
    }
  },
}

export default rule
export { re }