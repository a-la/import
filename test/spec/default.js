import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import import from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof import, 'function')
  },
  async 'calls package without error'() {
    await import()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await import({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T
