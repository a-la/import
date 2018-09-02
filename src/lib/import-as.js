import { replaceRequire, advancedFromRe, getSrcFromMarkers, simpleFromRe } from '.'

const makeDefaultIf = (name) => {
  const i = `if (${name} && ${name}.__esModule) ${name} = ${name}.default;`
  return i
}

const importRe = /^( *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+(.+?))/
const advancedRe = new RegExp(`${importRe.source}${advancedFromRe.source}`, 'gm')
const re = new RegExp(`${importRe.source}${simpleFromRe.source}`, 'gm')

const getRes = (fromSeg, quotes, src, importSeg, defName, varName) => {
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
}

export const advancedImportAs =
{
  re: advancedRe,
  replacement(match, importSeg, defName, varName, fromSeg, sd, ld) {
    const { src, quotes } = getSrcFromMarkers(sd, ld, this)
    const res = getRes(fromSeg, quotes, src, importSeg, defName, varName)
    return res
  },
}

const importAs =
{
  re,
  replacement(match, importSeg, defName, varName, fromSeg, quotes, src) {
    const res = getRes(fromSeg, quotes, src, importSeg, defName, varName)
    return res
  },
}

export default importAs
