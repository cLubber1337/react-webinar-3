import StoreModule from "../module";

class CategoriesState extends StoreModule {

  initState() {
    return {
      categories: [],
    }
  }

  async initCategories(lang='ru') {
     const response = await fetch(`/api/v1/categories/?fields=_id,title,parent(_id)&lang=${lang}&limit=*`);
     const {result} = await response.json();
      this.setState({
        ...this.getState(),
        categories: result.items
      });
  }
}

export default CategoriesState;
