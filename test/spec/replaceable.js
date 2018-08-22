import ALaContext from '@a-la/context'
import { equal } from 'zoroaster/assert'
import seq from '../../src'

/** @type {Object.<string, (c: ALaContext)} */
const T = {
  context: ALaContext,
  async 'allows to replace paths'({ stream, setConfig }) {
    const t = 'import test from "../../src/lib"'
    setConfig({
      import: {
        replacement: {
          from: '^((../)+)src',
          to: '$1build',
        },
      },
    })
    const { result } = await stream(seq, t)
    equal(result, 'let test = require("../../build/lib"); if (test && test.__esModule) test = test.default;')
  },
}

export default T