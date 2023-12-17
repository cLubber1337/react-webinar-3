import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {LoginForm} from "../../components/login-form";
import {useCallback, useEffect, useState} from "react";
import useTranslate from "../../hooks/use-translate";


export default function SignIn() {
  const store = useStore();
  const {t} = useTranslate();

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
    store.actions.user.login(formData).then(() => {
      setFormData({
        login: '',
        password: ''
      });
    })
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

  useEffect(() => {
    return () => store.actions.user.resetError()
  }, []);

  return (
    <LoginForm
      t={t}
      onSubmit={onSubmit}
      login={formData.login}
      password={formData.password}
      onChangeLogin={callbacks.onChangeLogin}
      onChangePassword={callbacks.onChangePassword}
      errorMessage={select.error}
      isLoading={select.waiting}
    />
  )
}