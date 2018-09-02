       const getRequire = (quotes, src) => {
  return `require(${quotes}${src}${quotes});`
}

       const getIfEsModule = (name) => {
  const s = `if (${name} && ${name}.__esModule) ${name} = ${name}.default;`
  return s
}

       const getDefault = (name, req) => {
  if (!name) return
  const i = getIfEsModule(name)
  const s = `${name} = ${req} ${i}`
  return s
}

       const replaceRequire = (seg, quotes, src, defName) => {
  const eq = seg.replace(/(\s+)from(\s+)([\s\S])*/, (m, b, a) => {
    return `${b}=${a}`
  })
  const req = defName ? defName : getRequire(quotes, src)
  const res = `${eq}${req}`
  return res
}

       const getSource = (src, config = {}) => {
  const { import: { replacement } = {} } = config
  if (!replacement) return src
  const { from, to } = replacement
  if (from === undefined) throw new Error('No "from" is given option is given for the replacement.')
  if (to === undefined) throw new Error('No "to" is given option is given for the replacement.')
  const fromRe = new RegExp(replacement.from)
  const res = src.replace(fromRe, replacement.to)
  return res
}

// temp solution, until restream markers can store only part of regex, e.g. '%RESTREAM_MARKER%' instead of %RESTREAM_MARKER% for a string.
       const advancedFromRe = /(\s+from\s+)(?:%%_RESTREAM_STRINGS_REPLACEMENT_(\d+)_%%|%%_RESTREAM_LITERALS_REPLACEMENT_(\d+)_%%)/

       const simpleFromRe = /(\s+from\s+(["'`])(.+?)\5)/

       const getSrcFromMarkers = (sd, ld, replaceable) => {
  const realSrc = ld
    ? replaceable.markers.literals.map[ld]
    : replaceable.markers.strings.map[sd]
  const [, quotes, src] = /(["'`])(.+?)\1/.exec(realSrc)
  return { quotes, src }
}

module.exports.getRequire = getRequire
module.exports.getIfEsModule = getIfEsModule
module.exports.getDefault = getDefault
module.exports.replaceRequire = replaceRequire
module.exports.getSource = getSource
module.exports.advancedFromRe = advancedFromRe
module.exports.simpleFromRe = simpleFromRe
module.exports.getSrcFromMarkers = getSrcFromMarkers
//# sourceMappingURL=index.js.map