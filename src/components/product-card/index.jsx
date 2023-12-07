import './style.css'
import {numberFormat} from "../../utils";
import {useTrans} from "../../translation/useTrans";



export const ProductCard = (props) => {
  const {trans} = useTrans()
    const {product, onAdd} = props

    return <section className={'product-card'}>
       <ul className={'product-card-list'}>
           <li>{product.description}</li>
           <li>{trans('Страна производитель')}: <span className={'bold'}>{product.madeIn?.title} ({product.madeIn?.code})</span></li>
           <li>{trans('Категория')}: <span className={'bold'}>{product.category?.title}</span></li>
               <li>{trans('Год выпуска')}: <span className={'bold'}>{product?.edition}</span></li>
           <li className={'product-card-list__price'}>{trans('Цена')}: {numberFormat(product.price)} ₽</li>
       </ul>
        <button onClick={() => onAdd(product._id)}>{trans('Добавить')}</button>
    </section>
}
