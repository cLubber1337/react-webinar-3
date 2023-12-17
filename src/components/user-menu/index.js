import './style.css'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";



export const UserMenu = ({isAuth, waiting, user, logout, t, link}) => {

   return  <div className={'user-menu'}>
      {isAuth ?
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
  isAuth: PropTypes.bool.isRequired,
  waiting: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired
}
