import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    if (product.Image.naturalWidth === 0){
        return
    }
    else {
       return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`
    }
}

export default class ProductListing {
    constructor(catergory, dataSource, listElement) {
        this.catergory = catergory;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list)
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}