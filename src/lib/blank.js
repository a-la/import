import { getSource } from './'

const fromRe = /(%%_RESTREAM_STRINGS_REPLACEMENT_(\d+)_%%)/

const importRe = /(import\s+)/

/**
 * A rule to replace `import { method } from 'package'` statement.
 * @type {_restream.Rule}
 */
const blank = {
  re: new RegExp(`${importRe.source}${fromRe.source}`, 'gm'),
  replacement,
}

/**
 * @suppress {globalThis}
 * @type {_alamode.ÀLaModeReplacer}
 */
function replacement(match, Import, _, sd) {
  const realSrc = this.markers.strings.map[sd]
  const [, quotes, src] = /** @type {!RegExpResult} */(
    /(["'`])(.+?)\1/.exec(realSrc)
  )
  const source = getSource(src, this.config)

  if (this.renameOnly) {
    const renamed = getSource(src, this.config)
    return match.replace(/%%_RESTREAM_STRINGS_REPLACEMENT_\d+_%%/, `${quotes}${renamed}${quotes}`)
  }

  let rr = Import.replace(/ /g, '').replace('import', 'require(')


  rr += `${quotes}${source}${quotes});`
  return rr
}

export default blank