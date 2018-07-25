/* yarn example/ */
import { Replaceable } from 'restream'
import ALaImport from '../src'

const STRING = `import aLaMode from 'alamode'
import ALaImport from "@a-la/import"
import App from 'koa'
`

;(async () => {
  const stream = new Replaceable([
    ...ALaImport,
  ])
  await new Promise((r, j) => {
    stream.end(STRING, r)
    stream.on('error', j)
  })
  stream.pipe(process.stdout)
})()
