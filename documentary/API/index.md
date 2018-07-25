
## API

The _ALaImport_ is the default export and a rule for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class). The regular expression is also exported as _ALaImportRe_.

```js
import ALaImport, { ALaImportRe } from '@a-la/import'
```

```### ALaImport => string
[
  ["import_string", "string"]
]
```

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

%EXAMPLE: example/example.js, ../src => @a-la/import, js%

%FORK-js example example/example%
