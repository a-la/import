## API

The _ALaImport_ is the default export and an array containing a sequence of rules for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class).

```js
import ALaImport from '@a-la/import'
```

### `ALaImport` Sequence

The rule set exported as an array by `ALaImport` has multiple regexes and replacer functions to match all possible cases. The replacer functions expect to see the `matchers` property on the context, which is set by `alamode` to access cut out strings. The transform can be run using `@a-la/context` which is a lightweight version of `alamode` which mimics its stream functionality.

%EXAMPLE: example/example.js, ../src => @a-la/import, js%

%FORK-js example example/example%

### Options

The transform accepts a number of options via the `.alamoderc`.

- `replacement` option is used to substitute the name or path of an imported module.
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
- `esCheck` option is used to always enforce the `if (mod.__esModule)` check -- by default, this is switched off for local imports, but is added when requiring external packages to make it compatible with _Babel_ and _TypeScript_.
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

%~%

<!--
```### ALaImport => string
[
  ["import_string", "string"]
]
``` -->
