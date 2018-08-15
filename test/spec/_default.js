import { resolve } from 'path'
import { getTests } from 'zoroaster'
import makeTestSuite from '../make-test-suite'
import namedRule from '../../src/lib/named'

const path = resolve(__dirname, '../mask/default.js')
const tests = getTests(path)

const t = makeTestSuite(tests, namedRule)

export default t