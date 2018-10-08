// always adds esCheck
import test from '.'

/* expected */
let test = require('.'); if (test && test.__esModule) test = test.default;
/**/

// always adds esCheck with import as
import def, * as test from '.'

/* expected */
let test = def = require('.'); if (def && def.__esModule) def = def.default;
/**/