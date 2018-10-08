const { replaceRequire, fromRe, getIfEsModule, alwaysCheckES } = require('.');

const importRe = /( *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+(.+?))/
const re = new RegExp(`${importRe.source}${fromRe.source}`, 'gm')

const importAs = {
  re,
  replacement(match, importSeg, defName, varName, fromSeg, sd, ld) {
    const realSrc = ld
      ? this.markers.literals.map[ld]
      : this.markers.strings.map[sd]
    const [, quotes, src] = /(["'`])(.+?)\1/.exec(realSrc)
    const r = replaceRequire(fromSeg, quotes, src)
    const { length } = importSeg.split('\n')
    const ws = '\n'.repeat(length - 1)
    let c
    const isLocal = /^[./]/.test(src) && !alwaysCheckES(this.config)
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
  },
}

module.exports=importAs
