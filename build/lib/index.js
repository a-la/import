"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequire = void 0;

const getRequire = (quotes, src) => {
  return `require(${quotes}${src}${quotes})`;
};

exports.getRequire = getRequire;
//# sourceMappingURL=index.js.map