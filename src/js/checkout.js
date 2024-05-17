import CalculateOrder from './CheckoutProcess.mjs'

const order = new CalculateOrder();
order.init();

document.forms['checkout'].addEventListener('submit', (event) => {
    event.preventDefault();
    const form = document.forms[0];
    const formStatus = form.checkValidity();
    form.reportValidity();
    if(formStatus)
        order.checkout();
});