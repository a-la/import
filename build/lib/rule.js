const {
  getRequire, getDefault, getSource, replaceRequire, fromRe,
  alwaysCheckES, isAlamodeModule,
} = require('./');
const fpj = require('fpj');
const { dirname } = require('path');
const { builtinModules } = require('module');

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
const replaceDefault = (def, rep) => {
  const d = def
    .replace(',', '')
    .replace(/([^\s]+)/, rep)
  return d
}

/**
 * A rule to replace `import { method } from 'package'` statement.
 * @type {_restream.Rule}
 */
const rule = {
  re,
  replacement,
}

/**
 * @suppress {globalThis}
 * @type {_alamode.ÀLaModeReplacer}
 */
async function replacement(match, defSeg, defName, namedSeg, fromSeg, sd, ld) {
  const realSrc = ld
    ? this.markers.literals.map[ld]
    : this.markers.strings.map[sd]
  const [, quotes, src] = /** @type {!RegExpResult} */(
    /(["'`])(.+?)\1/.exec(realSrc)
  )
  // a special case because regexes are replaced before literals
  const s = src.replace(this.markers.regexes.regExp, (m, i) => {
    const val = this.markers.regexes.map[i]
    return val
  })
  const source = getSource(s, this.config)
  if (!this.isLocalCache) this.isLocalCache = {}
  const isLocal = await getIsLocal(source, this.config, this.file, this.isLocalCache)
  const { t, ifES } = getDef(defSeg, defName, quotes, source, isLocal)
  const replacedNamed = getNamed(namedSeg, fromSeg, quotes, source, defName)
  const res = [
    t, replacedNamed, ...(isLocal ? [] : [ifES]),
  ]
    .filter(a => a)
    .join('; ')
  return `${res};`
}

const getIsLocal = async (source, config, file, cache) => {
  if (alwaysCheckES(config)) return false
  if (isLib(source)) return true
  if (builtinModules.includes(source)) return true
  if (isAlamodeModule(config, source)) return true
  if (source in cache) return cache[source]
  if (file) try {
    const { 'alamode': alamode } = await fpj(dirname(file), source, {
      fields: ['alamode'],
    })
    cache[source] = !!alamode
    return alamode
  } catch (err) {
    return false
  }
}

const isLib = s => /^[./]/.test(s)

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


/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('alamode/types').ÀLaModeReplacer} _alamode.ÀLaModeReplacer
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('alamode/types').Config} _alamode.Config
 */

module.exports.re = re