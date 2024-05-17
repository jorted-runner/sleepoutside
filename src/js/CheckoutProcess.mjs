import {  formDataToJSON, getLocalStorage, alertCartMessage, toTitleCase } from './utils.mjs';
import ExternalServices from "./ExternalServices.mjs";

const externalService = new ExternalServices();

export default class CalculateOrder {
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
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        
    }

    displayOrderTotals() {
       document.querySelector('#orderTotals').innerHTML = 
       `<div id='ordertotals'>
            <p class='totals-label'>Subtotal:</p><p class='totals'> $${this.itemTotal}</p>
            <p class='totals-label'>Shipping:</p><p class='totals'> $${this.shipping}</p>
            <p class='totals-label'>Tax:</p><p class='totals'> $${this.tax.toFixed(2)}</p>
            <p class='totals-label'>Order Total:</p><p class='totals'> $${this.orderTotal.toFixed(2)}</p>`;
    }

    packageItems(items) {
        let largeBox = []
        getLocalStorage('so-cart').map(item => {
            let pack = {
                'id': item.Id,
                'name': item.Name,
                'price': item.FinalPrice * item.Quantity,
                'quantity': item.Quantity
            }
            largeBox.push(pack)
        })
        return largeBox
    }
    
    async checkout() {
        const formElement = document.forms['checkout'];
        const form = formDataToJSON(formElement);

        form.orderDate = new Date();
        form.orderTotal = this.orderTotal;
        form.tax = this.tax;
        form.shipping = this.shipping;
        form.items = this.packageItems(this.itemlist);
        try {
            const res = await externalService.checkout(form);
            console.log(res);
            localStorage.removeItem('so-cart');
            window.location.href = '../checkout/success.html';
          } catch (err) {
            let message = '';
            if (err.message && typeof err.message === 'object') {
                const entries = Object.entries(err.message);
                entries.forEach(([key, value], index) => {
                  message += `${toTitleCase(key)}: ${toTitleCase(value)}`;
                  if (index < entries.length - 1) {
                    message += ' | ';
                  }
                });
            } else {
              message = err.message || 'An unexpected error occurred';
            }
          
            alertCartMessage(message.trim());
            console.log(err);
          }
          
          
    }
}

