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


// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = 'false') {
  const strings = list.map(templateFn);

  if (clear == 'true') {
    parentElement.innerHTML = '';
  }
  
  parentElement.insertAdjacentHTML(position, strings.join(''));
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}