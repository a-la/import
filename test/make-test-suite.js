import { equal, deepEqual } from 'zoroaster/assert'
import erte from 'erte'
import Context from './context'

const makeTestSuite = (tests, rule) => {
  const hasFocused = tests.some(({ name }) => name.startsWith('!'))

  const t = tests.reduce((acc, { name, input, expected, expectedEvents }) => {
    if (hasFocused && !name.startsWith('!')) return acc
    let ne
    if (name in acc) ne = new Error(`repeated use of test name ${name}`)
    const ee = expectedEvents ? JSON.parse(expectedEvents) : null

    /** @param {Context} */
    const fn = async ({ stream }) => {
      if (ne) throw ne

      const { res, events } = await stream(rule, input)
      if (expected) {
        try {
          equal(res, expected)
        } catch (err) {
          const e = erte(res, expected)
          console.log(e)
          throw err
        }
      }
      if (ee) deepEqual(events, ee)
    }
    acc[name] = fn
    return acc
  }, { context: Context })
  return t
}

export default makeTestSuite