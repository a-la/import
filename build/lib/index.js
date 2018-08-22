       const getRequire = (quotes, src) => {
  return `require(${quotes}${src}${quotes})`
}

       const getIfEsModule = (name) => {
  const s = `if (${name} && ${name}.__esModule) ${name} = ${name}.default;`
  return s
}

       const getDefault = (name, req) => {
  if (!name) return
  const i = getIfEsModule(name)
  const s = `${name} = ${req}; ${i}`
  return s
}

       const getSource = (src, config = {}) => {
  const { import: { replacement } = {} } = config
  if (!replacement) return src
  const { from, to } = replacement
  if (from === undefined) throw new Error('No "from" is given option is given for the replacement.')
  if (to === undefined ) throw new Error('No "to" is given option is given for the replacement.')
  const fromRe = new RegExp(replacement.from)
  const res = src.replace(fromRe, replacement.to)
  return res
}

module.exports.getRequire = getRequire
module.exports.getIfEsModule = getIfEsModule
module.exports.getDefault = getDefault
module.exports.getSource = getSource
//# sourceMappingURL=index.js.map