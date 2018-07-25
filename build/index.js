"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("util");

var _default2 = _interopRequireDefault(require("./lib/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOG = (0, _util.debuglog)('@a-la/import');
/**
 * A La Sequence to combine multiple rules from this package (such as `import defaultFn`, `import { namedFn }`, _etc_).
 */

const seq = [_default2.default];
var _default = seq; // export { default } from './lib/default'
// export { ALaImportRe }

exports.default = _default;
//# sourceMappingURL=index.js.map