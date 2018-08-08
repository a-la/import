/* yarn example/ */
import { Replaceable } from 'restream'
import ALaImport from '../src'
import { readFileSync } from 'fs'

const STRING = readFileSync('example/imports.js')

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
