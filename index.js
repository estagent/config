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
const globalizeConfig = function(key) {
  if (key === false) return
  if (window[key] !== undefined) throw 'config already registered'
  window[key] = config
}

export const mergeConfig = function(configs) {
  if (arguments.length > 1) Array.from(arguments).forEach(config => mergeConfig(config))
  else if (Array.isArray(configs)) configs.forEach(config => mergeConfig(config))
  else if (typeof configs === 'object')
    for (let key of Object.keys(configs)) {
      if (Config[key]) throw `config key(${key}) already exists`
      Config[key] = configs[key]
    }
  else throw 'invalid mergeConfig argument'
}

export const bootConfig = opts => {
  globalizeConfig(opts.config_global ?? 'config')
  if (opts.hasOwnProperty('config')) mergeConfig(opts.config)
  else if (opts) mergeConfig(opts)
  return {
    config: config,
    mergeConfig: mergeConfig,
    globalizeConfig: globalizeConfig,
  }
}
