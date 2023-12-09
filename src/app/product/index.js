import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {ProductCard} from "../../components/product-card";
import {useParams} from "react-router-dom";
import Basket from "../basket";
import {Navbar} from "../../components/navbar";
import {navigation} from "../../routes/navigation";
import {AppToolsMenuLayout} from "../../components/app-tools-menu-layout";


function Product() {
    const {id} = useParams();
    const store = useStore();


    const select = useSelector(state => ({
        product: state.product.product,
        amount: state.basket.amount,
        sum: state.basket.sum,
        activeModal: state.modals.name
    }));

    const callbacks = {
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        setCurrentPage: useCallback(currentPage => store.actions.catalog.setCurrentPage(currentPage), [store]),
    }

    useEffect(() => {
        store.actions.product.load(id)
    }, []);

    return (
        <>
            <PageLayout head={<Head title={select.product.title}/>}>
              <AppToolsMenuLayout>
                <Navbar navigation={navigation} resetCurrentPage={() => callbacks.setCurrentPage(1)}/>
                <BasketTool amount={select.amount} sum={select.sum} onOpen={callbacks.openModalBasket}/>
              </AppToolsMenuLayout>
                <ProductCard product={select.product} onAdd={callbacks.addToBasket}/>
            </PageLayout>
            {select.activeModal === 'basket' && <Basket/>}
        </>
    );
}

export default memo(Product);
