import { getRequire, getDefault, getSource, replaceRequire } from '.'

const re = /^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?(\s+from\s+(["'])(.+?)\5)/gm

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
  replacement(match, defSeg, defName, namedSeg, fromSeg, quotes, src) {
    const source = getSource(src, this.config)
    const replacedDefault = getDef(defSeg, defName, quotes, source)
    const replacedNamed = getNamed(namedSeg, fromSeg, quotes, source, defName)
    const res = [
      replacedDefault,
      replacedNamed,
    ]
      .filter(a => a)
      .join(' ')
    return res
  },
}

const getDef = (defSeg, defName, quotes, src) => {
  if (!defSeg) return null
  const req = getRequire(quotes, src)
  const dd = getDefault(defName, req)
  const d = replaceDefault(defSeg, dd)
  const s = `let${d}`
  return s
}

const getNamed = (namedSeg, fromSeg, quotes, src, defName) => {
  if (!namedSeg) return null
  const r = replaceRequire(fromSeg, quotes, src, defName)
  const n = aliasesToDestructuring(namedSeg)
  const s = `const${n}${r}`
  return s
}

export default rule
export { re }