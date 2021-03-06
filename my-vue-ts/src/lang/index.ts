import Vue from 'vue'
import VueI18n from 'vue-i18n' // 国际化插件

import { getLanguage } from '@/utils/cookies'

// element-ui built-in lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)
console.log('ssssssss',navigator)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
}

export const getLocale = () => {
    const cookieLanguage = getLanguage()
    if (cookieLanguage) {
        return cookieLanguage
    }
    
    const language = navigator.language.toLowerCase()
    const locales = Object.keys(messages)
    console.log('7890000',locales)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }

    // Default language is english
    return 'en'
}

const i18n = new VueI18n({
    locale: getLocale(),
    messages
})

export default i18n
