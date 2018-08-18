import { resolve } from 'path'
import { makeTestSuite } from 'zoroaster'
import makeConfig from '../make-test-suite-conf'
import importsSeq from '../../src'

const path = resolve(__dirname, '../mask/integration.js')

const conf = makeConfig(importsSeq)
const t = makeTestSuite(path, conf)

export default t