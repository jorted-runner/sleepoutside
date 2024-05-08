import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import Alert from './Alert.mjs';

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductListing('Tents', dataSource, element);

productList.init();

const alerts = new Alert();
alerts.init();