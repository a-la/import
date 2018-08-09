"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.re = exports.default = void 0;

var _2 = require(".");

const re = /^ *import\s*(?:([\w\d]+)\s*,)?\s*{((?:\s*[\w\d]+(?:\s*as\s*[\w\d]+)?\s*,?\s*)*)} from (["'])(.+?)\3/gm;
/**
 * A rule to replace `import { method } from 'package'` statement.
 * @type {import('restream').Rule}
 */

exports.re = re;
const rule = {
  re,

  replacement(match, def, methods, quotes, src) {
    const r = (0, _2.getRequire)(quotes, src);
    const mm = methods.replace(/([\w\d]+)(?:\s+as\s*([\w\d]+))?/g, (_, name, alias) => {
      return alias ? `${name}: ${alias}` : name;
    });

    if (def) {
      const s = `const ${def} = ${r}
const {${mm}} = ${def}`;
      return s;
    } else {
      const s = `const {${mm}} = ${r}`;
      return s;
    }
  }

};
var _default = rule;
exports.default = _default;
//# sourceMappingURL=named.js.map