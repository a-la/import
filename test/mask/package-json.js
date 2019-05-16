import makeTestSuite from '@zoroaster/mask'
import { Replaceable } from 'restream'
import rules from '../../src'
import makeRules from '@a-la/markers'

export default makeTestSuite('test/result/package-json.md', {
  async getTransform() {
    const { rules: allRules, markers } = makeRules(
      Array.isArray(rules) ? rules : [rules],
    )
    const replaceable = new Replaceable(allRules)
    replaceable.markers = markers
    replaceable.file = 'test/fixture/index.js'
    replaceable.async = true
    return replaceable
  },
})