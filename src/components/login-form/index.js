import './style.css'
import Input from "../input";
import PropTypes from "prop-types";
import {memo} from "react";


export const LoginForm = memo(({
                            t,
                            onChangeLogin,
                            onChangePassword,
                            login,
                            password,
                            onSubmit,
                            isLoading,
                            errorMessage
                          }) => {
  return (
    <section className={'login'}>
      <h2 className={'login-title'}>{t('login.login')}</h2>
      <form className={'login-form'} onSubmit={onSubmit}>
        <div className={'login-form-input'}>
          <label htmlFor={'login'}>{t('login.username')}</label>
          <Input id={'login'}
                 name="login"
                 type={'text'}
                 onChange={onChangeLogin}
                 value={login}
                 disabled={isLoading}
                 required
          />
        </div>
        <div className={'login-form-input'}>
          <label htmlFor={'password'}>{t('login.password')}</label>
          <Input id={'password'}
                 name="password"
                 type={'password'}
                 onChange={onChangePassword}
                 value={password}
                 disabled={isLoading}
                 required
          />
        </div>
        {errorMessage && <span className={'error-message'}>{errorMessage}</span>}
        <button disabled={isLoading} type='submit'>{t('login.login')}</button>
      </form>
    </section>
  )
})

LoginForm.propTypes = {
  t: PropTypes.func,
  onChangeLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
  login: PropTypes.string,
  password: PropTypes.string,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string
}