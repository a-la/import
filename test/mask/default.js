import ÀLaContext from '@a-la/context'
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
  ['no-name', importsSeq, 'no-name.js'],
]

export default tests.reduce((acc, [name, rule, file]) => {
  const path = join('test/result', file)
  const t = makeTestSuite(path, {
    context: ÀLaContext,
    /**
     * @param {ÀLaContext} param1
     */
    async getResults({ stream }) {
      const { result } = await stream(rule, this.input)
      return result
    },
    /**
     * @param {ÀLaContext} param1
     */
    getThrowsConfig({ stream }) {
      return {
        fn: stream,
        args: [rule, this.input],
      }
    },
  })
  return {
    ...acc,
    [name]: t,
  }
}, {})