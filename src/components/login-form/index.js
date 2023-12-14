import './style.css'
import Input from "../input";
import PropTypes from "prop-types";
import useStore from "../../hooks/use-store";
import {useCallback, useState} from "react";
import useSelector from "../../hooks/use-selector";


export const LoginForm = ({t}) => {
  const store = useStore();

  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    error: state.user.error,
  }));


  const onSubmit = (e) => {
    e.preventDefault();
    store.actions.user.login(formData)
  }

  const callbacks = {
    onChangePassword: useCallback((password) => {
      setFormData(prevData => ({
        ...prevData,
        password,
        login: prevData.login
      }));
    }, []),
    onChangeLogin: useCallback((login) => {
      setFormData(prevData => ({
        ...prevData,
        login,
        password: prevData.password
      }));
    }, []),
  }

  return (
    <section className={'login'}>
      <h2 className={'login-title'}>{t('login.login')}</h2>
      <form className={'login-form'} onSubmit={onSubmit}>
        <div className={'login-form-input'}>
          <label htmlFor={'login'}>{t('login.username')}</label>
          <Input id={'login'}
                 name="login"
                 type={'text'}
                 onChange={callbacks.onChangeLogin}
                 value={formData.login}
                 disabled={select.waiting}
                 required
          />
        </div>
        <div className={'login-form-input'}>
          <label htmlFor={'password'}>{t('login.password')}</label>
          <Input id={'password'}
                 name="password"
                 type={'password'}
                 onChange={callbacks.onChangePassword}
                 value={formData.password}
                 disabled={select.waiting}
                 required
          />
        </div>
        {select.error && <span className={'error-message'}>{select.error}</span>}
        <button disabled={select.waiting} type='submit'>{t('login.login')}</button>
      </form>
    </section>
  )
}

LoginForm.propTypes = {
  t: PropTypes.func,
}