import {memo} from 'react';
import PropTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from "react-router-dom";
import {ROUTES} from "../../routes/routes";
import {useTrans} from "../../translation/useTrans";

function ItemBasket(props) {
  const {trans} = useTrans()
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={props.linkTo} onClick={props.onClose} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {trans('шт')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{trans('Удалить')}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
  onClose: PropTypes.func,
  linkTo: PropTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  linkTo: ROUTES.HOME
}

export default memo(ItemBasket);
