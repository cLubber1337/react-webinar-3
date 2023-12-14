import './style.css'
import {Link} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";


export const UserMenu = () => {

  const store = useStore()

  const {t} = useTranslate();

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    waiting: state.user.waiting,
    user: state.user.user
  }));



  return <SideLayout padding='small' side='end'>
    <div className={'user-menu'}>
      {select.isAuth ?
        <div className={'user-menu-info'}>
          <Link to={`/profile/${select.user?._id}`}>{select.user?.profile?.name}</Link>
          <button disabled={select.waiting} onClick={() => store.actions.user.logout()}>
            {t('login.logout')}
          </button>
        </div>
        : <button disabled={select.waiting} className={'user-menu-button'}>
          <Link to={'/login'}>
            {t('login.login')}
          </Link>
        </button>}
    </div>
  </SideLayout>
}

