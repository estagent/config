import set from 'lodash/set'

const Config = {}

const setConfig = configs => {
  for (let dotted of Object.keys(configs)) {
    const value = configs[dotted]

    if (typeof dotted !== 'string') throw 'invalid key'

    if (value instanceof Object || Array.isArray(value))
      throw 'value can not be object or array'

    set(Config, dotted, value)
  }
}
export const mergeConfigs = object => {
  for (let key of Object.keys(object)) {
    if (Config[key]) throw 'config key already exists'

    Config[key] = object[key]
  }
}

export const globalizeConfig = function (key = 'config') {
  if (window[key] !== undefined) throw 'config already registered'

  window[key] = config
}

export const config = (code, def = null) => {
  if (typeof code === 'object') return setConfig(code)
  else if (!(typeof code == 'string')) throw 'invalid config input'

  try {
    const value = eval(`Config.${code}`)

    if (value === undefined) return def

    return value
  } catch (err) {
    return def
  }
}
