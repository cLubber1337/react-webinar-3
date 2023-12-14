import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import {UserMenu} from "../../containers/user-menu";
import {ProfileInfo} from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";


function Profile() {

  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.user.user,
  }));

  return (
    <PageLayout head={<UserMenu />}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo t={t} user={select.user} />
    </PageLayout>
  );
}

export default Profile
