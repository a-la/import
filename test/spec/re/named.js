import { ok, deepEqual } from 'zoroaster/assert'
import Context from '../../context'
import { re } from '../../../src/lib/named'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a regular expression'() {
    ok(re instanceof RegExp)
  },
  'detects an import'({ mismatch }) {
    const method = 'method'
    const src = '../src'
    const s = `import { ${method} } from '${src}'`
    const res = mismatch(re, s, ['def', 'method', 'quotes', 'src'])
    deepEqual(res, [
      {
        method,
        src,
        quotes: '\'',
      },
    ])
  },
  'detects an import w/ default'({ mismatch }) {
    const def = 'default'
    const method = 'method'
    const src = '../src'
    const s = `import ${def}, { ${method} } from '${src}'`
    const res = mismatch(re, s, ['def', 'method', 'quotes', 'src'])
    deepEqual(res, [
      {
        def,
        method,
        src,
        quotes: '\'',
      },
    ])
  },
  'detects an import with alias'({ mismatch }) {
    const method = 'method as alias'
    const src = '../src'
    const s = `import { ${method} } from '${src}'`
    const res = mismatch(re, s, ['def', 'method', 'quotes', 'src'])
    deepEqual(res, [
      {
        method,
        src,
        quotes: '\'',
      },
    ])
  },
  'detects imports'({ mismatch }) {
    const method = 'method, method2'
    const src = '../src'
    const s = `import { ${method} } from '${src}'`
    const res = mismatch(re, s, ['def', 'method', 'quotes', 'src'])
    deepEqual(res, [
      {
        method,
        src,
        quotes: '\'',
      },
    ])
  },
  'detects imports with aliases'({ mismatch }) {
    const method = 'method as alias, method2 as alias2'
    const src = '../src'
    const s = `import { ${method} } from '${src}'`
    const res = mismatch(re, s, ['def', 'method', 'quotes', 'src'])
    deepEqual(res, [
      {
        method,
        src,
        quotes: '\'',
      },
    ])
  },
  'detects imports with optional aliases (1)'({ mismatch }) {
    const method = 'method, method2 as alias2'
    const src = '../src'
    const s = `import { ${method} } from '${src}'`
    const res = mismatch(re, s, ['def', 'method', 'quotes', 'src'])
    deepEqual(res, [
      {
        method,
        src,
        quotes: '\'',
      },
    ])
  },
  'detects imports with optional aliases (2)'({ mismatch }) {
    const method = 'method as alias, method2'
    const src = '../src'
    const s = `import { ${method} } from '${src}'`
    const res = mismatch(re, s, ['def', 'method', 'quotes', 'src'])
    deepEqual(res, [
      {
        method,
        src,
        quotes: '\'',
      },
    ])
  },
}

export default T
