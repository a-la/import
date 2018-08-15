import { resolve } from 'path'
import { getTests } from 'zoroaster'
import makeTestSuite from '../make-test-suite'
import importsSeq from '../../src'

const path = resolve(__dirname, '../mask/integration.js')
const tests = getTests(path)

const t = makeTestSuite(tests, importsSeq)

export default t