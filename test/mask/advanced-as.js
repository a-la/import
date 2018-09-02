// as
import * as test from 'test'

/* expected */
const test = require('test');
/**/

// ignores strings
`
import * as test from 'test'
`

/* expected */
`
import * as test from 'test'
`
/**/
