import './style.css';
import {useTrans} from "../../translation/useTrans";
import {LANG} from "../../translation/language-provider";


export const LangSwitcher = () => {
  const {trans, toggleLanguage, language} = useTrans()


  return (
    <div className={'lang-switcher'}>
      <span>{trans('Язык')}: </span>
      <button onClick={() => toggleLanguage()}>
        {language === LANG.RU ?
          <>
            <span className={'lang-active'}>РУС</span>&nbsp;/&nbsp;ENG
          </>
           :
          <>
            РУС&nbsp;/&nbsp;<span className={'lang-active'}>ENG</span>
          </>
        }
      </button>
    </div>
  )
}
