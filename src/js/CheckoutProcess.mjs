import {  renderWithTemplate, getLocalStorage } from './utils.mjs';

export default class CalculateOrder {
    //Subtotal the cart and add.
    constructor() {
        this.itemlist = [];
        this.itemTotal = 0;
        this.shipping = 8;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.itemlist = getLocalStorage('so-cart');
        this.calculateItemSummary();
        this.calculateOrdertotal();
        this.displayOrderTotals();
    }

    calculateItemSummary() {
        if (this.itemlist != null) {
            this.itemlist.forEach(item => {
                this.itemTotal += item.FinalPrice * item.Quantity;
                this.shipping += 2 * item.Quantity;
            });
        }
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
      //renderWithTemplate(this.checkoutTemplate, document.querySelector('#orderTotals'));
       document.querySelector('#orderTotals').innerHTML = `<p>Subtotal: $${this.itemTotal}</p>
        <p>Shipping: $${this.shipping}</p>
        <p>Tax: $${this.tax.toFixed(2)}</p>
        <p>Order Total: $${this.orderTotal.toFixed(2)}</p>`;
    }
}


