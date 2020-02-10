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
function replacement(match, i, r) {
  let rr = i.replace(/ /g, '').replace('import', 'require(')
  rr += r + ');'
  return rr
}

export default blank