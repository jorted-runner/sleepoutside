import { setLocalStorage, discountPercentage, setSubscript, loadHeaderFooter } from './utils.mjs';

export default class ProductDetail {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }
    async init() {
      loadHeaderFooter();
      this.product = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails(this.product);
      document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));
      setSubscript();
    }
    addToCart() {
      setLocalStorage('so-cart', this.product);
      setSubscript();
    }
    renderProductDetails(product) {
      let discountContent = '';
      if (product.FinalPrice < product.SuggestedRetailPrice) {
          const discountPercent = discountPercentage(product.FinalPrice, product.SuggestedRetailPrice);
          discountContent = `<p class='discount'>${discountPercent.toFixed(0)}% OFF!</p>`;
      }
      const content = `<section class='product-detail'>
      <h3>${product.Brand.Name}</h3>

      <h2 class='divider'>${product.Name}</h2>

      <img
        class='divider'
        src='${product.Images.PrimaryLarge}'
        alt='${product.Name}'
      />

      <p class='product-card__price'>$${product.FinalPrice}</p>
      ${discountContent}
      <p class='product__color'>${product.Colors[0].ColorName}</p>

      <p class='product__description'>
        ${product.DescriptionHtmlSimple}
      </p>

      <div class='product-detail__add'>
        <button id='addToCart' data-id='${product.Id}'>Add to Cart</button>
      </div>
    </section>`
      document.querySelector('main').innerHTML = content;
  }
}

