import React from "react";
import './style.css'
import PropTypes from "prop-types";


export const CartItem = ({ cartItem, removeFromCard }) => {

  return <div className={'cart-item-row'}>
    <div className="cart-item-code">{cartItem.code}</div>
    <div className="cart-item-title">{cartItem.title}</div>
    <div className="cart-item-price">{cartItem.price} ₽</div>
    <div className="cart-item-count">{cartItem.count} шт</div>
    <button onClick={() => removeFromCard(cartItem)} className="cart-item-delete-btn">Удалить</button>
  </div>
}


CartItem.propTypes = {
  cartItem: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  removeFromCard: PropTypes.func.isRequired
};