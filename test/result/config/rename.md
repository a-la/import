## replaces paths
import test from "../../src/lib"

/* expected */
import test from "../../build/lib"
/**/

## replaces blank paths
import "../../src/lib"

/* expected */
import "../../build/lib"
/**/

## replaces import as
import * as test from "../../src/lib"

/* expected */
import * as test from "../../build/lib"
/**/