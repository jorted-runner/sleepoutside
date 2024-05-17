export default class CalculateOrder() {
    //Subtotal the cart and add.
    constructor(localKey, selector) {
        this.localKey = localKey;
        this.selector = selector;
        this.itemlist = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    };

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    };

    calculateItemSummary() {
        this.itemlist = getLocalStorage('so-cart');
        if (cartItems != null) {
            showCartTotal(cartItems);
        }


    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page

    }
}