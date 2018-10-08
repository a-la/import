import ÀLaContext from '@a-la/context'
import { makeTestSuite } from 'zoroaster'
import rule from '../../src'

const Config = {
  import: {
    replacement: {
      from: '^((../)+)src',
      to: '$1build',
    },
  },
}

const ts = makeTestSuite('test/result/config.md', {
  context: [ÀLaContext, Config],
  /**
   * @param {string} input
   * @param {ÀLaContext} param1
   * @param {Config} config
   */
  async getResults(input, { stream, setConfig }, config) {
    setConfig(config)
    const { result } = await stream(rule, input)
    return result
  },
})

export default ts