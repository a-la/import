import { equal } from 'zoroaster/assert'
import Context from '../../context'
import namedRule from '../../../src/lib/named'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'transforms an import'({ stream }) {
    const what = 'test'
    const from = '@a-la/test'
    const s = `import { ${what} } from '${from}'`
    const r = await stream(namedRule, s)
    equal(r, `const { ${what} } = require('${from}')`)
  },
  async 'transforms an import w/ default'({ stream }) {
    const def = 'def'
    const what = 'test'
    const from = '@a-la/test'
    const s = `import ${def}, { ${what} } from '${from}'`
    const r = await stream(namedRule, s)
    equal(r, `const ${def} = require('${from}')
const { ${what} } = ${def}
`)
  },
  async 'transforms an import w/ alias'({ stream }) {
    const what = 'test'
    const alias = 'alias'
    const from = '@a-la/test'
    const s = `import { ${what} as ${alias} } from '${from}'`
    const r = await stream(namedRule, s)
    equal(r, `const { ${what}: ${alias} } = require('${from}')`)
  },
  async 'transforms imports'({ stream }) {
    const what = 'test, test2'
    const from = '@a-la/test'
    const s = `import { ${what} } from '${from}'`
    const r = await stream(namedRule, s)
    equal(r, `const { ${what} } = require('${from}')`)
  },
  async 'transforms imports w/ aliases'({ stream }) {
    const what = 'test as alias, test2 as alias2'
    const e = 'test: alias, test2: alias2'
    const from = '@a-la/test'
    const s = `import { ${what} } from '${from}'`
    const r = await stream(namedRule, s)
    equal(r, `const { ${e} } = require('${from}')`)
  },
  async 'transforms imports w/ some aliases'({ stream }) {
    const what = 'test as alias, test2'
    const e = 'test: alias, test2'
    const from = '@a-la/test'
    const s = `import { ${what} } from '${from}'`
    const r = await stream(namedRule, s)
    equal(r, `const { ${e} } = require('${from}')`)
  },
  async 'transforms imports w/ some aliases & default'({ stream }) {
    const def = 'def'
    const what = 'test as alias, test2'
    const e = 'test: alias, test2'
    const from = '@a-la/test'
    const s = `import ${def}, { ${what} } from '${from}'`
    const r = await stream(namedRule, s)
    equal(r, `const ${def} = require('${from}')
const { ${e} } = ${def}
`)
  },
}

export default T
