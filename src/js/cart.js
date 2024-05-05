import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    showCartTotal(cartItems);
  }
}

function showCartTotal(cart) {
  document.querySelector('.cart-total').classList.remove('hidden');
  var suggestedTotal = 0;
  var finalTotal = 0;
  cart.forEach(item => {
    suggestedTotal += item.SuggestedRetailPrice;
    finalTotal += item.FinalPrice;
  });
  document.querySelector('.cart-total-amount').innerHTML = `<strong>Total</strong>: $${suggestedTotal.toFixed(2)}`;
  document.querySelector('.total-discount').innerHTML = `<strong>Total</strong>: $${finalTotal.toFixed(2)} <p class='discount'>Saved: $${(suggestedTotal - finalTotal).toFixed(2)}</p>`;
}

function cartItemTemplate(item) {
  const newItem = `
  <li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
        src='${item.Image}'
        alt='${item.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
