import CalculateOrder from './CheckoutProcess.mjs'
import { loadHeaderFooter} from './utils.mjs';

loadHeaderFooter();

const order = new CalculateOrder();
order.init();

document.forms['checkout'].addEventListener('submit', (event) => {
    event.preventDefault();
    order.checkout();
});

const zip = document.forms['checkout'].elements.zipcode;
zip.addEventListener('change', () => {
    let calculateTotals = false;
    //if a "valid" length postal code is entered, calculate totals, otherwise empty them.
    if (zip.value.length == 5 && !isNaN(zip.value)){
        calculateTotals = true;
    }
    order.calculateOrdertotal(calculateTotals);
});