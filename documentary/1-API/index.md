## API

The _ÀLaImport_ is the default export and an array containing a sequence of rules for [_Replaceable_](https://github.com/artdecocode/restream#replaceable-class).

```js
import ÀLaImport from '@a-la/import'
```

### `ÀLaImport` Sequence

The rule set exported as an array by `ÀLaImport` has multiple regexes and replacer functions to match all possible cases. The replacer functions expect to see the `markers` property on the context, which is set by `alamode` to access cut out strings. The transform can be run using `@a-la/context` which is a lightweight version of `alamode` which mimics its stream functionality.

%EXAMPLE: example, ../src => @a-la/import, js%

%FORK-js example%

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

%~%

<!--
```### ALaImport => string
[
  ["import_string", "string"]
]
``` -->
