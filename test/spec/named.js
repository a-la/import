import { resolve } from 'path'
import makeTestSuite from '../make-test-suite'
import getTests from '../mask-lib'
import namedRule from '../../src/lib/named'

const path = resolve(__dirname, '../mask/named.js')
const tests = getTests(path)

const t = makeTestSuite(tests, namedRule)

export default t