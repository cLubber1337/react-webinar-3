import React from "react";
import PropTypes from 'prop-types';
import Item from "../item/item";
import './style.css';

function List({list, onClickButton}) {

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClickButton={onClickButton} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClickButton: PropTypes.func,
};

export default React.memo(List);
