import { resolve } from 'path'
import { makeTestSuite } from 'zoroaster'
import makeConfig from '../make-test-suite-conf'
import rule, { advancedRule } from '../../src/lib/rule'
import asRule, { advancedImportAs } from '../../src/lib/import-as'
import importsSeq, { advancedSeq } from '../../src'


const config = {
  import: {
    replacement: {
      from: '^((../)+)src',
      to: '$1build',
    },
  },
}

const tests = {
  'import default': {
    rule,
    mask: 'default.js',
  },
  'import default (advanced)': {
    rule: advancedRule,
    advanced: true,
    mask: 'default.js',
  },
  'import named': {
    rule,
    mask: 'named.js',
  },
  'import named (advanced)': {
    rule: advancedRule,
    advanced: true,
    mask: 'named.js',
  },
  integration: {
    rule: importsSeq,
    mask: 'integration.js',
  },
  'integration (advanced)': {
    rule: advancedSeq,
    advanced: true,
    mask: 'integration.js',
  },
  'line numbers': {
    rule: importsSeq,
    mask: 'line-numbers.js',
  },
  'line numbers (advanced)': {
    rule: advancedSeq,
    advanced: true,
    mask: 'line-numbers.js',
  },
  as: {
    rule: asRule,
    mask: 'as.js',
  },
  'as (advanced)': {
    rule: advancedImportAs,
    advanced: true,
    mask: 'advanced-as.js',
  },
  advanced: { // check that strings are ignored
    rule: advancedRule,
    advanced: true,
    mask: 'advanced.js',
  },
  replacements: {
    config,
    rule: importsSeq,
    mask: 'replacements.js',
  },
  'advanced replacements': {
    config,
    rule: advancedSeq,
    advanced: true,
    mask: 'advanced-replacements.js',
  },
}

const hasFocused = Object.keys(tests).some(k => k.startsWith('!'))

const t = Object.keys(tests).reduce((acc, k) => {
  if (hasFocused && !k.startsWith('!')) return acc

  const { mask, rule: r, advanced } = tests[k]
  const path = resolve(__dirname, '../mask', mask)
  const conf = makeConfig(r, advanced, config)
  const ts = makeTestSuite(path, conf)
  acc[k] = ts
  return acc
}, {})

export default t