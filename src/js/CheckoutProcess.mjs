import {  formDataToJSON, getLocalStorage } from './utils.mjs';
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
       document.querySelector('#orderTotals').innerHTML = `<p>Subtotal: $${this.itemTotal}</p>
        <p>Shipping: $${this.shipping}</p>
        <p>Tax: $${this.tax.toFixed(2)}</p>
        <p>Order Total: $${this.orderTotal.toFixed(2)}</p>`;
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
        const formElement = document.forms["checkout"];
        const form = formDataToJSON(formElement);

        form.orderDate = new Date();
        form.orderTotal = this.orderTotal;
        form.tax = this.tax;
        form.shipping = this.shipping;
        form.items = this.packageItems(this.itemlist);
        try {
            const res = await externalService.checkout(form);
            console.log(res);
          } catch (err) {
            console.log(err);
          }
    }
}

