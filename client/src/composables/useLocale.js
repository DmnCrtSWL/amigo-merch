import { currentLang } from '../store/locale.js'
import { translations } from '../i18n/translations.js'

export function useLocale() {
  // Reads currentLang reactively – Vue tracks the dependency in templates.
  const t = (path) => {
    const keys = path.split('.')
    let obj = translations[currentLang.value] ?? translations.ESP
    for (const key of keys) obj = obj?.[key]
    return typeof obj === 'string' ? obj : path
  }
  return { t, currentLang }
}
