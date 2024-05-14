import ProductData from '../js/ProductData.mjs'
import ProductListing from '../js/ProductList.mjs';
import { getParams } from '../js/utils.mjs';

const category = getParams('category');
const dataSource = new ProductData();
const element = document.querySelector('.product-list');
const productList = new ProductListing(category, dataSource, element);

productList.init();