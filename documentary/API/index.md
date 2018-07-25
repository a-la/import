
## API

The _ALaImport_ is the default export and an array containing a sequence of rules for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class). The rule set has multiple regexes and replacer functions to match all possible cases.

```js
import ALaImport from '@a-la/import'
```

%EXAMPLE: example/example.js, ../src => @a-la/import, js%

%FORK-js example example/example%

<!--
```### ALaImport => string
[
  ["import_string", "string"]
]
``` -->

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
