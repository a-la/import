// local single quotes
import './test'

/* expected */
require('./test');
/**/

// global single quotes
import 'test'

/* expected */
require('test');
/**/

// local double quotes
import "./test"

/* expected */
require("./test");
/**/

// global double quotes
import "test"

/* expected */
require("test");
/**/