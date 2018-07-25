# @a-la/import

[![npm version](https://badge.fury.io/js/%40a-la%2Fimport.svg)](https://npmjs.org/package/@a-la/import)

`@a-la/import` is a new Node.js npm package. It is used in `alamode` as an A La Regex to transpile an import statement into a require statement.

```sh
yarn add -E @a-la/import
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`ALaImport(import_string: string): string`](#alaimportimport_string-string-string)

## API

The _ALaImport_ is the default export and a rule for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class). The regular expression is also exported as _ALaImportRe_.

```js
import ALaImport, { ALaImportRe } from '@a-la/import'
```

### `ALaImport(`<br/>&nbsp;&nbsp;`import_string: string,`<br/>`): string`

The _Rule_ consists of a `re` and `replacement` properties.

```js
const rule = {
  re: /import ([\w\d]+) from '(.+?)'/gm,
  replacement(match, name, src) {
    const s = `const ${name} = require('${src}')`
    return s
  },
}
```

```js
/* yarn example/ */
import { Replaceable } from 'restream'
import ALaImport from '@a-la/import'

const STRING = `import aLaMode from 'alamode'
import ALaImport from '@a-la/import'
import App from 'koa'
`

;(async () => {
  const stream = new Replaceable(
    ALaImport,
  )
  await new Promise((r, j) => {
    stream.end(STRING, r)
    stream.on('error', j)
  })
  stream.pipe(process.stdout)
})()
```

```js
const aLaMode = require('alamode')
const ALaImport = require('@a-la/import')
const App = require('koa')
```

---

(c) [A La Mode][1] 2018

[1]: https://alamode.cc
