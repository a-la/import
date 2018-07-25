import { resolve } from 'path'
import { debuglog } from 'util'
import { Replaceable } from 'restream'
import Catchment from 'catchment'

const LOG = debuglog('@a-la/import')

const FIXTURE = resolve(__dirname, '../fixture')

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    LOG('init context')
  }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  async _destroy() {
    LOG('destroy context')
  }
  /**
   * Create a Replaceable stream with given rules.
   * @param {Rule[]} rules
   * @param {string} text="test"
   */
  async stream(rules, text = 'test') {
    const rs = new Replaceable(rules)
    const c = new Catchment({
      rs,
    })
    await new Promise((r, j) => {
      rs.end(text, r)
      rs.once('error', j)
    })
    const res = await c.promise
    return res
  }
}

/** @typedef {import('restream').Rule} Rule */
