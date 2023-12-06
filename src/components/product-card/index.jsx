import './style.css'
import {numberFormat} from "../../utils";



export const ProductCard = (props) => {
    const {product, onAdd} = props

    return <section className={'product-card'}>
       <ul className={'product-card-list'}>
           <li>{product.description}</li>
           <li>Страна производитель: <span className={'bold'}>{product.madeIn?.title} ({product.madeIn?.code})</span></li>
           <li>Категория: <span className={'bold'}>{product.category?.title}</span></li>
               <li>Год выпуска: <span className={'bold'}>{product?.edition}</span></li>
           <li className={'product-card-list__price'}>Цена: {numberFormat(product.price)} ₽</li>
       </ul>
        <button onClick={() => onAdd(product._id)}>Добавить</button>
    </section>
}
