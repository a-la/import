import ÀLaContext from '@a-la/context'
import ÀLaImport from '../src'
import { readFileSync } from 'fs'

const STRING = readFileSync(process.argv[2] || 'example/imports.js')

;(async () => {
  const context = new ÀLaContext(__filename)
  context.setConfig({
    import: {
      alamodeModules: ['alamode'],
    },
  })
  const { result } = await context.stream(ÀLaImport, STRING)
  console.log(result)
})()
