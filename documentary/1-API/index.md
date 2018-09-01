
## API

The _ALaImport_ is the default export and an array containing a sequence of rules for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class).

```js
import ALaImport from '@a-la/import'
```

### `ALaImport` Sequence

The rule set exported as an array by `ALaImport` has multiple regexes and replacer functions to match all possible cases.

<!-- %EXAMPLE: example/example.js, ../src => @a-la/import, js%

%FORK-js example example/example% -->

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

<!--
```### ALaImport => string
[
  ["import_string", "string"]
]
``` -->
