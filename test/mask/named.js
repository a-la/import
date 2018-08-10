// standard
import { test } from 'test'

/*expected*/
const { test } = require('test')
/**/

// standard with alias
import {test as alias} from 'test'

/*expected*/
const {test: alias} = require('test')
/**/

// standard with double quotes
import { test } from "test"

/*expected*/
const { test } = require("test")
/**/

// standard with scope
import { test } from '@scope/test'

/*expected*/
const { test } = require('@scope/test')
/**/

// standard wit default
import def, { test } from 'test'

/*expected*/
const def = require('test')
const { test } = def
/**/

// multiple
import { test, test2 } from 'test'

/*expected*/
const { test, test2 } = require('test')
/**/

// multiple with default
import def, { test, test2 } from 'test'

/*expected*/
const def = require('test')
const { test, test2 } = def
/**/

// multiple with aliases
import { test as alias, test2 as alias2 } from 'test'

/*expected*/
const { test: alias, test2: alias2 } = require('test')
/**/

// multiple with optional aliases
import { test,  test2 as alias2 } from 'test'

/*expected*/
const { test,  test2: alias2 } = require('test')
/**/

// new lines
import {
  test
} from 'test'

/*expected*/
const {
  test
} = require('test')
/**/

// new lines with default
import def, {
  test
} from 'test'

/*expected*/
const def = require('test')
const {
  test
} = def
/**/

// new lines with default and new line
import def,
  { test } from 'test'

/*expected*/
const def = require('test')
const { test } = def
/**/

// new line with commas
import {
  test,
} from 'test'

/*expected*/
const {
  test,
} = require('test')
/**/

// new lines with commas
import {
  test,
  test2,
} from 'test'

/*expected*/
const {
  test,
  test2,
} = require('test')
/**/

// new lines with optional commas
import {
  test,
    test2
} from 'test'

/*expected*/
const {
  test,
    test2
} = require('test')
/**/

// new lines with multiple
import {
  test, test2
} from 'test'

/*expected*/
const {
  test, test2
} = require('test')
/**/

// new lines with multiple and optional commas
import {
  test, test2,
  test3
} from 'test'

/*expected*/
const {
  test, test2,
  test3
} = require('test')
/**/

// new lines with default, multiple and optional commas
import def, {
  test, test2,
  test3
} from 'test'

/*expected*/
const def = require('test')
const {
  test, test2,
  test3
} = def
/**/