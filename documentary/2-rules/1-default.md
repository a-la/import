<!--
### `Default` Rule

Allows to import the default export.

```js
import helloWorld from 'hello-world'
``` -->

<!-- > Each _Rule_ consists of a `re` and `replacement` properties. -->
<!-- <details>
<summary>
<em>Click to Show Details.</em></summary>
<table>
<tr></tr>
<tr>
 <td><strong>

Example</strong></td>
 <td>

```js
import examplePackage from 'examplePackage'
```
 </td>
</tr>
<tr></tr>
<tr>
 <td><strong>

RegExp</strong></td>
 <td>

```js
/^\s*import ([\w\d]+) from (["'])(.+?)\2/gm
```
 </td>
</tr>
<tr></tr>

<tr>
 <td><strong>

Rule</strong></td>
 <td>

```js
const ImportDefaultRule = {
  re: /^\s*import ([\w\d]+) from (["'])(.+?)\2/gm,
  replacement(match, name, src) {
    const s = `const ${name} = require('${src}')`
    return s
  },
}
```
 </td>
</tr>

<tr></tr>
<tr>
 <td><strong>

Output</strong></td>
 <td>

```js
const examplePackage = require('examplePackage')
```
 </td>
</tr>
</table>

</details> -->
