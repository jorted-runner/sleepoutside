import ExternalServices from './ExternalServices.mjs';
import ProductDetail from './ProductDetails.mjs';
import { getParams, loadHeaderFooter} from './utils.mjs';

loadHeaderFooter();

const productId = getParams('product');
const dataSource = new ExternalServices('tents');

const product = new ProductDetail(productId, dataSource);
product.init();
