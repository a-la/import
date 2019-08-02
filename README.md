# @a-la/import

[![npm version](https://badge.fury.io/js/%40a-la%2Fimport.svg)](https://npmjs.org/package/@a-la/import)

`@a-la/import` is a a set of rules for [`alamode`](https://alamode.cc) to transpile `import` statements into `require` calls in Node.JS.

_ÀLaMode_ is a RegExp-based transpiler which works faster than AST-based transpilers such as `@babel`, has no dependencies and occupies less disk space.

```sh
yarn add @a-la/import
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`ÀLaImport` Sequence](#àlaimport-sequence)
  * [Options](#options)
- [Output Example](#output-example)
- [Lines Preservation](#lines-preservation)
  * [Named Imports](#named-imports)
  * [Named & Default](#named--default)
- [Checklist](#checklist)
- [TODO](#todo)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## API

The _ÀLaImport_ is the default export and an array containing a sequence of rules for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class).

```js
import ÀLaImport from '@a-la/import'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true" width="25">
</a></p>



### `ÀLaImport` Sequence

The rule set exported as an array by `ÀLaImport` has multiple regexes and replacer functions to match all possible cases. The replacer functions expect to see the `markers` property on the context, which is set by `alamode` to access cut out strings. The transform can be run using `@a-la/context` which is a lightweight version of `alamode` which mimics its stream functionality.

```js
/* yarn example/ */
import ÀLaContext from '@a-la/context'
import ÀLaImport from '@a-la/import'

const STRING = `import aLaMode from 'alamode'
import ALaImport from "@a-la/import"
import App from 'koa'
import test from './test'
`

;(async () => {
  const context = new ÀLaContext(__filename)
  context.setConfig({
    import: {
      alamodeModules: ['alamode', '@a-la/import'],
    },
  })
  const { result } = await context.stream(ÀLaImport, STRING)
  console.log(result)
})()
```

```js
const aLaMode = require('alamode');
const ALaImport = require("@a-la/import");
let App = require('koa'); if (App && App.__esModule) App = App.default;
const test = require('./test');
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true" width="25">
</a></p>

### Options

The transform accepts a number of options via the `.alamoderc`.

- The _replacement_ option is used to substitute the name or path of an imported module.
    ```json5
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
- The _esCheck_ option is used to always enforce the `if (mod.__esModule)` check &mdash; by default, this check is switched off for local imports, but is added when requiring external packages to make it compatible with _Babel_ and _TypeScript_.
    ```json5
    {
      "env": {
        "test-build": {
          "import": {
            "esCheck": "always",
          }
        }
      }
    }
    ```
- The _alamodeModules_ array contains packages known to be compiled with ÀLAMode, or traditional packages that didn't use _Babel_ for compilation, so that the `if (mod.__esModule)` is not required.

If `esCheck` is not set, and `alamodeModules` does not contain the module that is being imported, the transform will attempt to find its _package.json_ file, and see if it has the `alamode` property set to true, in which case no _esCheck_ will be appended.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/4.svg?sanitize=true">
</a></p>

## Output Example

The set of rules changes `import` to `require` statements. When importing a default export from a module, a check will included to see if it was transpiled with `Babel` which is indicated by the presence of the `__esModule` property, and if it was, then the `default` property is reassigned to the variable.

```js
import aLaMode from 'alamode'
import Koa from "koa"

import { methodA, methodB } from 'alamode'
import { methodC, methodD as aliasD } from 'alamode'
import defaultALaMode, {
  methodE, methodF,
} from 'alamode'

import def, * as tests from './tests'
```

```js
const aLaMode = require('alamode');
let Koa = require("koa"); if (Koa && Koa.__esModule) Koa = Koa.default;

const { methodA, methodB } = require('alamode');
const { methodC, methodD: aliasD } = require('alamode');
const defaultALaMode = require('alamode'); const {
  methodE, methodF,
} = defaultALaMode;

const tests = def = require('./tests');
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/5.svg?sanitize=true">
</a></p>





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
let def = require('package'); const {
  test, test2,
  test3: alias3,
  test4
    :
  alias4,
}
  =
  def; if (def && def.__esModule) def = def.default;
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/6.svg?sanitize=true">
</a></p>

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

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/7.svg?sanitize=true">
</a></p>

## TODO

- [ ] Better `from 'package'` handling when matchers' logic is updated in the `restream`.

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://alamode.cc">À La Mode</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>