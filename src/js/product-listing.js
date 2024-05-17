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

