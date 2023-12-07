import {createContext, useMemo, useState} from "react";


export const LANG = {
  'RU': 'ru',
  'ENG': 'en',
}

export const LanguageContext = createContext({})


const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState(LANG.RU)

  const defaultProps = useMemo(() => ({
    language,
    setLanguage
  }), [language])

  return (
    <LanguageContext.Provider value={defaultProps}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider