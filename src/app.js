import React, {useCallback, useState} from 'react';
import List from "./components/list/list";
import Controls from "./components/controls/controls";
import Header from "./components/header/header";
import PageLayout from "./components/page-layout/page-layout";
import {Modal} from "./components/modal/modal";
import {Cart} from "./components/cart/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const products = store.getState().products;
  const cart = store.getCart();


  const callbacks = {
    addToCart: useCallback((product) => {
      store.addToCart(product);
    }, [store]),
    removeFromCard: (code) => {
      store.removeFromCart(code);
    },
    openModal: () => {
      setIsOpenModal(true);
    },
    closeModal: () => {
      setIsOpenModal(false);
    }
  };

  return (
    <PageLayout>
      <Modal isOpen={isOpenModal}>
        <Cart
          closeModal={callbacks.closeModal}
          removeFromCard={callbacks.removeFromCard}
          cartItems={cart.items}
          totalPrice={cart.totalPrice}
        />
      </Modal>
      <Header title='Магазин'/>
      <Controls
        totalPrice={cart.totalPrice}
        totalItems={cart.totalItems}
        onOpenModal={callbacks.openModal}
      />
      <List list={products} onAddToCart={callbacks.addToCart}/>
    </PageLayout>
  )
}

export default App;
