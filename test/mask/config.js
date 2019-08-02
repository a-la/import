import ÀLaContext from '@a-la/context'
import makeTestSuite from '@zoroaster/mask'
import rule from '../../src'

export default makeTestSuite('test/result/config/replacement.md', {
  context: [ÀLaContext, {
    import: {
      replacement: {
        from: '^((../)+)src',
        to: '$1build',
      },
    },
  }],
  /**
   * @param {ÀLaContext} param1
   */
  async getResults({ stream, setConfig }, config) {
    setConfig(config)
    const { result } = await stream(rule, this.input)
    return result
  },
})

export const esCheck = makeTestSuite('test/result/config/es.md', {
  context: [ÀLaContext, {
    import: {
      esCheck: 'always',
    },
  }],
  /**
   * @param {ÀLaContext} param1
   */
  async getResults({ stream, setConfig }, config) {
    setConfig(config)
    const { result } = await stream(rule, this.input)
    return result
  },
})

export const alamodeModules = makeTestSuite('test/result/config/alamode-modules.md', {
  context: [ÀLaContext, {
    import: {
      alamodeModules: ['test'],
    },
  }],
  /**
   * @param {ÀLaContext} param1
   */
  async getResults({ stream, setConfig }, config) {
    setConfig(config)
    const { result } = await stream(rule, this.input)
    return result
  },
})

export const stdlib = makeTestSuite('test/result/config/stdlib', {
  context: [ÀLaContext, {
    import: {
      stdlib: {
        path: 'stdlib.js',
        packages: ['test'],
      },
    },
  }],
  /**
   * @param {ÀLaContext} param1
   */
  async getResults({ stream, setConfig, setFile }, config) {
    setFile('src/test.js')
    setConfig(config)
    const { result } = await stream(rule, this.input)
    return result
  },
})