const { replaceRequire, fromRe, getIfEsModule, alwaysCheckES, getSource } = require('./');

const importRe = /( *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+(.+?))/
const re = new RegExp(`${importRe.source}${fromRe.source}`, 'gm')

/** @type {_restream.Rule} */
const importAs = {
  re,
  replacement,
}

/**
 * @suppress {globalThis}
 * @type {_alamode.ÀLaModeReplacer}
 */
function replacement(match, importSeg, defName, varName, fromSeg, sd) {
  const realSrc = this.markers.strings.map[sd]
  const [, quotes, src] = /** @type {!RegExpResult} */ (
    /(["'`])(.+?)\1/.exec(realSrc)
  )
  const source = getSource(src, this.config)
  if (this.renameOnly) {
    return match.replace(/%%_RESTREAM_STRINGS_REPLACEMENT_\d+_%%/, `${quotes}${source}${quotes}`)
  }
  const r = replaceRequire(fromSeg, quotes, source)
  const { length } = importSeg.split('\n')
  const ws = '\n'.repeat(length - 1)
  let c
  const isLocal = /^[./]/.test(source) && !alwaysCheckES(this.config)
  const o = isLocal ? 'const' : 'let'
  if (defName) {
    c = [
      `${ws}${o} ${varName} = ${defName}${r}`,
      ...(isLocal ? [] : [getIfEsModule(defName)]),
    ].join('; ')
  } else {
    c = `${ws}const ${varName}${r}`
  }
  return `${c};`
}

module.exports=importAs

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('alamode/types').ÀLaModeReplacer} _alamode.ÀLaModeReplacer
 */