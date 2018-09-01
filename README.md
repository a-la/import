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
  * [Options](#options)
- [Output Example](#output-example)
- [Lines Preservation](#lines-preservation)
  * [Named Imports](#named-imports)
  * [Named & Default](#named--default)
- [Checklist](#checklist)
- [TODO](#todo)
- [Copyright](#copyright)

## API

The _ALaImport_ is the default export and an array containing a sequence of rules for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class).

```js
import ALaImport from '@a-la/import'
```

### `ALaImport` Sequence

The rule set exported as an array by `ALaImport` has multiple regexes and replacer functions to match all possible cases. The replacer functions expect to see the `matchers` property on the context, which is set by `alamode` to access cut out strings. The transform can be run using `@a-la/context` which is a lightweight version of `alamode` which mimics its stream functionality.

```js
/* yarn example/ */
import ALaContext from '@a-la/context'
import ALaImport from '@a-la/import'

const STRING = `import aLaMode from 'alamode'
import ALaImport from "@a-la/import"
import App from 'koa'
`

;(async () => {
  const context = new ALaContext()
  const { result } = await context.stream(ALaImport, STRING)
  console.log(result)
})()
```

```js
let aLaMode = require('alamode'); if (aLaMode && aLaMode.__esModule) aLaMode = aLaMode.default;
let ALaImport = require("@a-la/import"); if (ALaImport && ALaImport.__esModule) ALaImport = ALaImport.default;
let App = require('koa'); if (App && App.__esModule) App = App.default;
```

### Options

The transform accepts a single `replacement` option via the `.alamoderc` to be able to substitute the name or path of an imported module.

```json
{
  "env": {
    "test-build": {
      "import": {
        "replacement": {
          "from": "^((../)+)src",
          "to": "$1build"
        }
      }
    }
  }
}
```


## Output Example

The set of rules changes `import` to `require` statements. When importing a default module, a check will be made to see if it was transpiled with `Babel` which is indicated by the presence of the `__esModule` property, and if it was, then the `default` property is reassinged to the variable.

```js
import aLaMode from 'alamode'
import scopeALaMode from "@a-la/import"

import { methodA, methodB } from 'alamode'
import { methodC, methodD as aliasD } from 'alamode'
import defaultALaMode, {
  methodE, methodF,
} from 'alamode'

import def, * as tests from './tests'
```

```js
let aLaMode = require('alamode'); if (aLaMode && aLaMode.__esModule) aLaMode = aLaMode.default;
let scopeALaMode = require("@a-la/import"); if (scopeALaMode && scopeALaMode.__esModule) scopeALaMode = scopeALaMode.default;

const { methodA, methodB } = require('alamode');
const { methodC, methodD: aliasD } = require('alamode');
let defaultALaMode = require('alamode'); if (defaultALaMode && defaultALaMode.__esModule) defaultALaMode = defaultALaMode.default; const {
  methodE, methodF,
} = defaultALaMode

let tests = def = require('./tests'); if (def && def.__esModule) def = def.default;
```


## Lines Preservation

The transform will attempt to preserve lines as they are for easier generation of source maps by `alamode`. In future, this might change.

### Named Imports

The named imports are only changed to replace `as` into `:`, otherwise the destructuring syntax is the same as for imports themselves.

```js
import { test, test2,
  test3 as alias3 }
from 'package'
```

```js
const { test, test2,
  test3: alias3 }
= require('package');
```

### Named & Default

When there is a default import along with named once, the line numbers will be respected.

```js
import def, {
  test, test2,
  test3 as alias3,
  test4
    as
  alias4,
}
  from
  'package'
```

```js
let def = require('package'); if (def && def.__esModule) def = def.default; const {
  test, test2,
  test3: alias3,
  test4
    :
  alias4,
}
  =
  def
```

## Checklist

- [x] `import defaultExport from "module-name"`
- [x] `import * as name from "module-name";`
- [x] `import { export } from "module-name";`
- [x] `import { export as alias } from "module-name";`
- [x] `import { export1 , export2 } from "module-name";`
- [x] `import { export1 , export2 as alias2 , [...] } from "module-name";`
- [x] `import defaultExport, { export [ , [...] ] } from "module-name";`
- [x] `import defaultExport, * as name from "module-name";`
- [ ] `import "module-name";`
- [ ] `var promise = import(module-name);`

## TODO

- [ ] Add an option to ignore the `__esModule` check for specified packages.
- [ ] Better `from 'package'` handling when matchers' logic is updated in the `restream`.

## Copyright

(c) [À La Mode][1] 2018

[1]: https://alamode.cc
