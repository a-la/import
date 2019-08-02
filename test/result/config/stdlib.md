<!-- assuming ./src/test.js location, with ./stdlib.js -->

## named exports
import { test } from 'test'

/* expected */
const { test } = require('../stdlib');
/**/

## default exports
import test from 'test'

/* expected */
const { test } = require('../stdlib');
/**/

## default and named
import test, { test1 } from 'test'

/* expected */
const       { test, test1 } = require('../stdlib');
/**/

## default and named preserves lines
import test,
  { test1 } from 'test'

/* expected */
const      
  { test, test1 } = require('../stdlib');
/**/

## keeps unaffected imports
import rexml from 'rexml'

/* expected */
let rexml = require('rexml'); if (rexml && rexml.__esModule) rexml = rexml.default;
/**/