// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, newData) {
  let existingData = localStorage.getItem(key);
  let dataArray = [];
  // If there is existing data, parse it from JSON
  if (existingData) {
      try {
          dataArray = JSON.parse(existingData);

          // If existingData is an object, convert it to an array
          if (!Array.isArray(dataArray)) {
              dataArray = [dataArray];
          }
      } catch (error) {
          console.error('Error parsing existing data:', error);
          // Handle parsing error, e.g., by resetting existing data
          dataArray = [];
      }
  }

  // Append the new data to the existing data array
  dataArray.push(newData);

  // Set the updated data array back into local storage
  localStorage.setItem(key, JSON.stringify(dataArray));
}

export function removeItemLocalStorage(key, id) {
  let existingItems = getLocalStorage(key);
  if (existingItems != null) {
    let removed = false; // Flag to track if an item has been removed
    let updatedItems = existingItems.filter(item => {
      if (item.Id === id && !removed) {
        removed = true; // Mark the item as removed
        return false; // Do not include this item in the updated array
      }
      return true; // Include all other items in the updated array
    });
    localStorage.setItem(key, JSON.stringify(updatedItems));
  }
}

//convert the imported file to JSON
export function convertToJson(res) {
  if (res.ok) {
      return res.json();
  } else {
      throw new Error('Bad Response');
  }
}

//Get Data file based on the given path
export function  getData(path) {
    return fetch(path)
      .then(convertToJson)
      .then((data) => data);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = 'false') {
  const htmlStrings = list.map(templateFn);
  if (clear == 'true') {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, callback, position = 'afterbegin') {
  parentElement.insertAdjacentHTML(position, templateFn);
  if (callback) {
    callback(data);
  }
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function discountPercentage(final, suggested) {
  const discountAmount = suggested - final;
  const discount = (discountAmount / suggested) * 100;
  return discount;
}

export function setSubscript() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems != null && Array.isArray(cartItems)) {
    const backpack = document.querySelector('.cart');
    if (backpack.querySelector('sub')) {
      backpack.querySelector('sub').remove();
    }
    
    const numItems = cartItems.length;
    const subElement = document.createElement('sub');
    subElement.classList.add('subscript');
    subElement.textContent = numItems; // Set the subscript text
    
    // Append the <sub> element as a child to the target element (backpack or any other target)
    backpack.appendChild(subElement);
  }
}


export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export async function loadTemplate(path) {
  const html = await fetch(path);
  const template = await html.text();
  return template;
}

export function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

