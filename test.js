import {config, mergeConfigs, globalizeConfig} from './index'

require('dotenv').config()

const app = {
  name: process.env.APP_NAME,
  version: process.env.APP_VERSION,
  timezone: process.env.APP_TIMEZONE,
  locale: process.env.APP_LOCALE,
  currency: process.env.APP_CURRENCY,
  url: process.env.APP_URL,
  env: process.env.APP_ENV,
  debug: process.env.APP_DEBUG,
  global_currency: 'eur',
  global_language: 'en',
}

mergeConfigs({app: app})
globalizeConfig('config')

console.log(config('app.name'))
