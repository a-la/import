"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.re = exports.default = void 0;
const re = /^\s*import ([\w\d]+) from (["'])(.+?)\2/gm;
/**
 * A rule to replace `import method from 'package'` statement.
 * @type {import('restream').Rule}
 */

exports.re = re;
const rule = {
  re,

  replacement(match, name, quotes, src) {
    const s = `const ${name} = require(${quotes}${src}${quotes})`;
    return s;
  }

};
var _default = rule;
exports.default = _default;
//# sourceMappingURL=default.js.map