import { getDefault } from '.'

const re = /^\s*import ([\w\d]+) from (["'])(.+?)\2/gm

/**
 * A rule to replace `import method from 'package'` statement.
 * @type {import('restream').Rule}
 */
const rule = {
  re,
  replacement(match, name, quotes, src) {
    const s = getDefault(name, quotes, src)
    return s
  },
}

export default rule
export { re }