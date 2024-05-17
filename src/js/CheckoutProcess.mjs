import {  renderWithTemplate, getLocalStorage } from './utils.mjs';

export default class CalculateOrder {
    //Subtotal the cart and add.
    constructor() {
        this.itemlist = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.itemlist = getLocalStorage('so-cart');
        this.calculateItemSummary();
        this.calculateOrdertotal();
    }

    calculateItemSummary() {
        if (this.itemlist != null) {
            this.shipping = 8;
            this.itemlist.forEach(item => {
                this.itemTotal += item.FinalPrice * item.Quantity;
                this.shipping += 2;
            });
        }
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
      const orderElement = document.querySelector('#orderTotals');
      renderWithTemplate(checkoutTemplate, orderElement, this);

    }
}

function checkoutTemplate(item) {
  return `<p>Subtotal: ${item.itemTotal}</p>
   <p>Shipping: ${item.shipping}</p>
   <p>Tax: ${item.tax}</p>
   <p>Order Total: ${item.orderTotal}</p>`;
}
