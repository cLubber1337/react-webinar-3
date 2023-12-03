/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.cart = {
      totalPrice: 0,
      totalItems: 0,
      items: []
    }
    this.listeners = []; // Слушатели изменений состояния
  }


  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  getCart() {
    return this.cart;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  setCart(newCart) {
    this.cart = newCart;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addToCart(code) {
    const product = this.state.products.find(item => item.code === code);
    const itemInCart = this.cart.items.find(item => item.code === code);
    this.setCart({
      ...this.cart,
      totalItems: this.cart.totalItems + 1,
      totalPrice: this.cart.totalPrice + product.price,
      items: !itemInCart ? [...this.cart.items, {...product, count: 1}] :
        this.cart.items.map(item => item.code === product.code ?
          {...item, count: item.count + 1} : item)
    })
  }

  removeFromCart(code) {
    const product = this.cart.items.find(item => item.code === code);
    if (product) {
      this.setCart({
        ...this.cart,
        totalItems: this.cart.totalItems - product.count,
        totalPrice: this.cart.totalPrice - product.count * product.price,
        items: this.cart.items.filter(item => item.code !== product.code)
      })
    }
  }
}

export default Store;
