import ALaContext from '@a-la/context'
import makeTestSuite from '@zoroaster/mask'
import { join } from 'path'
import importRule from '../../src/lib/rule'
import asRule from '../../src/lib/import-as'
import importsSeq from '../../src'

const tests = [
  ['import default', importRule, 'default.js'],
  ['import named', importRule, 'named.js'],
  ['integration', importsSeq, 'integration.js'],
  ['line numbers', importsSeq, 'line-numbers.js'],
  ['as', asRule, 'as.js'],
]

export default tests.reduce((acc, [name, rule, file]) => {
  const path = join('test/result', file)
  const t = makeTestSuite(path, {
    context: ALaContext,
    /**
     * @param {string} input
     * @param {ALaContext} param1
     */
    async getResults(input, { stream }) {
      const { result } = await stream(rule, input)
      return result
    },
    /**
     * @param {string} input
     * @param {ALaContext} param1
     */
    getThrowsConfig(input, { stream }) {
      return {
        fn: stream,
        args: [rule, input],
      }
    },
  })
  return {
    ...acc,
    [name]: t,
  }
}, {})