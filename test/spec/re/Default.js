import { ok, deepEqual } from 'zoroaster/assert'
import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a regular expression'({ ImportDefaultRe }) {
    ok(ImportDefaultRe instanceof RegExp)
  },
  'returns a correct import'({ ImportDefaultRe, mismatch }) {
    const p = 'ALaImport'
    const src = '../src'
    const s = `import ${p} from '${src}'`
    const res = mismatch(ImportDefaultRe, s, ['p', 'quotes', 'src'])
    deepEqual(res, [
      {
        p,
        src,
        quotes: '\'',
      },
    ])
  },
  'returns 2 correct imports'({ ImportDefaultRe, mismatch }) {
    const p = 'ALaImport'
    const src = '../src'
    const p2 = `${p}2`
    const src2 = `${src}2`
    const s = `
import ${p} from '${src}'
import ${p2} from "${src2}"
`
    const res = mismatch(ImportDefaultRe, s, ['p', 'quotes', 'src'])
    deepEqual(res, [
      {
        quotes: '\'',
        p,
        src,
      },
      {
        p: p2,
        src: src2,
        quotes: '"',
      },
    ])
  },
}

export default T
