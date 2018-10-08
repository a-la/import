import ÀLaContext from '@a-la/context'
import { makeTestSuite } from 'zoroaster'
import rule from '../../src'

const ts = makeTestSuite('test/result/config/replacement.md', {
  context: [ÀLaContext, {
    import: {
      replacement: {
        from: '^((../)+)src',
        to: '$1build',
      },
    },
  }],
  /**
   * @param {string} input
   * @param {ÀLaContext} param1
   */
  async getResults(input, { stream, setConfig }, config) {
    setConfig(config)
    const { result } = await stream(rule, input)
    return result
  },
})

const esCheck = makeTestSuite('test/result/config/es.md', {
  context: [ÀLaContext, {
    import: {
      esCheck: 'always',
    },
  }],
  /**
   * @param {string} input
   * @param {ÀLaContext} param1
   */
  async getResults(input, { stream, setConfig }, config) {
    setConfig(config)
    const { result } = await stream(rule, input)
    return result
  },
})

export { esCheck }

export default ts