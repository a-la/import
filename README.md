# @a-la/import

[![npm version](https://badge.fury.io/js/%40a-la%2Fimport.svg)](https://npmjs.org/package/@a-la/import)

`@a-la/import` is a a set of rules for [`alamode`](https://alamode.cc) to transpile an `import` statement into `require` in Node.js.

_À La Mode_ is a RegExp-based transpiler which works faster than AST-based transpilers such as `@babel`, and occupies only 10KB of disk space.

```sh
yarn add -E @a-la/import
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`ALaImport` Sequence](#alaimport-sequence)
- [Output Example](#output-example)
- [Copyright](#copyright)

## API

The _ALaImport_ is the default export and an array containing a sequence of rules for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class).

```js
import ALaImport from '@a-la/import'
```

### `ALaImport` Sequence

The rule set exported as an array by `ALaImport` has multiple regexes and replacer functions to match all possible cases.

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


## Output Example

The set of rules changes `import` to `require` statements.

```js
import aLaMode from 'alamode'
import scoreALaMode from "@a-la/import"

import { methodA, methodB } from 'alamode'
import { methodC, methodD as aliasD } from 'alamode'
import defaultALaMode, {
  methodE, methodF,
} from 'alamode'
```

```js
const aLaMode = require('alamode')
const scoreALaMode = require("@a-la/import")

const { methodA, methodB } = require('alamode')
const { methodC, methodD: aliasD } = require('alamode')
import defaultALaMode, {
  methodE, methodF,
} from 'alamode'
```


## Copyright

(c) [À La Mode][1] 2018

[1]: https://alamode.cc
