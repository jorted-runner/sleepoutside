import ExternalServices from './ExternalServices.mjs'
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParams } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');
const listElement = document.querySelector('.product-list');

const dataSource = new ExternalServices();

if (category != null) {
    const myList = new ProductList(category, dataSource, listElement);
    myList.init();
}

// JavaScript code
const sortDropDown = document.querySelector('#sort-options');
sortDropDown.addEventListener('change', sortProducts);

function sortProducts() {
    const productList = document.querySelector('.product-list');
    const products = Array.from(productList.querySelectorAll('.product-card'));
    const sortOption = sortDropDown.value;

    products.sort((a, b) => {
        const nameA = a.querySelector('.card__name').textContent.toUpperCase();
        const nameB = b.querySelector('.card__name').textContent.toUpperCase();
        const priceA = parseFloat(a.querySelector('.product-card__price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.product-card__price').textContent.replace('$', ''));

        if (sortOption === 'az') {
            return nameA > nameB ? 1 : -1;
        } else if (sortOption === 'za') {
            return nameA < nameB ? 1 : -1;
        } else if (sortOption === 'price-low-high') {
            return priceA - priceB;
        } else if (sortOption === 'price-high-low') {
            return priceB - priceA;
        }
    });

    // Clear the current list
    productList.innerHTML = '';

    // Append sorted products to the list
    products.forEach(product => {
        productList.appendChild(product);
    });
}
