import { replaceRequire } from '.'

const importAs =
{
  re: /( *import\s+\*\s+as\s+(.+?))(\s+from\s+(["'])(.+?)\4)/gm,
  replacement(match, importSeg, varName, fromSeg, quotes, src) {
    const r = replaceRequire(fromSeg, quotes, src)
    const { length } = importSeg.split('\n')
    const ws = '\n'.repeat(length - 1)
    const c = `${ws}const ${varName}`
    const s = `${c}${r}`
    return s
  },
}

export default importAs
