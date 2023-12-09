import {memo, useCallback, useEffect, useState} from 'react';
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
  const [page, setPage] = useState(0);
  const {trans} = useTrans();

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load({limit: LIMIT, skip: page * LIMIT})
  }, [page]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count:  Math.ceil(state.catalog.count / LIMIT - 1),
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} linkTo={`${ROUTES.PRODUCT}/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={trans('Магазин')}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={page === 0 ? 1 : page}
                  setCurrentPage={setPage}
                  totalPages={select.count} />
    </PageLayout>

  );
}

export default memo(Main);
