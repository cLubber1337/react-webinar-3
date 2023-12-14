import {LoginForm} from "../../components/login-form";
import PageLayout from "../../components/page-layout";
import {UserMenu} from "../../containers/user-menu";
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Login() {
  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    user: state.user.user,
  }));

  useEffect(() => {
    if (select.isAuth) {
      navigate(`/profile/${select.user._id}`);
    }
  }, [select.isAuth]);

  return (
    <PageLayout head={<UserMenu />}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm t={t} />
    </PageLayout>

  );
}

export default Login;
