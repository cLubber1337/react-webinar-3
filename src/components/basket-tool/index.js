import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import {ROUTES} from "../../routes/routes";
import {useTrans} from "../../translation/useTrans";
import {LangSwitcher} from "../lang-switcher/lang-switcher";


function BasketTool({sum, amount, onOpen}) {
    const {trans} = useTrans()
    const cn = bem('BasketTool');
    return (
        <div className={cn()}>
            <Link className={'link-home'} to={ROUTES.HOME}>{trans('Главная')}</Link>
            <LangSwitcher />
            <div>
                <span className={cn('label')}>{trans('В корзине')}:</span>
                <span className={cn('total')}>
        {amount
            ? `${amount} ${plural(amount, {
                one: trans('товар'),
                few: trans('товара'),
                many: trans('товаров')
            })} / ${numberFormat(sum)} ₽`
            : <span>{trans('пусто')}</span>
        }
      </span>
                <button onClick={onOpen}>{trans('Перейти')}</button>
            </div>
        </div>
    );
}

BasketTool.propTypes = {
    onOpen: PropTypes.func.isRequired,
    sum: PropTypes.number,
    amount: PropTypes.number
};

BasketTool.defaultProps = {
    onOpen: () => {
    },
    sum: 0,
    amount: 0
}

export default memo(BasketTool);
