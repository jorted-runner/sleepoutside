import { getLocalStorage,  setSubscript, removeItemLocalStorage, loadHeaderFooter } from './utils.mjs';

function renderCartContents() {
  loadHeaderFooter();
  const cartItems = getLocalStorage('so-cart');
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    showCartTotal(cartItems);
    setSubscript();
    const remove_buttons = document.querySelectorAll('.remove_button');
    remove_buttons.forEach(button => {
      button.addEventListener('click', function() {
        
        // Extract the ID of the item associated with the remove button
        const id = button.querySelector('p').textContent;
    
        // Remove the item from the cart array in local storage
        removeItemLocalStorage('so-cart', id);
        
        // Remove the item's HTML element from the DOM
        button.parentElement.remove();
    
        // Recalculate and display the cart total
        renderCartContents();
      });
    });
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
  const color = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : '';
  const newItem = `
  <li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
        src='${item.Images.PrimaryMedium}'
        alt='${item.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${color}</p>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
    <span class='remove_button'>X<p class='hidden'>${item.Id}</p></span>
  </li>`;
  return newItem;
}

renderCartContents();
