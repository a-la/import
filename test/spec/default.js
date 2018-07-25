import { ok, deepEqual } from 'zoroaster/assert'
import mismatch from 'mismatch'
import Context from '../context'
import { ALaImportRe } from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    ok(ALaImportRe instanceof RegExp)
  },
  'returns a correct import'() {
    const p = 'ALaImport'
    const src = '../src'
    const s = `import ${p} from '${src}'`
    const res = mismatch(ALaImportRe, s, ['p', 'src'])
    deepEqual(res, [
      {
        p,
        src,
      },
    ])
  },
  'returns 2 correct imports'() {
    const p = 'ALaImport'
    const src = '../src'
    const p2 = `${p}2`
    const src2 = `${src}2`
    const s = `
import ${p} from '${src}'
import ${p2} from '${src2}'
`
    const res = mismatch(ALaImportRe, s, ['p', 'src'])
    deepEqual(res, [
      {
        p,
        src,
      },
      {
        p: p2,
        src: src2,
      },
    ])
  },
}

export default T
