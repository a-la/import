import {
  getRequire, getDefault, getSource, replaceRequire, advancedFromRe,
  simpleFromRe,
  getSrcFromMarkers,
} from '.'

const importRe = /^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?/

export const advancedRe = new RegExp(
  `${importRe.source}${advancedFromRe.source}`, 'gm'
)
export const re = new RegExp(
  `${importRe.source}${simpleFromRe.source}`, 'gm'
)

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

const getRes = (src, defSeg, defName, quotes, namedSeg, fromSeg, config) => {
  const source = getSource(src, config)
  const replacedDefault = getDef(defSeg, defName, quotes, source)
  const replacedNamed = getNamed(namedSeg, fromSeg, quotes, source, defName)
  const res = [
    replacedDefault,
    replacedNamed,
  ]
    .filter(a => a)
    .join(' ')
  return res
}

export const advancedRule = {
  re: advancedRe,
  replacement(match, defSeg, defName, namedSeg, fromSeg, sd, ld) {
    const { src, quotes } = getSrcFromMarkers(sd, ld, this)
    // a special case because regexes are replaced before literals
    const s = src.replace(this.markers.regexes.regExp, (m, i) => {
      const val = this.markers.regexes.map[i]
      return val
    })
    const res = getRes(s, defSeg, defName, quotes, namedSeg, fromSeg, this.config)
    return res
  },
}

/**
 * A rule to replace `import { method } from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, defSeg, defName, namedSeg, fromSeg, quotes, src) {
    const res = getRes(src, defSeg, defName, quotes, namedSeg, fromSeg, this.config)
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