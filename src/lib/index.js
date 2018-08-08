export const getRequire = (quotes, src) => {
  return `require(${quotes}${src}${quotes})`
}