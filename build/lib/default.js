"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportDefaultRe = exports.default = void 0;
const ImportDefaultRe = /^\s*import ([\w\d]+) from (["'])(.+?)\2/gm;
/**
 * A La Rule to use the regex for replacement.
 * @type {Rule}
 */

exports.ImportDefaultRe = ImportDefaultRe;
const ImportDefaultRule = {
  re: ImportDefaultRe,

  replacement(match, name, quotes, src) {
    const s = `const ${name} = require(${quotes}${src}${quotes})`;
    return s;
  }

};
/**
 * @typedef {import('restream').Rule} Rule
 */

var _default = ImportDefaultRule;
exports.default = _default;
//# sourceMappingURL=default.js.map