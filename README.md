# @a-la/import

[![npm version](https://badge.fury.io/js/%40a-la%2Fimport.svg)](https://npmjs.org/package/@a-la/import)

`@a-la/import` is a new Node.js npm package. It is used in `alamode` as an A La Rule to transpile an import statement into a require statement.

```sh
yarn add -E @a-la/import
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`ALaImport` Sequence](#alaimport-sequence)
- [Rules](#rules)
  * [`Default` Rule](#default-rule)
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


## Rules

The replacement sequence consists of a number of rules, which produce the most reliable result when put together. See [`Rule Type` in documentary](https://github.com/artdecocode/restream#rule-type) for more info about how rules work.

### `Default` Rule

Allows to import the default export.

```js
import helloWorld from 'hello-world'
```

<details>
<summary>
<em>Click to Show Details.</em></summary>
<table>
<tr></tr>
<tr>
 <td><strong>

Example</strong></td>
 <td>

```js
import examplePackage from 'examplePackage'
```
 </td>
</tr>
<tr></tr>
<tr>
 <td><strong>

RegExp</strong></td>
 <td>

```js
/^\s*import ([\w\d]+) from (["'])(.+?)\2/gm
```
 </td>
</tr>
<tr></tr>

<tr>
 <td><strong>

Rule</strong></td>
 <td>

```js
const ImportDefaultRule = {
  re: /^\s*import ([\w\d]+) from (["'])(.+?)\2/gm,
  replacement(match, name, src) {
    const s = `const ${name} = require('${src}')`
    return s
  },
}
```
 </td>
</tr>

<tr></tr>
<tr>
 <td><strong>

Output</strong></td>
 <td>

```js
const examplePackage = require('examplePackage')
```
 </td>
</tr>
</table>

</details>

## Copyright

(c) [A La Mode][1] 2018

[1]: https://alamode.cc
