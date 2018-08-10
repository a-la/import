const getRequire = (quotes, src) => {
  return `require(${quotes}${src}${quotes})`
}

const getIfEsModule = (name) => {
  const s = `if (${name} && ${name}.__esModule) ${name} = ${name}.default;`
  return s
}

const getDefault = (name, quotes, src) => {
  const r = getRequire(quotes, src)
  const i = getIfEsModule(name)
  const s = `let ${name} = ${r}; ${i}`
  return s
}

module.exports.getRequire = getRequire
module.exports.getIfEsModule = getIfEsModule
module.exports.getDefault = getDefault