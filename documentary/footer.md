
## Lines Preservation

The transform will attempt to preserve lines as they are for easier generation of source maps by `alamode`. In future, this might change.

### Named Imports

The named imports are only changed to replace `as` into `:`, otherwise the destructuring syntax is the same as for imports themselves.

%EXAMPLE: example/lines.js%

%FORK-js example example/run example/lines.js%

### Named & Default

When there is a default import along with named once, the line numbers will be respected.

%EXAMPLE: example/lines-default.js%

%FORK-js example example/run example/lines-default.js%

## Checklist

- [x] `import defaultExport from "module-name"`
- [ ] `import * as name from "module-name";`
- [x] `import { export } from "module-name";`
- [x] `import { export as alias } from "module-name";`
- [x] `import { export1 , export2 } from "module-name";`
- [x] `import { export1 , export2 as alias2 , [...] } from "module-name";`
- [x] `import defaultExport, { export [ , [...] ] } from "module-name";`
- [ ] `import defaultExport, * as name from "module-name";`
- [ ] `import "module-name";`
- [ ] `var promise = import(module-name);`

## Copyright

(c) [À La Mode][1] 2018

[1]: https://alamode.cc
