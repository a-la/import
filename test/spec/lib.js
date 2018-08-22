import { equal, throws } from 'zoroaster/assert'
import { getSource } from '../../src/lib'

const T = {
  context: { src: '../../src', from: '^((../)+)src', to: '$1build' },
  getSource: {
    'returns src when no config is given'({ src }) {
      const res = getSource(src)
      equal(res, src)
    },
    'returns src when no import config is given'({ src }) {
      const res = getSource(src, { export: {} })
      equal(res, src)
    },
    'returns src when no import replacement config is given'({ src }) {
      const res = getSource(src, { import: {} })
      equal(res, src)
    },
    async 'throws when from is not given'({ src }) {
      await throws({
        fn: getSource,
        args: [src, { import: { replacement: {} } }],
        message: 'No "from" is given option is given for the replacement.',
      })
    },
    async 'throws when to is not given'({ src, from }) {
      await throws({
        fn: getSource,
        args: [src, { import: { replacement: { from } } }],
        message: 'No "to" is given option is given for the replacement.',
      })
    },
    'returns the replaced version of src with RegExp'({ src, from, to }) {
      const res = getSource(src, { import: { replacement: { from, to } } })
      equal(res, '../../build')
    },
    'returns the replaced version of src with string'() {
      const src = './lib/test'
      const res = getSource(src, { import: { replacement: {
        from: 'lib/',
        to: '',
      } } })
      equal(res, './test')
    },
  },
}

export default T