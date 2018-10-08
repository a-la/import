const {
  getRequire, getDefault, getSource, replaceRequire, fromRe, alwaysCheckES,
} = require('.');

const importRe = /^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?/
const re = new RegExp(`${importRe.source}${fromRe.source}`, 'gm')

/**
 * Remaps `as` into `:`.
 * @param {string} namedSeg The segment containing named imports, e.g., `{ test, test2 as alias2 }`.
 */
const aliasesToDestructuring = (namedSeg) => {
  const mm = namedSeg.replace(
    /(\s+)as(\s+)/g,
    (_, b, a) => {
      const bb = b.split('\n').length == 1 ? '' : b
      return `${bb}:${a}`
    })
  return mm
}
const replaceDefault = (def, replacement) => {
  const d = def
    .replace(',', '')
    .replace(/([^\s]+)/, replacement)
  return d
}

/**
 * A rule to replace `import { method } from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, defSeg, defName, namedSeg, fromSeg, sd, ld) {
    const realSrc = ld
      ? this.markers.literals.map[ld]
      : this.markers.strings.map[sd]
    const [, quotes, src] = /(["'`])(.+?)\1/.exec(realSrc)
    // a special case because regexes are replaced before literals
    const s = src.replace(this.markers.regexes.regExp, (m, i) => {
      const val = this.markers.regexes.map[i]
      return val
    })
    const source = getSource(s, this.config)
    const isLocal = /^[./]/.test(source) && !alwaysCheckES(this.config)
    const { t, ifES } = getDef(defSeg, defName, quotes, source, isLocal)
    const replacedNamed = getNamed(namedSeg, fromSeg, quotes, source, defName)
    const res = [
      t, replacedNamed, ...(isLocal ? [] : [ifES]),
    ]
      .filter(a => a)
      .join('; ')
    return `${res};`
  },
}

const getDef = (defSeg, defName, quotes, src, isLocal) => {
  if (!defSeg) return {}
  const req = getRequire(quotes, src)
  const { d, ifES } = getDefault(defName, req)
  const s = replaceDefault(defSeg, d)
  const o = isLocal ? 'const' : 'let'
  const t = `${o}${s}`
  return { t, ifES }
}

const getNamed = (namedSeg, fromSeg, quotes, src, defName) => {
  if (!namedSeg) return null
  const r = replaceRequire(fromSeg, quotes, src, defName)
  const n = aliasesToDestructuring(namedSeg)
  const s = `const${n}${r}`
  return s
}

module.exports=rule


module.exports.re = re