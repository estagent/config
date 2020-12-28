import objectPath from 'object-path'

const Config = {}

/**
 *
 * @param mixed
 * @param def
 * @returns {any}
 */
export const config = (mixed, def) => {
  if (typeof mixed === 'object') {
    for (let path of Object.keys(mixed))
      objectPath.set(Config, path, mixed[path])
  } else if (typeof mixed == 'string') {
    return objectPath.get(Config, mixed) ?? def
  } else throw 'invalid config input'
}

/**
 *
 * @param key
 */
const globalizeConfig = function (key) {
  if (key === false) return
  if (window[key] !== undefined) throw 'config already registered'
  window[key] = config
}

export const mergeConfigs = configs => {
  if (typeof configs !== 'object') throw 'configs must be object'
  for (let key of Object.keys(configs)) {
    if (Config[key]) throw 'config key already exists'
    Config[key] = configs[key]
  }
}

export const bootConfig = opts => {
  globalizeConfig(opts.config_global ?? 'config')
  if (opts.hasOwnProperty('configs')) mergeConfigs(opts.configs)
  else if (opts) mergeConfigs(opts)
}
