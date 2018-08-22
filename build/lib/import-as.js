const { replaceRequire } = require('.')

const importAs =
{
  re: / *import\s+\*\s+as\s+(.+?)(\s+from\s+(["'])(.+?)\3)/gm,
  replacement(match, varName, fromSeg, quotes, src) {
    const r = replaceRequire(fromSeg, quotes, src)
    const s = `const ${varName}${r}`
    return s
  },
}

module.exports=importAs

//# sourceMappingURL=import-as.js.map