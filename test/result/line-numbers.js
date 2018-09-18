// named
import {
  test,
  test2,
} from 'test'

/* expected */
const {
  test,
  test2,
} = require('test');
/**/

// default
import test from 'test'

/* expected */
let test = require('test'); if (test && test.__esModule) test = test.default;
/**/

// default and named
import test, {
  test2,
  test3,
} from 'test'

/* expected */
let test = require('test'); const {
  test2,
  test3,
} = test; if (test && test.__esModule) test = test.default;
/**/

// default & named with new line
import def,
  { test } from 'test'

/* expected */
let def = require('test'); const
  { test } = def; if (def && def.__esModule) def = def.default;
/**/

// default, named & alias with new lines
import
  def,
  {
    test,
    test2 as alias2,
  }
from 'test'

/* expected */
let
  def = require('test'); const
  {
    test,
    test2: alias2,
  }
= def; if (def && def.__esModule) def = def.default;
/**/

// aliases with new lines
import
  {
    test
      as
    alias,
  }
from 'test'

/* expected */
const
  {
    test
      :
    alias,
  }
= require('test');
/**/

// all new lines
import
    def,
  {
    test,
    test2 as alias2,
    test3
      as
alias3,
  }
from
  'test'

/* expected */
let
    def = require('test'); const
  {
    test,
    test2: alias2,
    test3
      :
alias3,
  }
=
  def; if (def && def.__esModule) def = def.default;
/**/

// import as
import * as tests from './tests'

/* expected */
const tests = require('./tests');
/**/

// import as with new lines
import * as tests
from './tests'

/* expected */
const tests
= require('./tests');
/**/

// import as with multiple new lines
import
* as tests
from './tests'

/* expected */

const tests
= require('./tests');
/**/