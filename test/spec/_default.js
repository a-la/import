import { resolve } from 'path'
import makeTestSuite from '../make-test-suite'
import getTests from '../mask-lib'
import defaultRule from '../../src/lib/default'

const path = resolve(__dirname, '../mask/default.js')
const tests = getTests(path)

const t = makeTestSuite(tests, defaultRule)

export default t