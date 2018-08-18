import { resolve } from 'path'
import { makeTestSuite } from 'zoroaster'
import makeConfig from '../make-test-suite-conf'
import rule from '../../src/lib/rule'
import importsSeq from '../../src'

const tests = {
  'import default': {
    rule,
    mask: 'default.js',
  },
  'import named': {
    rule,
    mask: 'named.js',
  },
  integration: {
    rule: importsSeq,
    mask: 'integration.js',
  },
  'line numbers': {
    rule: importsSeq,
    mask: 'line-numbers.js',
  },
}

const t = Object.keys(tests).reduce((acc, k) => {
  const { mask, rule: r } = tests[k]
  const path = resolve(__dirname, '../mask', mask)
  const conf = makeConfig(r)
  const ts = makeTestSuite(path, conf)
  acc[k] = ts
  return acc
}, {})

export default t