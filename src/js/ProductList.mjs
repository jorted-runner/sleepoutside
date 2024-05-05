import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  if (product.Image.naturalWidth === 0) {
      return;
  } else {
      let discountContent = '';
      if (product.FinalPrice < product.SuggestedRetailPrice) {
          const discountPercent = discountPercentage(product.FinalPrice, product.SuggestedRetailPrice);
          discountContent = `<p class='discount'>${discountPercent.toFixed(0)}% OFF!</p>`;
      }
      const content = 
          `<li class='product-card'>
              <a href='product_pages/?product=${product.Id}'>
                  <img src='${product.Image}' alt='Image of ${product.Name}'/>
                  <h3 class='card__brand'>${product.Brand.Name}</h3>
                  <h2 class='card__name'>${product.Name}</h2>
                  <p class='product-card__price'>$${product.FinalPrice}</p>
                  ${discountContent}
              </a>
          </li>`;
      return content;
  }
}

function discountPercentage(final, suggested) {
  const discountAmount = suggested - final;
  const discount = (discountAmount / suggested) * 100;
  return discount;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
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