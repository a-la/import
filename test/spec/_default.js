import { resolve } from 'path'
import { makeTestSuite } from 'zoroaster'
import makeConfig from '../make-test-suite-conf'
import rule from '../../src/lib/rule'

const path = resolve(__dirname, '../mask/default.js')

const conf = makeConfig(rule)
const t = makeTestSuite(path, conf)

export default t