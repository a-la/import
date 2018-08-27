const { replaceRequire } = require('.')

const makeDefaultIf = (name) => {
  const i = `if (${name} && ${name}.__esModule) ${name} = ${name}.default;`
  return i
}

const importAs =
{
  re: /( *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+(.+?))(\s+from\s+(["'])(.+?)\5)/gm,
  replacement(match, importSeg, defName, varName, fromSeg, quotes, src) {
    const r = replaceRequire(fromSeg, quotes, src)
    const { length } = importSeg.split('\n')
    const ws = '\n'.repeat(length - 1)
    let c
    if (defName) {
      c = `${ws}let ${varName} = ${defName}${r} ${makeDefaultIf(defName)}`
    } else {
      c = `${ws}const ${varName}${r}`
    }
    return c
  },
}

module.exports=importAs

//# sourceMappingURL=import-as.js.map