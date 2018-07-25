"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = import;

var _util = require("util");

const LOG = (0, _util.debuglog)('@a-la/import');
/**
 * A La Regex to transpile an import statement into require.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */

async function import(config = {}) {
  const {
    type
  } = config;
  LOG('@a-la/import called with %s', type);
  return type;
}
/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
//# sourceMappingURL=index.js.map