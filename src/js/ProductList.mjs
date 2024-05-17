import { renderListWithTemplate, discountPercentage, toTitleCase } from './utils.mjs';

function productCardTemplate(product) {
    let discountContent = '';
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        const discountPercent = discountPercentage(product.FinalPrice, product.SuggestedRetailPrice);
        discountContent = `<p class='discount'>${discountPercent.toFixed(0)}% OFF!</p>`;
    }
    const content = 
        `<li class='product-card'>
            <a href='../product_pages/?product=${product.Id}'>
                <picture>
                    <source media="(max-width: 600px)" srcset="${product.Images.PrimaryMedium}">
                    <source media="(min-width: 601px) and (max-width: 1100px)" srcset="${product.Images.PrimaryLarge}">
                    <img src="${product.Images.PrimaryExtraLarge}" alt="Image of ${product.Name}">
                </picture>
                <h3 class='card__brand'>${product.Brand.Name}</h3>
                <h2 class='card__name'>${product.Name}</h2>
                <p class='product-card__price'>$${product.FinalPrice}</p>
                ${discountContent}
            </a>
        </li>`;
    return content;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        const productTitle = document.querySelector('.title')
        productTitle.textContent = productTitle.textContent + toTitleCase(this.category.replace(/-/gi, ' '));
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}