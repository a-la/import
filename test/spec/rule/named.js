import { equal } from 'zoroaster/assert'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import mismatch from 'mismatch'
import erte from 'erte'
import Context from '../../context'
import namedRule from '../../../src/lib/named'

const m = readFileSync(resolve(__dirname, 'named.mask'))
const tests = mismatch(
  /^\/\/ (.+?)\n([\s\S]+?)\n\n([\s\S]+?)\n\n/gm,
  `${m}`,
  ['name', 'input', 'expected'],
)

const t = tests.reduce((acc, { name, input, expected }) => {
  /** @param {Context} */
  let ne
  if (name in acc) ne = new Error(`repeated use of test name ${name}`)
  const fn = async ({ stream }) => {
    if (ne) throw ne
    const r = await stream(namedRule, input)
    try {
      equal(r, expected)
    } catch (err) {
      const e = erte(r, expected)
      console.log(e)
      throw err
    }
  }
  acc[name] = fn
  return acc
}, { context: Context })

export default t
