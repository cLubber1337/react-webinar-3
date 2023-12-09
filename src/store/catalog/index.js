import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      totalCount: 0,
      currentPage: 1
    }
  }

  setCurrentPage(currentPage) {
    this.setState({
      ...this.getState(),
      currentPage: currentPage
    })
  }

  async load({limit = 10, skip = 0}) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalCount: Math.ceil(json.result.count / limit ),
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
