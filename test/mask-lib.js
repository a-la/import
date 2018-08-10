import mismatch from 'mismatch'
import { readFileSync } from 'fs'

const makeRegex = (keys = []) => {
  const m = /[\s\S]+?/
  const ms = m.source
  const n = '\\n'
  const titleAndBody = `^// (.+?)${n}(${ms})${n.repeat(2)}`
  const vals = keys.map(k => {
    const s = `/\\*${k}\\*/${n}(${ms})${n}/\\*\\*/`
    return s
  })
  const allVals = vals.join('\\s+')
  const regex = new RegExp(`${titleAndBody}${allVals}`, 'gm')
  return regex
}

/**
 * A function to construct tests from the mask. It will become part of the `zoroaster`.
 * @param {string} path Path to the mask file.
 * @param {string[]} [keys] Properties of each test to extract.
 */
const getTests = (path, keys = ['expected']) => {
  const m = `${readFileSync(path)}`
  const re = makeRegex(keys)
  const tests = mismatch(
    re,
    m,
    ['name', 'input', ...keys],
  )
  return tests
}

export default getTests