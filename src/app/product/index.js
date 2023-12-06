import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {ProductCard} from "../../components/product-card";
import {useParams} from "react-router-dom";
import Basket from "../basket";


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
    }

    useEffect(() => {
        store.actions.product.load(id)
    }, []);

    return (
        <>
            <PageLayout>
                <Head title={select.product.title}/>
                <BasketTool onOpen={callbacks.openModalBasket}
                            amount={select.amount}
                            sum={select.sum}/>
                <ProductCard product={select.product} onAdd={callbacks.addToBasket}/>
            </PageLayout>
            {select.activeModal === 'basket' && <Basket/>}
        </>
    );
}

export default memo(Product);
