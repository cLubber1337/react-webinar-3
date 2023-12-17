import './style.css'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";



export const UserMenu = ({waiting, user, logout, t, link}) => {

   return  <div className={'user-menu'}>
      {!!user ?
        <div className={'user-menu-info'}>
          <Link to={link}>{user?.profile?.name}</Link>
          <button disabled={waiting} onClick={logout}>
            {t('login.logout')}
          </button>
        </div>
        : <button disabled={waiting} className={'user-menu-button'}>
          <Link to={'/login'}>
            {t('login.login')}
          </Link>
        </button>}
    </div>
}

UserMenu.propTypes = {
  waiting: PropTypes.bool.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired
}
