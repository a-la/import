### `ÀLaImport` Sequence

The rule set exported as an array by `ÀLaImport` has multiple regexes and replacer functions to match all possible cases. The replacer functions expect to see the `markers` property on the context, which is set by `alamode` to access cut out strings. The transform can be run using `@a-la/context` which is a lightweight version of `alamode` which mimics its stream functionality.

%EXAMPLE: example, ../src => @a-la/import, js%

%FORK-js example%

%~ width="25"%