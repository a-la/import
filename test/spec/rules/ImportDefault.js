import { equal } from 'zoroaster/assert'
import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'transforms default w/ single quotes'({ ImportDefaultRule, stream }) {
    const what = 'ALaImport'
    const from = '@a-la/import'
    const s = await stream(ImportDefaultRule, `import ${what} from '${from}'`)
    equal(s, `const ${what} = require('${from}')`)
  },
  async 'transforms default w/ double quotes'({ ImportDefaultRule, stream }) {
    const what = 'ALaImport'
    const from = '@a-la/import'
    const i = `import ${what} from "${from}"`
    const s = await stream(ImportDefaultRule, i)
    equal(s, `const ${what} = require("${from}")`)
  },
}

export default T
