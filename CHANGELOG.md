## 16 May 2019

### [1.9.1](https://github.com/a-la/import/compare/v1.9.0...v1.9.1)

- [fix] Only make async rule when the stream supports it.

### [1.9.0](https://github.com/a-la/import/compare/v1.8.1...v1.9.0)

- [feature] Support check for alamode modules that don't need ES check.

## 24 April 2019

### [1.8.1](https://github.com/a-la/import/compare/v1.8.0...v1.8.1)

- [types] Adjust ÀLaMode types location.
- [fix] Fix error message for incomplete config (missing to/from).

### [1.8.0](https://github.com/a-la/import/compare/v1.7.0...v1.8.0)

- [types] Annotate with types.
- [package] Publish the `module` field.

## 8 October 2018

### 1.7.0

- [feature] Do not add the `__esModule` check to modules imported locally.

## 20 September 2018

### 1.6.2

- [fix] Rearrange default and named to fix the problem with modules imported from `babel`-transpiled modules.

## 1 September 2018

### 1.6.1

- [fix] Make sure that paths are replaced when importing with template literals.
- [deps] Update `@a-la/context`.

### 1.6.0

- [feature] Access string and literal markers from `alamode`.

## 27 August 2018

### 1.5.0

- [feature] `import * as` and `import def, * as` statements.
- [fix] Add semicolon after `= require('./package');`.

## 22 August 2018

### 1.4.1

- [doc] Document `replacement` option.

### 1.4.0

- [feature] Specify `replacement` via `.alamoderc`.
- [package] Add `.alamoderc.json`.

## 20 August 2018

### 1.3.1

- [tests] Set up tests using `zoroaster@2.3`'s ``makeTestSuite` function.
- [build] Build with exports preserving lines.

## 15 August 2018

### 1.3.0

- [feature] Preserve lines.
- [dep] Update to `zoroaster@2.2` for mask testing.

## 11 August 2018

### 1.2.0

- [feature] Check if `__esModule`, and use a single RegExp.
- [test] Mask testing.

## 10 August 2018

### 1.1.0

- [feature] Named imports.
- [doc] Better doc.
- [test] Mask testing.
- [package] Build w/ `alamode`.

## 25 July 2018

### 1.0.0

- Create `@a-la/import` with [`mnp`][https://mnpjs.org]
- [repository]: `src`, `test`
