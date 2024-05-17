import CalculateOrder from './CheckoutProcess.mjs'
//import { loadHeaderFooter} from './utils.mjs';

//loadHeaderFooter();

const order = new CalculateOrder();
order.init();

document.forms['checkout'].addEventListener('submit', (event) => {
    event.preventDefault();
    order.checkout();
});