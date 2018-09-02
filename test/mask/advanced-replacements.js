// standard
`
  import string from "../../src/lib"'
`
import test from "../../src/lib"

/* expected */
`
  import string from "../../src/lib"'
`
let test = require("../../build/lib"); if (test && test.__esModule) test = test.default;
/**/

// string literals
`
  import test from \`../../src/lib\`
`
import test from `../../src/lib`

/* expected */
`
  import test from \`../../src/lib\`
`
let test = require(`../../build/lib`); if (test && test.__esModule) test = test.default;
/**/