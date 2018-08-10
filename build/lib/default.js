const re = /^\s*import ([\w\d]+) from (["'])(.+?)\2/gm

/**
 * A rule to replace `import method from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, name, quotes, src) {
    const s = `const ${name} = require(${quotes}${src}${quotes})`
    return s
  },
}

module.exports = rule

module.exports.re = re