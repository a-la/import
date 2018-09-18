## Output Example

The set of rules changes `import` to `require` statements. When importing a default module, a check will be made to see if it was transpiled with `Babel` which is indicated by the presence of the `__esModule` property, and if it was, then the `default` property is reassinged to the variable.

%EXAMPLE: example/imports.js%

%FORK-js example example/run%

%~%

<!-- ## Rules

The replacement sequence consists of a number of rules, which produce the most reliable result when put together. See [`Rule Type` in restream](https://github.com/artdecocode/restream#rule-type) for more info about how rules work. -->
