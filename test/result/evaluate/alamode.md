// evaluates default + named
import erte, { c, b } from '../fixture/alamode'

Object.assign(test, {
  c: c(),
  b: b(),
  erte: erte(),
})

/* expected */
{
  "c": true,
  "b": true,
  "erte": true
}
/**/

// evaluates default
import erte from '../fixture/alamode'

Object.assign(test, {
  erte: erte(),
})

/* expected */
{
  "erte": true
}
/**/

// evaluates named
import { c, b } from '../fixture/alamode'

Object.assign(test, {
  c: c(),
  b: b(),
})

/* expected */
{
  "c": true,
  "b": true
}
/**/