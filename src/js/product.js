import ExternalServices from './ExternalServices.mjs';
import ProductDetail from './ProductDetails.mjs';
import { getParams } from './utils.mjs';

const productId = getParams('product');
const dataSource = new ExternalServices('tents');

const product = new ProductDetail(productId, dataSource);
product.init();
