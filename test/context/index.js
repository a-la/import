import { resolve } from 'path'
import { debuglog } from 'util'
import { Replaceable } from 'restream'
import Catchment from 'catchment'

const LOG = debuglog('@a-la/import')

const FIXTURE = resolve(__dirname, '../fixture')

/**
 * A testing context for the package.
 */
export default class ALaContext {
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  /**
   * Create a Replaceable stream with given rules.
   * @param {Rule|Rule[]} rules
   */
  async stream(rules, text) {
    if (!text) throw new Error('Input text is required.')
    const rs = new Replaceable(rules)
    const events = []
    rs.on('export', (name) => {
      events.push(name)
    })
    const { promise } = new Catchment({
      rs,
    })
    rs.end(text)
    const res = await promise
    return { events, res }
  }
}

/** @typedef {import('restream').Rule} Rule */
