import { resolve } from 'path'
import { getTests } from 'zoroaster'
import makeTestSuite from '../make-test-suite'
import rule from '../../src/lib/rule'

const path = resolve(__dirname, '../mask/default.js')
const tests = getTests(path)

const t = makeTestSuite(tests, rule)

export default t