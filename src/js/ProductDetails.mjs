import { setLocalStorage, discountPercentage, setSubscript, loadHeaderFooter, removeItemLocalStorage, alertMessage} from './utils.mjs';

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
      if (localStorage.getItem('so-cart')) {
        let cart = JSON.parse(localStorage.getItem('so-cart'));
        for (let i = 0; i < Object.keys(cart).length; i++) {
          console.log(cart[i], this.productId)
          if (cart[i].Id == this.productId) {
            let newProduct = cart[i];
            newProduct.Quantity += 1;
            cart.splice(cart[i], 1, newProduct);
            removeItemLocalStorage('so-cart', this.productId);
            setLocalStorage('so-cart', newProduct);

            setSubscript();
            alertMessage(`${this.product.Name} was added to your cart.`)  
            return
          }
        }
        this.product['Quantity'] = 1;
        setLocalStorage('so-cart', this.product);
        alertMessage(`${this.product.Name} was added to your cart.`)  
        setSubscript();
      }
      else {
        this.product['Quantity'] = 1;
        setLocalStorage('so-cart', this.product);
        alertMessage(`${this.product.Name} was added to your cart.`)  
        setSubscript();
      }
        
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

      <picture>
          <source media="(max-width: 600px)" srcset="${product.Images.PrimaryMedium}">
          <source media="(min-width: 601px) and (max-width: 1100px)" srcset="${product.Images.PrimaryLarge}">
          <img src="${product.Images.PrimaryExtraLarge}" alt="Image of ${product.Name}">
      </picture>

      <p class='product-card__price'>$${product.FinalPrice}</p>
      ${discountContent}
      <p class='product__color'>${product.Colors[0].ColorName}</p>

      <p class='product__description'>
        ${product.DescriptionHtmlSimple}
      </p>

      <div class='product-detail__add'>
        <button id='addToCart' class='submitBtn' data-id='${product.Id}'>Add to Cart</button>
      </div>
    </section>`
      document.querySelector('main').innerHTML += content;
  }
}

