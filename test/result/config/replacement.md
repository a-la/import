## replaces paths
import test from "../../src/lib"

/* expected */
const test = require("../../build/lib");
/**/

## replaces blank paths
import "../../src/lib"

/* expected */
require("../../build/lib");
/**/

## replaces import as
import * as test from "../../src/lib"

/* expected */
const test = require("../../build/lib");
/**/