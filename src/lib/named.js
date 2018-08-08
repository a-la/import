const re = /^\s*import\s*(?:([\w\d]+)\s*,)?\s*{\s*((?:,?\s*[\w\d]+(?:\s*as\s*[\w\d]+)?)*)\s*} from (["'])(.+?)\3/gm

/**
 * A rule to replace `import method from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, def, methods, quotes, src) {
    const s = `const { ${methods} } = require(${quotes}${src}${quotes})`
    return s
  },
}

export default rule
export { re }