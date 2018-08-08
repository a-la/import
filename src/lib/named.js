import mismatch from 'mismatch'
import { getRequire } from '.'

const re = /^ *import\s*(?:([\w\d]+)\s*,)?\s*{\s*((?:,?\s*[\w\d]+(?:\s*as\s*[\w\d]+)?)*)\s*} from (["'])(.+?)\3/gm

/**
 * A rule to replace `import method from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, def, methods, quotes, src) {
    const r = getRequire(quotes, src)
    const m = mismatch(/([\w\d]+)(?:\s*as\s*([\w\d]+))?/g, methods, ['name', 'alias'])
    const mm = m
      .map(({ name, alias }) => (alias ? `${name}: ${alias}` : name) )
      .join(', ')

    if (def) {
      const s = `const ${def} = ${r}
const { ${mm} } = ${def}
`
      return s
    } else {
      const s = `const { ${mm} } = ${r}`
      return s
    }
  },
}

export default rule
export { re }