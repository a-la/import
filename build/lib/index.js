const getRequire = (quotes, src) => {
  return `require(${quotes}${src}${quotes})`
}

module.exports.getRequire = getRequire