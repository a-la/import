import {
  getRequire, getDefault, getSource, replaceRequire, fromRe,
  alwaysCheckES, isAlamodeModule,
} from './'
import fpj from 'fpj'
import { dirname, relative } from 'path'
import { builtinModules } from 'module'

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
function replacement(match, defSeg, defName, namedSeg, fromSeg, sd) {
  const realSrc = this.markers.strings.map[sd]
  const [, quotes, src] = /** @type {!RegExpResult} */(
    /(["'`])(.+?)\1/.exec(realSrc)
  )
  if (this.renameOnly) {
    const renamed = getSource(src, this.config)
    return match.replace(/%%_RESTREAM_STRINGS_REPLACEMENT_\d+_%%/, `${quotes}${renamed}${quotes}`)
  }

  const stdlib = getStdlib(this.file, src, this.config)
  const source = stdlib || getSource(src, this.config)
  if (stdlib) {
    if (!namedSeg) {
      namedSeg = defSeg.replace(/(\S+)/, '{ $1 }')
      defSeg = undefined
      defName = undefined
    } else if (defSeg) {
      namedSeg = namedSeg.replace(/{/, `{ ${defName},`)
      namedSeg = defSeg.replace(/\S/g, ' ') + namedSeg
      defSeg = undefined
      defName = undefined
    } // if just named, leave as
  }
  if (!this.isLocalCache) this.isLocalCache = {}
  if (this.async) {
    return getIsLocal(source, this.config, this.file, this.isLocalCache)
      .then((isLocal) => {
        return finish(namedSeg, fromSeg, defSeg, defName, quotes, source, isLocal)
      })
  }
  const isLocal = syncGetIsLocal(source, this.config)
  return finish(namedSeg, fromSeg, defSeg, defName, quotes, source, isLocal)
}

/**
 * Returns path to stdlib, if it was configured.
 * @param {string} file Relative path to the current file
 * @param {string} src Path to import.
 * @param {Object} [config] ÀLaMode configuration.
 */
const getStdlib = (file, src, config = {}) => {
  if (!config.import) return null
  const { import: { stdlib } } = config
  if (stdlib) {
    const { packages, path } = stdlib
    if (!packages.includes(src)) return null
    const rel = relative(dirname(file), path)
      .replace(/\\/g, '/')
      .replace(/.js$/, '')
    return rel
  }
  return null
}

/**
 * The rules can be async (for building), or sync (for require hook).
 * This is the common method that returns actual replacement.
 */
const finish = (namedSeg, fromSeg, defSeg, defName, quotes, source, isLocal) => {
  const { t, ifES } = getDef(defSeg, defName, quotes, source, isLocal)
  const replacedNamed = getNamed(namedSeg, fromSeg, quotes, source, defName)
  const res = [
    t, replacedNamed, ...(isLocal ? [] : [ifES]),
  ]
    .filter(a => a)
    .join('; ')
  return `${res};`
}

const syncGetIsLocal = (source, config) => {
  if (alwaysCheckES(config)) return false
  if (isLib(source)) return true
  if (builtinModules.includes(source)) return true
  if (isAlamodeModule(source, config)) return true
}

const getIsLocal = async (source, config, file, cache) => {
  const sync = syncGetIsLocal(source, config)
  if (sync) return true
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

export default rule
export { re }

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