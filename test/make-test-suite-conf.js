import ALaContext from '@a-la/context'

/**
 * @param {import('restream').Rule} rule
 * @returns {import('zoroaster').MakeTestSuiteConf}
 */
const makeConfig = (rule) => {
  return {
    context: ALaContext,
    /**
     * @param {string} input
     * @param {ALaContext} param1
     */
    async getResults(input, { stream }) {
      const res = await stream(rule, input)
      return res
    },
    getThrowsConfig(input, { stream }) {
      return {
        fn: stream,
        args: [rule, input],
      }
    },
    mapActual: ({ result }) => result,
  }
}

export default makeConfig