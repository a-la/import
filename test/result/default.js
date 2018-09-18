// single quotes
import test from 'test'

/* expected */
let test = require('test'); if (test && test.__esModule) test = test.default;
/**/

// double quotes
import test from "test"

/* expected */
let test = require("test"); if (test && test.__esModule) test = test.default;
/**/