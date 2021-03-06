export const getRequire = (quotes, src) => {
  return 'r' + `equire(${quotes}${src}${quotes})`
}

export const getIfEsModule = (name) => {
  const s = `if (${name} && ${name}.__esModule) ${name} = ${name}.default`
  return s
}

export const getDefault = (name, req) => {
  if (!name) return
  const ifES = getIfEsModule(name)
  const d = `${name} = ${req}`
  return { d, ifES }
}

export const replaceRequire = (seg, quotes, src, defName = null) => {
  const eq = seg.replace(/(\s+)from(\s+)([\s\S])*/, (m, b, a) => {
    return `${b}=${a}`
  })
  const req = defName ? defName : getRequire(quotes, src)
  const res = `${eq}${req}`
  return res
}

/**
 * @param {string} src
 * @param {!_alamode.Config} config
 */
export const getSource = (src, config = {}) => {
  if (!config.import) return src
  const { import: { replacement } } = config
  if (!replacement) return src
  const { from, to } = replacement
  if (from === undefined)
    throw new Error('No "from" option is given for the replacement.')
  if (to === undefined )
    throw new Error('No "to" option is given for the replacement.')
  const fromRe = new RegExp(replacement.from)
  const res = src.replace(fromRe, replacement.to)
  return res
}

// temp solution, until restream markers can store only part of regex, e.g. '%RESTREAM_MARKER%' instead of %RESTREAM_MARKER% for a string.
export const fromRe = /(\s+from\s+)(?:%%_RESTREAM_STRINGS_REPLACEMENT_(\d+)_%%)/

/**
 * @param {!_alamode.Config} config
 */
export const alwaysCheckES = (config = {
  import: {},
}) => {
  try {
    return config.import.esCheck == 'always'
  } catch (err) {
    return false
  }
}
/**
 * @param {string} name
 * @param {!_alamode.Config} config
 */
export const isAlamodeModule = (name, config = {
  import: {},
}) => {
  try {
    return config.import.alamodeModules.includes(name)
  } catch (err) {
    return false
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('alamode/types').Config} _alamode.Config
 */