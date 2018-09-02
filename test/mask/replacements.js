// standard
import test from "../../src/lib"

/* expected */
let test = require("../../build/lib"); if (test && test.__esModule) test = test.default;
/**/

// string literals
import test from `../../src/lib`

/* expected */
let test = require(`../../build/lib`); if (test && test.__esModule) test = test.default;
/**/