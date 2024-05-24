import { getLocalStorage,  setSubscript, removeItemLocalStorage, loadHeaderFooter, updateLocalStorage } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  
  const cartItems = getLocalStorage('so-cart');
  if (cartItems != null) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    showCartTotal(cartItems);

    const qtyInputs = document.querySelectorAll('.cart-card__quantityval');
    qtyInputs.forEach(qtyInput => {
      qtyInput.addEventListener('click', function() {

        // Extract the index of the cart item
        const parent = qtyInput.parentNode.parentNode;
        const index = parseInt(parent.querySelector('.itmIndex').textContent);

        //get the cart array and adjust the quantity
        let cart = getLocalStorage('so-cart');
        if (!parseInt(qtyInput.value) == 0) {
          cart[index].Quantity = parseInt(qtyInput.value);
        }
        else {
          cart.splice(index, 1);
        }
        
        //push the new array out
        updateLocalStorage('so-cart', cart);
        renderCartContents();
        showCartTotal(cart);
        setSubscript();
      });
    });

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
        const cartItm = getLocalStorage('so-cart');
        showCartTotal(cartItm);
        setSubscript();
      });
    });
  }
}


function showCartTotal(cart) {
  document.querySelector('.cart-total').classList.remove('hidden');
  var suggestedTotal = 0;
  var finalTotal = 0;
  cart.forEach(item => {
    suggestedTotal += item.SuggestedRetailPrice * item.Quantity;
    finalTotal += item.FinalPrice * item.Quantity;
  });
  document.querySelector('.cart-total-amount').innerHTML = `<strong>Total</strong>: $${suggestedTotal.toFixed(2)}`;
  document.querySelector('.total-discount').innerHTML = `<strong>Total</strong>: $${finalTotal.toFixed(2)} <p class='discount'>Saved: $${(suggestedTotal - finalTotal).toFixed(2)}</p>`;
}

function cartItemTemplate(item, index) {
  const color = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : '';
  const newItem = `
  <li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
        class='cart-image'
        src='${item.Images.PrimaryMedium}'
        alt='${item.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='cart__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${color}</p>
    <label class='cart-card__quantity'>qty:<input type='number' name='itemQuantity' class='cart-card__quantityval' value='${item.Quantity}'></label>
    <p class='cart-card__price'>$${Math.round((item.FinalPrice * item.Quantity) * 100) / 100}</p>
    <span class='remove_button'>X<p class='hidden'>${item.Id}</p></span>
    <p class='itmIndex' hidden>${index}</p>
  </li>`;
  return newItem;
}

renderCartContents();
