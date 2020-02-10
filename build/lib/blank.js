const { getSource } = require('./');

const fromRe = /(%%_RESTREAM_STRINGS_REPLACEMENT_(\d+)_%%|%%_RESTREAM_LITERALS_REPLACEMENT_(\d+)_%%)/

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

  let rr = Import.replace(/ /g, '').replace('import', 'require(')

  const source = getSource(src, this.config)

  rr += `${quotes}${source}${quotes});`
  return rr
}

module.exports=blank