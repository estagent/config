import set from 'lodash/set'

const Config = {}

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

/**
 *
 * @param  opts object
 */
export const bootConfig = opts => {
  if (opts.hasOwnProperty('config_global')) globalizeConfig(opts.config_global)
  else if (opts.hasOwnProperty('configs')) mergeConfigs(opts.configs)
  else {
    if (opts) mergeConfigs(opts)
    globalizeConfig('config')
  }
}

const __setter = configs => {
  for (let dotted of Object.keys(configs)) {
    const value = configs[dotted]
    if (typeof dotted !== 'string') throw 'invalid key'
    if (value instanceof Object || Array.isArray(value))
      throw 'value can not be object or array'
    set(Config, dotted, value)
  }
}

export const config = (code, def = null) => {
  if (typeof code === 'object') return __setter(code)
  else if (!(typeof code == 'string')) throw 'invalid config input'
  try {
    const value = eval(`Config.${code}`)
    if (value === undefined) return def
    return value
  } catch (err) {
    return def
  }
}
