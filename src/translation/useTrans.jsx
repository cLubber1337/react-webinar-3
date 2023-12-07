import {locales} from "./locales";
import {useContext} from "react";
import {LANG, LanguageContext} from "./language-provider";


export const useTrans = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    const newLanguage = language === LANG.RU ? LANG.ENG : LANG.RU
    setLanguage(newLanguage)
  }

  return {
    trans: (text) => {
        return locales[language][text]
    },
    language,
    toggleLanguage
  }
}