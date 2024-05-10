import ProductData from './ProductData.js';
import ProductList from './ProductList.js';
import { getParam } from './utils.mjs';


const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();