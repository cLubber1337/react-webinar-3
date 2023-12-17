import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";
import {UserMenu} from "../../components/user-menu";
import {useCallback} from "react";


export default function HeaderTop() {
  const store = useStore()
  const {t} = useTranslate();

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    user: state.user.user
  }));

  const callback = {
    logout: useCallback(() => store.actions.user.logout(), [store])
  }

  return (
    <SideLayout padding='small' side='end'>
      <UserMenu t={t}
                user={select.user}
                logout={callback.logout}
                waiting={select.waiting}
                link={'/profile'}
      />
    </SideLayout>
  )
}