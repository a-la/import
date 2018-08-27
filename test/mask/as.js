// import as
import * as tests from './tests'

/* expected */
const tests = require('./tests');
/**/

// import as with default
import def, * as tests from './tests'

/* expected */
let tests = def = require('./tests'); if (def && def.__esModule) def = def.default;
/**/