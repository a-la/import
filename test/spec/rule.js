import { equal } from 'zoroaster/assert'
import Context from '../context'
import ALaImport from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'gets a link to the fixture'({ stream }) {
    const what = 'ALaImport'
    const from = '@a-la/import'
    const s = await stream(ALaImport, `import ${what} from '${from}'`)
    equal(s, `const ${what} = require('${from}')`)
  },
}

export default T
