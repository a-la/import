import { resolve } from 'path'
import makeTestSuite from '../make-test-suite'
import getTests from '../mask-lib'
import seq from '../../src'

const path = resolve(__dirname, '../mask/sequence.js')
const tests = getTests(path)

const t = makeTestSuite(tests, seq)

export default t