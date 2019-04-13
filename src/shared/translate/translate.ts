import { I18nManager } from 'react-native'
import { map, times } from 'ramda'
import { en } from './languages/en'
// import * as RNLocalize from 'react-native-localize'
import * as i18n from "i18n-js"

i18n.default.fallbacks = true
i18n.default.translations = {
  en,
}

export function translate(key: string) {
  return key ? i18n.default.t(key) : null
}

// export function getLocals() {
//   return RNLocalize.getLocales()
// }
//
// export function getCountry() {
//   return RNLocalize.getCountry()
// }
