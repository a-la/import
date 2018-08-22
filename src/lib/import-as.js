import { replaceRequire } from '.'

const importAs =
{
  re: / *import\s+\*\s+as\s+(.+?)(\s+from\s+(["'])(.+?)\3)/gm,
  replacement(match, varName, fromSeg, quotes, src) {
    const r = replaceRequire(fromSeg, quotes, src)
    const s = `const ${varName}${r}`
    return s
  },
}

export default importAs
