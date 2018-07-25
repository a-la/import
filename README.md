# @a-la/import

[![npm version](https://badge.fury.io/js/%40a-la%2Fimport.svg)](https://npmjs.org/package/@a-la/import)

`@a-la/import` is a new Node.js npm package. It is used in `alamode` as an A La Rule to transpile an import statement into a require statement.

```sh
yarn add -E @a-la/import
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`Default` Rule](#default-rule)

## API

The _ALaImport_ is the default export and an array containing a sequence of rules for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class). The rule set has multiple regexes and replacer functions to match all possible cases.

```js
import ALaImport from '@a-la/import'
```

```js
/* yarn example/ */
import { Replaceable } from 'restream'
import ALaImport from '@a-la/import'

const STRING = `import aLaMode from 'alamode'
import ALaImport from "@a-la/import"
import App from 'koa'
`

;(async () => {
  const stream = new Replaceable([
    ...ALaImport,
  ])
  await new Promise((r, j) => {
    stream.end(STRING, r)
    stream.on('error', j)
  })
  stream.pipe(process.stdout)
})()
```

```js
const aLaMode = require('alamode')
const ALaImport = require("@a-la/import")
const App = require('koa')
```

> Each _Rule_ consists of a `re` and `replacement` properties.

### `Default` Rule

Allows to import the default export.

<table>
<tr>
 <td>Example</td>
 <td>

```js
import ALaImport from 'testPackage'
```
 </td>
</tr>
<tr>
 <td>Rule</td>
 <td>

```js
const ImportDefaultRule = {
  re: /import ([\w\d]+) from '(.+?)'/gm,
  replacement(match, name, src) {
    const s = `const ${name} = require('${src}')`
    return s
  },
}
```
 </td>
</tr>
</table>

---

(c) [A La Mode][1] 2018

[1]: https://alamode.cc
