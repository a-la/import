## does not add the check for alamode module
import test from 'test'

/* expected */
const test = require('test');
/**/

## does not add the check to nodejs packages
import Stream from 'stream'

/* expected */
const Stream = require('stream');
/**/