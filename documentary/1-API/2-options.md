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