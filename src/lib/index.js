export const getRequire = (quotes, src) => {
  return `require(${quotes}${src}${quotes})`
}

export const getIfEsModule = (name) => {
  const s = `if (${name} && ${name}.__esModule) ${name} = ${name}.default;`
  return s
}

export const getDefault = (name, req) => {
  if (!name) return
  const i = getIfEsModule(name)
  const s = `${name} = ${req}; ${i}`
  return s
}