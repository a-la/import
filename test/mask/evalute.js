import makeTestSuite from '@zoroaster/mask'
import { runInNewContext } from 'vm'
import ALaContext from '@a-la/context'
import ÀLaImport from '../../src'

export default makeTestSuite('test/result/evaluate', {
  /**
   * @param {string} input
   * @param {ALaContext}
   */
  async getResults(input, { stream }) {
    const { result } = await stream(ÀLaImport, input)
    const sandbox = { require, test: {} }
    runInNewContext(result, sandbox)
    const { test } = sandbox
    return test
  },
  context: ALaContext,
  jsonProps: ['expected'],
})