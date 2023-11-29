import React from "react";
import './style.css'
import Header from "../header/header";
import PropTypes from "prop-types";
import {CartItem} from "./cart-item";


export const Cart = ({closeModal, cartItems, totalPrice, removeFromCard}) => {
  return <div className={'cart'}>
    <Header title={'Корзина'} className={'cart-header'}/>
    <button onClick={closeModal} className={"cart-close-btn"}>Закрыть</button>

    {cartItems.length > 0 ?
      <div className={'cart-items'}>
        {cartItems.map(item => (
          <CartItem key={item.code} removeFromCard={removeFromCard} cartItem={item}/>)
        )}
      </div>
      : <h3 className={'cart-empty-text'}>Корзина пуста</h3>}

    {cartItems.length > 0 &&
      <div className={'cart-footer'}>
        <span className={'cart-total'}>Итого</span>
        <span className={'cart-total-price'}>{totalPrice} ₽</span>
      </div>}
  </div>
}


Cart.propTypes = {
  closeModal: PropTypes.func.isRequired,
  removeFromCard: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired
};
