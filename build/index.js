"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ALaImportRe = void 0;

var _util = require("util");

const LOG = (0, _util.debuglog)('@a-la/import');
/**
 * A La Regex to transpile an import statement into require.
 */

const ALaImportRe = /import ([\w\d]+) from '(.+?)'/gm;
/**
 * A La Rule to use the regex for replacement.
 * @type {Rule}
 */

exports.ALaImportRe = ALaImportRe;
const ALaImport = {
  re: ALaImportRe,

  replacement(match, name, src) {
    const s = `const ${name} = require('${src}')`;
    return s;
  }

};
/**
 * @typedef {import('restream').Rule} Rule
 */

var _default = ALaImport;
exports.default = _default;
//# sourceMappingURL=index.js.map