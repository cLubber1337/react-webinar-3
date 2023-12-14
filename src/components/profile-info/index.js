import './style.css'
import PropTypes from "prop-types";
import {LoginForm} from "../login-form";


export const ProfileInfo = ({t, user}) => {


  return (
    <section className={'profile-info'}>
      <h2 className={'profile-info-title'}>
        {t('profileInfo.title')}
      </h2>
      <div className="profile-info-item">
        <span>{t('profileInfo.name')}: </span>
        <span className={'profile-info-value'}>
            {user?.profile?.name}
        </span>
      </div>
      <div className="profile-info-item">
        <span>{t('profileInfo.phone')}: </span>
        <span className={'profile-info-value'}>
          {user?.profile?.phone}
        </span>
      </div>
      <div className="profile-info-item">
        <span>{t('profileInfo.email')}: </span>
        <span className={'profile-info-value'}>
          {user?.email}
        </span>
      </div>
    </section>
  )
}

LoginForm.propTypes = {
  t: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    })
  })
}
