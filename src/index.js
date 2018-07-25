import { debuglog } from 'util'

const LOG = debuglog('@a-la/import')

/**
 * A La Regex to transpile an import statement into require.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */
export default async function import(config = {}) {
  const {
    type,
  } = config
  LOG('@a-la/import called with %s', type)
  return type
}

/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
