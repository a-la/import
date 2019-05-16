import makeTestSuite from '@zoroaster/mask'
import { runInNewContext } from 'vm'
import ÀLaContext from '@a-la/context'
import ÀLaImport from '../../src'

export default makeTestSuite('test/result/evaluate', {
  /**
   * @param {ÀLaContext}
   */
  async getResults({ stream }) {
    const { result } = await stream(ÀLaImport, this.input)
    const sandbox = { require, test: {} }
    runInNewContext(result, sandbox)
    const { test } = sandbox
    return test
  },
  context: ÀLaContext,
  jsonProps: ['expected'],
})