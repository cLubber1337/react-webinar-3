import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {formatPrice} from "../../utils";

function Item(props) {

  const isCart = props.item.count

  console.log('Item');

  const callbacks = {
    onAddToCart: (e) => {
      e.stopPropagation();
      props.onClickButton(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className={'Item-left'}>
        <div className='Item-left-code'>
          {props.item.code}
        </div>
        <div className='Item-left-title'>
          {props.item.title}
        </div>
      </div>

      <div className='Item-right'>
        <div className={'Item-right-price-container'}>
          <div className='Item-right-price'>
            {formatPrice(props.item.price)} ₽
          </div>
          {isCart &&
            <div className='Item-right-count'>
              {props.item.count} шт
            </div>}
        </div>

        <div className='Item-right-actions'>
          <button onClick={callbacks.onAddToCart}>
            {isCart ? 'Удалить' : 'Добавить'}
          </button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClickButton: PropTypes.func.isRequired,
};


export default React.memo(Item);
