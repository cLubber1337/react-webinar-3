import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import HeaderTop from "../../containers/header-top";
import SignIn from "../../containers/sign-in";

function Login() {
  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
  }));

  useEffect(() => {
    if (select.isAuth) {
      navigate(-1)
    }
  }, [select.isAuth]);

  return (
    <PageLayout head={<HeaderTop/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SignIn/>
    </PageLayout>

  );
}

export default Login;
