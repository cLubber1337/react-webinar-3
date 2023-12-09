import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import {useTrans} from "../../translation/useTrans";
import {ROUTES} from "../../routes/routes";


const LIMIT = 10;
function Main() {
  const {trans} = useTrans();
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalCount:  state.catalog.totalCount,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установка текущей страницы
    setCurrentPage: useCallback(currentPage => store.actions.catalog.setCurrentPage(currentPage), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} linkTo={`${ROUTES.PRODUCT}/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  const skip = select.currentPage === 1 ? 0 : (select.currentPage - 1) * LIMIT

  useEffect(() => {
    store.actions.catalog.load({limit: LIMIT, skip})
  }, [select.currentPage]);

  return (
    <PageLayout>
      <Head title={trans('Магазин')}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={select.currentPage}
                  setCurrentPage={callbacks.setCurrentPage}
                  totalPages={select.totalCount} />
    </PageLayout>
  );
}

export default memo(Main);
