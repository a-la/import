## replaces paths
import test from "../../src/lib"

/* expected */
const test = require("../../build/lib");
/**/

## replaces paths with literals
import test from `../../src/lib`

/* expected */
const test = require(`../../build/lib`);
/**/

## replaces import as
import * as test from "../../src/lib"

/* expected */
const test = require("../../build/lib");
/**/