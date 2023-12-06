import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      product: {},
    }
  }

  async load(id) {
    const response = await fetch(`api/v1/articles/${id}?fields=title,price,description,edition,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      product: json.result,
    }, 'Загружен ТОВАР по id из АПИ');
  }
}

export default Product;
