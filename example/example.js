/* yarn example/ */
import ALaContext from '@a-la/context'
import ALaImport from '../src'

const STRING = `import aLaMode from 'alamode'
import ALaImport from "@a-la/import"
import App from 'koa'
`

;(async () => {
  const context = new ALaContext()
  const { result } = await context.stream(ALaImport, STRING)
  console.log(result)
})()
