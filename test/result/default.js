// local single quotes
import test from './test'

/* expected */
const test = require('./test');
/**/

// global single quotes
import test from 'test'

/* expected */
let test = require('test'); if (test && test.__esModule) test = test.default;
/**/


// local double quotes
import test from "./test"

/* expected */
const test = require("./test");
/**/

// global double quotes
import test from "test"

/* expected */
let test = require("test"); if (test && test.__esModule) test = test.default;
/**/