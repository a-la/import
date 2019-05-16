/* yarn example/ */
import ÀLaContext from '@a-la/context'
import ÀLaImport from '../src'

const STRING = `import aLaMode from 'alamode'
import ALaImport from "@a-la/import"
import App from 'koa'
import test from './test'
`

;(async () => {
  const context = new ÀLaContext(__filename)
  context.setConfig({
    import: {
      alamodeModules: ['alamode', '@a-la/import'],
    },
  })
  const { result } = await context.stream(ÀLaImport, STRING)
  console.log(result)
})()
