import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {formatPrice, plural} from "../../utils";

function Controls({totalPrice, totalItems, onOpenModal}) {

const summaryInCart = totalPrice > 0 ? `${totalItems} ${plural(totalItems, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / ${formatPrice(totalPrice)} ₽` : 'пусто';

  return (
    <div className='Controls'>
      <div className='Controls-total-price'>
        <span>В корзине:</span>
        {summaryInCart}
      </div>
      <button onClick={onOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  totalPrice: PropTypes.number,
  totalItems: PropTypes.number,
  onOpenModal: PropTypes.func
};


export default React.memo(Controls);
