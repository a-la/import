/* yarn example/ */
import ALaContext from '@a-la/context'
import ALaImport from '../src'
import { readFileSync } from 'fs'

const STRING = readFileSync(process.argv[3] || 'example/imports.js')

;(async () => {
  const context = new ALaContext()
  const { result } = await context.stream(ALaImport, STRING)
  console.log(result)
})()
