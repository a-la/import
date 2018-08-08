import SnapshotContext from 'snapshot-context'
import ALaContext from '../context'
import ALaImport from '../../src'

/** @type {Object.<string, (c: ALaContext, s: SnapshotContext)>} */
const T = {
  context: [ALaContext, SnapshotContext],
  async 'transforms using sequence API'({ stream, SNAPSHOT_DIR }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const STRING = `import aLaMode from 'alamode'
import ALaImport from '@a-la/import'
import App from 'koa'

import { methodA, methodB } from '@a-la/named-import'
`
    const s = await stream([
      ...ALaImport,
    ], STRING)
    await test('sequence.js', s.trim())
  },
}

export default T
